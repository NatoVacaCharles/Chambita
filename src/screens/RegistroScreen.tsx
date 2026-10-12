import { useState } from "react";
import { Screen, TipoUsuario } from "../App";
import { supabase } from "../services/supabaseClient";

type Props = {
  goTo: (s: Screen) => void;
  tipoUsuario: TipoUsuario;
};

const camposEstudiante = [
  { key: "nombre", label: "Nombre completo", type: "text", placeholder: "Kely Tintaya" },
  { key: "correo", label: "Correo electrónico", type: "email", placeholder: "kely@ejemplo.com" },
  { key: "contrasena", label: "Contraseña", type: "password", placeholder: "••••••••" },
  { key: "celular", label: "Celular", type: "tel", placeholder: "987 654 321" },
];

const camposEmpresa = [
  { key: "nombreEmpresa", label: "Nombre de la empresa", type: "text", placeholder: "Empresa Arequipa S.A.C." },
  { key: "correo", label: "Correo electrónico", type: "email", placeholder: "contacto@empresa.com" },
  { key: "contrasena", label: "Contraseña", type: "password", placeholder: "••••••••" },
  { key: "celular", label: "Celular", type: "tel", placeholder: "987 654 321" },
];

export default function RegistroScreen({ goTo, tipoUsuario }: Props) {
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Estado para visibilidad de la contraseña y modal emergente
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarModalExito, setMostrarModalExito] = useState(false);

  const esEmpresa = tipoUsuario === "empresa";
  const campos = esEmpresa ? camposEmpresa : camposEstudiante;

  const handleRegister = async () => {
    setErrorMessage(null);

    // 1. Validar que todos los campos requeridos estén completos
    for (const campo of campos) {
      if (!form[campo.key] || form[campo.key].trim() === "") {
        setErrorMessage(`Por favor completa el campo: ${campo.label}`);
        return;
      }
    }

    // Validar longitud mínima de contraseña
    if (!form.contrasena || form.contrasena.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const roleEnum = esEmpresa ? "empresa" : "candidato";
      const nombreMostrar = esEmpresa ? form.nombreEmpresa : form.nombre;

      // 2. Registrar usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.correo.trim(),
        password: form.contrasena,
        options: {
          data: {
            full_name: nombreMostrar,
            role: roleEnum,
            phone: form.celular.trim(),
          },
        },
      });

      if (authError) {
        throw new Error(authError.message);
      }

      const user = authData.user;

      if (user) {
        // 3. Actualizar el teléfono en la tabla profiles
        const { error: profileError } = await supabase
          .from("profiles")
          .update({
            phone: form.celular.trim(),
          })
          .eq("id", user.id);

        if (profileError) {
          console.error("Error al actualizar perfil:", profileError.message);
        }

        // 4. Si es Empresa, insertar en la tabla companies
        if (esEmpresa) {
          const { error: companyError } = await supabase
            .from("companies")
            .insert([
              {
                profile_id: user.id,
                company_name: form.nombreEmpresa.trim(),
              },
            ]);

          if (companyError) {
            console.error("Error al registrar empresa:", companyError.message);
          }
        }

        // 5. Mostrar modal de éxito
        setMostrarModalExito(true);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "Ocurrió un error al registrar la cuenta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#3d1c6e] to-[#6C3FA0] px-6 pt-14 pb-8">
        <button
          onClick={() => goTo("quien-eres")}
          className="text-white/70 mb-4 flex items-center gap-1"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm">Volver</span>
        </button>
        <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>
        <p className="text-white/70 text-sm mt-1">
          {esEmpresa ? "Para empresas" : "Para estudiantes"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Banner de mensaje de error */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
            {errorMessage}
          </div>
        )}

        <div className="flex flex-col gap-4">
          {campos.map(({ key, label, type, placeholder }) => {
            const esContrasena = key === "contrasena";
            const inputType = esContrasena
              ? mostrarContrasena
                ? "text"
                : "password"
              : type;

            return (
              <div key={key}>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">
                  {label}
                </label>
                <div className="flex items-center border border-[#E8E4F0] rounded-xl px-4 py-3 focus-within:border-[#6C3FA0] transition-colors bg-white">
                  <input
                    type={inputType}
                    placeholder={placeholder}
                    value={form[key] ?? ""}
                    onChange={(e) =>
                      setForm({ ...form, [key]: e.target.value })
                    }
                    className="flex-1 text-sm text-[#1a0a2e] placeholder-gray-300 outline-none bg-transparent"
                  />

                  {/* Botón para Mostrar/Ocultar Contraseña */}
                  {esContrasena && (
                    <button
                      type="button"
                      onClick={() => setMostrarContrasena(!mostrarContrasena)}
                      className="text-gray-400 hover:text-[#6C3FA0] transition-colors p-1"
                      aria-label="Ver u ocultar contraseña"
                    >
                      {mostrarContrasena ? (
                        /* Ícono de Ojo Abierto */
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                          <path
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="currentColor"
                            strokeWidth="1.8"
                          />
                        </svg>
                      ) : (
                        /* Ícono de Ojo Tachado */
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                          <path
                            d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full mt-6 bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-semibold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
        >
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </button>

        <p className="text-center text-xs text-gray-400 mt-4">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => goTo("login")}
            className="text-[#6C3FA0] font-medium"
          >
            Iniciar sesión
          </button>
        </p>
      </div>

      {/* Modal Emergente de Éxito */}
      {mostrarModalExito && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-6 animate-fadeIn">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 text-center shadow-2xl flex flex-col items-center">
            {/* Ícono de Check Verde */}
            <div className="w-16 h-16 bg-[#E6FAF6] text-[#239b83] rounded-2xl flex items-center justify-center mb-4">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="text-lg font-bold text-[#1a0a2e]">¡Registro exitoso!</h3>
            <p className="text-xs text-gray-500 mt-2 mb-6 leading-relaxed">
              Cuenta creada exitosamente, ya puede registrarse
            </p>

            <button
              onClick={() => goTo("login")}
              className="w-full bg-[#6C3FA0] text-white font-semibold py-3.5 rounded-2xl text-sm active:scale-95 transition-all shadow-md"
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}