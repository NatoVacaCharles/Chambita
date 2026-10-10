import { useState } from "react";
import { Screen } from "../App";
import BottomNav from "../components/BottomNav";

type Props = { goTo: (s: Screen) => void };

const SECCIONES: {
  icon: "usuario" | "estudios" | "filtros" | "documento" | "experiencia" | "configuracion";
  label: string;
  detalle: string;
  screen: Screen;
  badge?: boolean;
}[] = [
  { icon: "usuario", label: "Mis datos personales", detalle: "Nombre, correo, celular", screen: "datos-personales" },
  { icon: "estudios", label: "Formación académica", detalle: "UNSA · Contabilidad · 7mo ciclo", screen: "formacion-academica" },
  { icon: "filtros", label: "Modalidades y disponibilidad", detalle: "Medio tiempo · Presencial", screen: "filtros" },
  { icon: "documento", label: "CV / Documentos", detalle: "Añadir CV aumenta tus chances 3x", screen: "documentos", badge: true },
  { icon: "experiencia", label: "Experiencia y habilidades", detalle: "Excel, Word, Atención al cliente", screen: "experiencia-habilidades" },
  { icon: "configuracion", label: "Configuración", detalle: "Notificaciones, privacidad", screen: "configuracion" },
];

function SectionIcon({ name }: { name: (typeof SECCIONES)[number]["icon"] }) {
  const paths = {
    usuario: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-4 3-7 7-7s7 3 7 7" /></>,
    estudios: <><path d="m3 9 9-5 9 5-9 5-9-5Z" /><path d="M6 11v5c3 3 9 3 12 0v-5" /></>,
    filtros: <><path d="M4 6h16M7 12h10M10 18h4" /></>,
    documento: <><path d="M6 3h8l4 4v14H6V3Z" /><path d="M14 3v5h4M9 13h6M9 17h6" /></>,
    experiencia: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V4h8v3M3 12h18" /></>,
    configuracion: <><circle cx="12" cy="12" r="3" /><path d="M19 14.5l1.5 1-2 3.5-1.8-.8a8 8 0 0 1-2.7 1.5L13.8 22h-4l-.3-2.2a8 8 0 0 1-2.6-1.5L5 19l-2-3.5 1.7-1a8 8 0 0 1 0-3L3 10.5 5 7l1.9.8a8 8 0 0 1 2.6-1.5L9.8 4h4l.3 2.2a8 8 0 0 1 2.6 1.5L18.5 7l2 3.5-1.6 1a8 8 0 0 1 .1 3Z" /></>,
  };
  return (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-[#6C3FA0]">
      <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</g>
    </svg>
  );
}

export default function PerfilScreen({ goTo }: Props) {
  const [completado] = useState(65);

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0d1b3e] to-[#3d1c6e] px-5 pt-14 pb-6">
        <div className="flex items-start gap-4 mb-5">
          <div className="relative">
            <div className="w-16 h-16 bg-[#2DC8A8] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">K</div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
              <svg width="12" height="12" fill="none" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="#6C3FA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-white font-bold text-lg">Kely Tintaya</h2>
            <p className="text-white/60 text-sm">Estudiante de Contabilidad</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] bg-white/15 text-white px-2 py-0.5 rounded-full">UNSA</span>
              <span className="text-[10px] bg-white/15 text-white px-2 py-0.5 rounded-full">Arequipa</span>
            </div>
          </div>
        </div>

        {/* Perfil completado */}
        <div className="bg-white/10 rounded-2xl p-3.5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/80 text-xs font-medium">Completitud del perfil</p>
            <p className="text-white font-bold text-sm">{completado}%</p>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#2DC8A8] rounded-full" style={{ width: `${completado}%` }} />
          </div>
          <p className="text-white/50 text-[10px]">Añade tu CV para aumentar tus posibilidades 3x</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-2 px-4 -mt-4 mb-3 relative z-10">
        {[
          { val: "0", label: "Postulaciones" },
          { val: "94%", label: "Match promedio" },
          { val: "3", label: "Ofertas guardadas" },
        ].map(({ val, label }) => (
          <div key={label} className="flex-1 bg-white rounded-2xl py-3 text-center shadow-sm border border-[#E8E4F0]">
            <p className="font-bold text-[#6C3FA0] text-base">{val}</p>
            <p className="text-[9px] text-gray-400 leading-tight mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {/* Alerta CV */}
        <div className="bg-[#FFF8EC] border border-[#F5A623]/30 rounded-2xl px-4 py-3 flex items-center gap-3 mb-3">
          <span className="w-9 h-9 rounded-xl bg-[#F5A623]/15 flex items-center justify-center text-[#F5A623]">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6V3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M14 3v5h4" stroke="currentColor" strokeWidth="1.8"/></svg>
          </span>
          <div className="flex-1">
            <p className="text-[#b07010] font-semibold text-sm">Tu CV no está cargado</p>
            <p className="text-[#b07010]/70 text-xs">Las empresas lo necesitan para evaluarte</p>
          </div>
          <button onClick={() => goTo("documentos")} className="bg-[#F5A623] text-white text-xs font-bold px-3 py-1.5 rounded-xl">Añadir</button>
        </div>

        <div className="bg-white rounded-2xl border border-[#E8E4F0] overflow-hidden mb-3">
          {SECCIONES.map((sec, i) => (
            <button onClick={() => goTo(sec.screen)} key={sec.label} className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#F7F7FB] transition-colors text-left ${i < SECCIONES.length - 1 ? "border-b border-[#E8E4F0]" : ""}`}>
              <span className="w-9 h-9 rounded-xl bg-[#F3EEFF] flex items-center justify-center"><SectionIcon name={sec.icon} /></span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1a0a2e]">{sec.label}</p>
                <p className="text-xs text-gray-400 truncate">{sec.detalle}</p>
              </div>
              {sec.badge && <span className="text-[9px] bg-[#FFF8EC] text-[#F5A623] font-bold px-2 py-0.5 rounded-full flex-shrink-0">Pendiente</span>}
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-gray-300 flex-shrink-0"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo("splash")}
          className="w-full border-2 border-red-100 text-red-400 font-semibold py-3 rounded-2xl text-sm hover:bg-red-50 transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

      <BottomNav goTo={goTo} active="perfil" />
    </div>
  );
}
