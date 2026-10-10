import { useState } from "react";
import { Screen, TipoUsuario } from "../App";

type Props = {
  goTo: (s: Screen) => void;
  tipoUsuario: TipoUsuario;
};

const camposEstudiante = [
  { key: "nombre", label: "Nombre completo", type: "text", placeholder: "Kely Tintaya" },
  { key: "correo", label: "Correo electrónico", type: "email", placeholder: "kely@ejemplo.com" },
  { key: "contrasena", label: "Contraseña", type: "password", placeholder: "••••••••" },
  { key: "celular", label: "Celular", type: "tel", placeholder: "987 654 321" },
  { key: "institucion", label: "Institución educativa", type: "text", placeholder: "Universidad Nacional de San Agustín" },
  { key: "sede", label: "Sede", type: "text", placeholder: "Arequipa" },
];

const camposEmpresa = [
  { key: "nombreEmpresa", label: "Nombre de la empresa", type: "text", placeholder: "Empresa Arequipa S.A.C." },
  { key: "correo", label: "Correo electrónico", type: "email", placeholder: "contacto@empresa.com" },
  { key: "contrasena", label: "Contraseña", type: "password", placeholder: "••••••••" },
  { key: "celular", label: "Celular", type: "tel", placeholder: "987 654 321" },
  { key: "rubro", label: "Rubro", type: "text", placeholder: "Tecnología, retail, servicios..." },
  { key: "sede", label: "Sede", type: "text", placeholder: "Arequipa" },
];

export default function RegistroScreen({ goTo, tipoUsuario }: Props) {
  const [form, setForm] = useState<Record<string, string>>({});
  const esEmpresa = tipoUsuario === "empresa";
  const campos = esEmpresa ? camposEmpresa : camposEstudiante;

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#3d1c6e] to-[#6C3FA0] px-6 pt-14 pb-8">
        <button onClick={() => goTo("quien-eres")} className="text-white/70 mb-4 flex items-center gap-1">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-sm">Volver</span>
        </button>
        <h1 className="text-2xl font-bold text-white">Crear cuenta</h1>
        <p className="text-white/70 text-sm mt-1">
          {esEmpresa ? "Para empresas" : "Para estudiantes"}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex flex-col gap-4">
          {campos.map(({ key, label, type, placeholder }) => (
            <div key={key}>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">{label}</label>
              <div className="flex items-center border border-[#E8E4F0] rounded-xl px-4 py-3 focus-within:border-[#6C3FA0] transition-colors">
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[key] ?? ""}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="flex-1 text-sm text-[#1a0a2e] placeholder-gray-300 outline-none bg-transparent"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => goTo(esEmpresa ? "home" : "completar-perfil")}
          className="w-full mt-6 bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-semibold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all"
        >
          Crear cuenta
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
    </div>
  );
}
