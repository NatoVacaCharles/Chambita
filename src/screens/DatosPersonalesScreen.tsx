import { useState, useEffect } from "react";
import { Screen } from "../App";
import PerfilPageLayout from "../components/PerfilPageLayout";
import { supabase } from "../services/supabaseClient";

type Props = { goTo: (screen: Screen) => void };

export default function DatosPersonalesScreen({ goTo }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 1. Cargar la información actual del usuario desde Supabase
  useEffect(() => {
    async function cargarDatos() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);
          setCorreo(user.email ?? "");

          // Obtener los datos del perfil desde la tabla profiles
          const { data: profile, error } = await supabase
            .from("profiles")
            .select("full_name, phone")
            .eq("id", user.id)
            .single();

          if (!error && profile) {
            setNombre(profile.full_name ?? "");
            setCelular(profile.phone ?? "");
          }
        }
      } catch (err: any) {
        console.error("Error al obtener los datos:", err);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  // 2. Guardar los cambios en Supabase
  const handleGuardar = async () => {
    if (!userId) return;

    setErrorMessage(null);
    setMensajeExito(false);
    setGuardando(true);

    try {
      // Actualizar la tabla profiles (Nombre y Teléfono)
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: nombre.trim(),
          phone: celular.trim(),
        })
        .eq("id", userId);

      if (profileError) {
        throw new Error(profileError.message);
      }

      // Si el usuario escribió una nueva contraseña, actualizarla en Supabase Auth
      if (nuevaContrasena.trim() !== "") {
        if (nuevaContrasena.length < 6) {
          throw new Error("La nueva contraseña debe tener al menos 6 caracteres.");
        }

        const { error: authError } = await supabase.auth.updateUser({
          password: nuevaContrasena,
        });

        if (authError) {
          throw new Error(`Error al actualizar la contraseña: ${authError.message}`);
        }

        setNuevaContrasena(""); // Limpiar el campo de contraseña por seguridad
      }

      setMensajeExito(true);
    } catch (err: any) {
      setErrorMessage(err.message || "Ocurrió un error al guardar los cambios.");
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <PerfilPageLayout goTo={goTo} title="Mis datos personales" subtitle="Mantén tu información de contacto actualizada">
        <div className="bg-white border border-[#E8E4F0] rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-[#6C3FA0]">Cargando información...</p>
        </div>
      </PerfilPageLayout>
    );
  }

  return (
    <PerfilPageLayout
      goTo={goTo}
      title="Mis datos personales"
      subtitle="Mantén tu información de contacto actualizada"
    >
      {/* Banner de error */}
      {errorMessage && (
        <div className="mb-4 p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 font-medium">
          {errorMessage}
        </div>
      )}

      {/* Formulario */}
      <div className="bg-white border border-[#E8E4F0] rounded-2xl p-4 flex flex-col gap-4">
        {/* Nombre completo */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">
            Nombre completo
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => {
              setMensajeExito(false);
              setNombre(e.target.value);
            }}
            placeholder="Tu nombre completo"
            className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm text-[#1a0a2e] outline-none focus:border-[#6C3FA0]"
          />
        </div>

        {/* Correo electrónico (Solo lectura) */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">
            Correo electrónico
          </label>
          <input
            type="email"
            value={correo}
            disabled
            className="w-full border border-[#E8E4F0] bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-400 outline-none cursor-not-allowed"
          />
          <span className="text-[10px] text-gray-400 mt-1 block">
            El correo electrónico no se puede modificar directamente.
          </span>
        </div>

        {/* Celular */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">
            Celular
          </label>
          <input
            type="tel"
            value={celular}
            onChange={(e) => {
              setMensajeExito(false);
              setCelular(e.target.value);
            }}
            placeholder="987 654 321"
            className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm text-[#1a0a2e] outline-none focus:border-[#6C3FA0]"
          />
        </div>

        {/* Nueva Contraseña (Opcional) */}
        <div>
          <label className="text-xs font-medium text-gray-500 mb-1.5 block">
            Nueva contraseña (opcional)
          </label>
          <input
            type="password"
            value={nuevaContrasena}
            onChange={(e) => {
              setMensajeExito(false);
              setNuevaContrasena(e.target.value);
            }}
            placeholder="Dejar en blanco para mantener la actual"
            className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm text-[#1a0a2e] outline-none focus:border-[#6C3FA0]"
          />
        </div>
      </div>

      {/* Mensaje de éxito */}
      {mensajeExito && (
        <p className="text-center text-xs font-medium text-[#2DC8A8] mt-3">
          ✓ Cambios guardados correctamente en Supabase
        </p>
      )}

      {/* Botón Guardar */}
      <button
        onClick={handleGuardar}
        disabled={guardando}
        className="w-full mt-4 bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-semibold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shadow-md shadow-purple-200"
      >
        {guardando ? "Guardando..." : "Guardar cambios"}
      </button>
    </PerfilPageLayout>
  );
}