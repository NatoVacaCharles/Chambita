import { useState } from "react";
import { Screen, OFERTAS } from "../App";
import BottomNav from "../components/BottomNav";

type Props = { goTo: (s: Screen) => void; postuladas: Set<number> };

const ESTADO_MAP: Record<number, { label: string; color: string; bg: string }> = {
  1: { label: "En revisión", color: "#F5A623", bg: "#FFF8EC" },
  2: { label: "Entrevista", color: "#6C3FA0", bg: "#F3EEFF" },
  3: { label: "Ver disponibilidad", color: "#2DC8A8", bg: "#E6FAF6" },
  4: { label: "Seleccionado", color: "#22c55e", bg: "#f0fdf4" },
};

const TABS = ["Todas", "Activas", "Finalizadas"];

export default function MisPostulacionesScreen({ goTo, postuladas }: Props) {
  const [tab, setTab] = useState("Todas");

  const misOfertas = OFERTAS.filter((o) => postuladas.has(o.id));

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-4 border-b border-[#E8E4F0]">
        <h1 className="font-bold text-[#1a0a2e] text-xl mb-4">Mis postulaciones</h1>
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                tab === t ? "bg-[#6C3FA0] text-white" : "bg-[#F7F7FB] text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {misOfertas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="w-24 h-24 bg-[#F3EEFF] rounded-full flex items-center justify-center">
              <svg width="44" height="44" fill="none" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4" stroke="#6C3FA0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="#6C3FA0" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="text-center">
              <p className="font-bold text-[#1a0a2e] text-base">Sin postulaciones aún</p>
              <p className="text-gray-400 text-sm mt-1">Explora las oportunidades disponibles</p>
            </div>
            <button onClick={() => goTo("lista")} className="bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-semibold px-6 py-3 rounded-2xl text-sm">
              Buscar oportunidades
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {misOfertas.map((oferta, i) => {
              const estado = ESTADO_MAP[oferta.id] || ESTADO_MAP[1];
              return (
                <div key={oferta.id} className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E4F0]">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: oferta.logoColor }}>
                      {oferta.logoLetra}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-bold text-[#1a0a2e] text-sm">{oferta.titulo}</p>
                          <p className="text-xs text-gray-400">{oferta.empresa}</p>
                        </div>
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0" style={{ color: estado.color, backgroundColor: estado.bg }}>
                          {estado.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Postulado el {11 - i} May 2025</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav goTo={goTo} active="mis-postulaciones" />
    </div>
  );
}
