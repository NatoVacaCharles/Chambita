import { useState } from "react";
import { Screen, TipoUsuario } from "../App";

type Props = {
  goTo: (s: Screen) => void;
  tipoUsuario: TipoUsuario;
  setTipoUsuario: (tipo: TipoUsuario) => void;
};

export default function LoginScreen({
  goTo,
  tipoUsuario,
  setTipoUsuario,
}: Props) {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="bg-gradient-to-b from-[#3d1c6e] to-[#6C3FA0] px-6 pt-14 pb-10">
        <button
          onClick={() => goTo("splash")}
          className="text-white/70 mb-6 flex items-center gap-1"
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
        <h1 className="text-2xl font-bold text-white">Bienvenido de vuelta</h1>
        <p className="text-white/70 text-sm mt-1">
          Ingresa tus datos para continuar
        </p>
      </div>

      <div className="flex-1 px-6 py-7">
        <div className="grid grid-cols-2 gap-1 rounded-2xl bg-[#F3EEFF] p-1 mb-7">
          {(["estudiante", "empresa"] as TipoUsuario[]).map((tipo) => (
            <button
              key={tipo}
              onClick={() => setTipoUsuario(tipo)}
              className={`rounded-xl py-3 text-sm font-semibold transition-all ${
                tipoUsuario === tipo
                  ? "bg-white text-[#6C3FA0] shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Soy {tipo}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">
              Correo electrónico
            </label>
            <div className="flex items-center gap-3 border border-[#E8E4F0] rounded-xl px-4 py-3.5 focus-within:border-[#6C3FA0] transition-colors">
              <svg
                className="text-gray-400 shrink-0"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4 6h16v12H4V6Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="m4 7 8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
              <input
                type="email"
                value={correo}
                onChange={(event) => setCorreo(event.target.value)}
                placeholder={
                  tipoUsuario === "empresa"
                    ? "contacto@empresa.com"
                    : "tu@correo.com"
                }
                className="min-w-0 flex-1 bg-transparent text-sm text-[#1a0a2e] placeholder-gray-300 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">
              Contraseña
            </label>
            <div className="flex items-center gap-3 border border-[#E8E4F0] rounded-xl px-4 py-3.5 focus-within:border-[#6C3FA0] transition-colors">
              <svg
                className="text-gray-400 shrink-0"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
              >
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
              <input
                type="password"
                value={contrasena}
                onChange={(event) => setContrasena(event.target.value)}
                placeholder="••••••••"
                className="min-w-0 flex-1 bg-transparent text-sm text-[#1a0a2e] placeholder-gray-300 outline-none"
              />
            </div>
            <button className="mt-2 ml-auto block text-xs font-medium text-[#6C3FA0]">
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </div>

        <button
          onClick={() => goTo("home")}
          className="w-full mt-7 bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-semibold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-purple-200"
        >
          Iniciar sesión
        </button>

        <p className="text-center text-xs text-gray-400 mt-5">
          ¿Aún no tienes cuenta?{" "}
          <button
            onClick={() => goTo("quien-eres")}
            className="text-[#6C3FA0] font-medium"
          >
            Crear cuenta
          </button>
        </p>
      </div>
    </div>
  );
}
