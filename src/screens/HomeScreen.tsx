import { useState } from "react";
import { Screen, OFERTAS, Oferta } from "../App";
import BottomNav from "../components/BottomNav";

type Props = { goTo: (s: Screen) => void; setOfertaActiva: (o: Oferta) => void; postuladas: Set<number> };

const TABS = ["Todos", "Sin experiencia", "Remoto", "Temporal"];

const CONSEJOS_PREVIEW = [
  { emoji: "📄", titulo: "Cómo hacer un CV sin experiencia", color: "#F3EEFF", text: "#6C3FA0" },
  { emoji: "🎯", titulo: "Cómo postularte con éxito", color: "#E6FAF6", text: "#2DC8A8" },
  { emoji: "💬", titulo: "Cómo prepararte para una entrevista", color: "#FFF8EC", text: "#F5A623" },
];

export default function HomeScreen({ goTo, setOfertaActiva, postuladas }: Props) {
  const [tab, setTab] = useState("Todos");
  const [notifOpen, setNotifOpen] = useState(false);

  const filtered = OFERTAS.filter((o) => {
    if (tab === "Sin experiencia") return o.sinExperiencia;
    if (tab === "Remoto") return o.modalidad === "Remoto";
    if (tab === "Temporal") return o.tipo === "Trabajo temporal";
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      {/* Top bar */}
      <div className="bg-gradient-to-br from-[#0d1b3e] via-[#1e2f6b] to-[#3d1c6e] px-5 pt-14 pb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-white/50 text-xs">¡Hola,</p>
            <h2 className="text-white font-bold text-xl">Kely! 👋</h2>
            <p className="text-white/40 text-xs mt-0.5">Estudiante de Contabilidad · UNSA</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border border-white/20"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-white"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#E83E8C] rounded-full text-white text-[9px] flex items-center justify-center font-bold">3</span>
            </button>
            <div className="w-10 h-10 bg-[#2DC8A8] rounded-full flex items-center justify-center text-white font-bold text-sm shadow">K</div>
          </div>
        </div>

        {/* Notif dropdown */}
        {notifOpen && (
          <div className="bg-white rounded-2xl p-3 mb-4 shadow-xl">
            <p className="text-xs font-bold text-[#1a0a2e] mb-2">Notificaciones</p>
            {[
              { msg: "Studio Contable revisó tu perfil", time: "hace 2h", color: "#6C3FA0" },
              { msg: "Nueva vacante de Contabilidad en Arequipa", time: "hace 5h", color: "#2DC8A8" },
              { msg: "Completa tu perfil para destacar", time: "ayer", color: "#F5A623" },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-2.5 py-2 border-t border-[#F7F7FB]">
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: n.color }} />
                <div className="flex-1">
                  <p className="text-xs text-[#1a0a2e]">{n.msg}</p>
                  <p className="text-[10px] text-gray-400">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white/12 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-white/50"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <input placeholder="Buscar en Arequipa…" className="flex-1 bg-transparent text-white placeholder-white/40 text-sm outline-none" />
          </div>
          <button onClick={() => goTo("filtros")} className="w-11 h-11 bg-[#2DC8A8] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-white"><path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Stats strip */}
        <div className="flex gap-2 px-5 py-3 overflow-x-auto">
          {[
            { val: "47", label: "Vacantes", icon: "💼" },
            { val: "94%", label: "Compatibilidad", icon: "🎯" },
            { val: "0", label: "Exp. requerida", icon: "✅" },
          ].map(({ val, label, icon }) => (
            <div key={label} className="flex-shrink-0 flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5 border border-[#E8E4F0] shadow-sm">
              <span className="text-base">{icon}</span>
              <div>
                <p className="font-bold text-[#1a0a2e] text-sm leading-none">{val}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 px-5 pb-3 overflow-x-auto">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                tab === t ? "bg-[#6C3FA0] text-white" : "bg-white text-gray-500 border border-[#E8E4F0]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Para ti — destacadas */}
        <div className="px-5 mb-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[#1a0a2e] text-sm">Para ti 🎯</h3>
            <button onClick={() => goTo("lista")} className="text-[#6C3FA0] text-xs font-medium">Ver todas →</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1">
            {OFERTAS.filter((o) => o.compatibilidad >= 85).map((oferta) => (
              <button
                key={oferta.id}
                onClick={() => { setOfertaActiva(oferta); goTo("detalle-oferta"); }}
                className="flex-shrink-0 w-60 bg-white rounded-2xl p-4 shadow-sm border border-[#E8E4F0] text-left hover:border-[#6C3FA0] active:scale-95 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: oferta.logoColor }}>
                      {oferta.logoLetra}
                    </div>
                    <div>
                      <p className="font-semibold text-[#1a0a2e] text-xs leading-tight">{oferta.empresa}</p>
                      <p className="text-[10px] text-gray-400">{oferta.ubicacion}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-[#6C3FA0]">{oferta.compatibilidad}%</span>
                    <span className="text-[9px] text-gray-400">match</span>
                  </div>
                </div>
                <p className="font-bold text-[#1a0a2e] text-sm mb-2 leading-tight">{oferta.titulo}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {oferta.sinExperiencia && (
                    <span className="text-[9px] bg-[#E6FAF6] text-[#2DC8A8] px-2 py-0.5 rounded-full font-bold">Sin experiencia</span>
                  )}
                  {oferta.miPrimeraChamba && (
                    <span className="text-[9px] bg-[#FFF8EC] text-[#F5A623] px-2 py-0.5 rounded-full font-bold">Mi 1ra Chamba</span>
                  )}
                </div>
                <p className="text-xs text-[#6C3FA0] font-semibold">{oferta.salario}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recientes */}
        <div className="px-5 mb-5">
          <h3 className="font-bold text-[#1a0a2e] text-sm mb-3">Recién publicadas</h3>
          <div className="flex flex-col gap-2.5">
            {filtered.map((oferta) => (
              <button
                key={oferta.id}
                onClick={() => { setOfertaActiva(oferta); goTo("detalle-oferta"); }}
                className="bg-white rounded-2xl p-3.5 shadow-sm border border-[#E8E4F0] text-left hover:border-[#6C3FA0] active:scale-95 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: oferta.logoColor }}>
                    {oferta.logoLetra}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#1a0a2e] text-sm truncate">{oferta.titulo}</p>
                    <p className="text-xs text-gray-400 truncate">{oferta.empresa} · {oferta.ubicacion}</p>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {oferta.sinExperiencia && <span className="text-[9px] bg-[#E6FAF6] text-[#2DC8A8] px-2 py-0.5 rounded-full font-bold">Sin exp.</span>}
                      {oferta.miPrimeraChamba && <span className="text-[9px] bg-[#FFF8EC] text-[#F5A623] px-2 py-0.5 rounded-full font-bold">Mi 1ra Chamba</span>}
                      <span className="text-[9px] bg-[#F3EEFF] text-[#6C3FA0] px-2 py-0.5 rounded-full font-medium">{oferta.salario}</span>
                      {postuladas.has(oferta.id) && <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">✓ Postulado</span>}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs font-bold" style={{ color: oferta.compatibilidad >= 85 ? "#6C3FA0" : "#9ca3af" }}>{oferta.compatibilidad}%</span>
                    <span className="text-[9px] text-gray-400">match</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Consejos */}
        <div className="px-5 pb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-[#1a0a2e] text-sm">Consejos para ti 💡</h3>
            <button onClick={() => goTo("consejos")} className="text-[#6C3FA0] text-xs font-medium">Ver más →</button>
          </div>
          <div className="flex flex-col gap-2">
            {CONSEJOS_PREVIEW.map((c) => (
              <button
                key={c.titulo}
                onClick={() => goTo("consejos")}
                className="flex items-center gap-3 bg-white rounded-2xl p-3.5 border border-[#E8E4F0] text-left hover:border-[#6C3FA0] active:scale-95 transition-all"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ backgroundColor: c.color }}>
                  {c.emoji}
                </div>
                <p className="text-sm font-medium text-[#1a0a2e]">{c.titulo}</p>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-gray-300 ml-auto flex-shrink-0"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav goTo={goTo} active="home" />
    </div>
  );
}
