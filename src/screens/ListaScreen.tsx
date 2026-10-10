import { useState } from "react";
import { Screen, OFERTAS, Oferta } from "../App";
import BottomNav from "../components/BottomNav";

type Props = { goTo: (s: Screen) => void; setOfertaActiva: (o: Oferta) => void; postuladas: Set<number> };

const FILTROS_RAPIDOS = ["Todos", "Sin experiencia", "Contabilidad", "Administración", "Ingeniería", "Marketing", "Remoto"];

export default function ListaScreen({ goTo, setOfertaActiva, postuladas }: Props) {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const ofertas = OFERTAS.filter((o) => {
    const matchBusq = busqueda === "" ||
      o.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      o.empresa.toLowerCase().includes(busqueda.toLowerCase());
    if (!matchBusq) return false;
    if (filtro === "Todos") return true;
    if (filtro === "Sin experiencia") return o.sinExperiencia;
    if (filtro === "Remoto") return o.modalidad === "Remoto";
    return o.carrera === filtro;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      {/* Header */}
      <div className="bg-white px-5 pt-14 pb-3 border-b border-[#E8E4F0]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="font-bold text-[#1a0a2e] text-lg">Oportunidades</h1>
            <p className="text-xs text-gray-400">{ofertas.length} vacantes en Arequipa</p>
          </div>
          <button onClick={() => goTo("filtros")} className="flex items-center gap-1.5 text-xs text-[#6C3FA0] font-semibold border-2 border-[#6C3FA0] px-3 py-2 rounded-xl">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M3 6h18M7 12h10M11 18h2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Filtrar
          </button>
        </div>
        <div className="flex items-center gap-2 bg-[#F7F7FB] rounded-xl px-4 py-2.5 mb-3">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-gray-400"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Busca por cargo, empresa…"
            className="flex-1 bg-transparent text-sm text-[#1a0a2e] placeholder-gray-400 outline-none"
          />
          {busqueda && <button onClick={() => setBusqueda("")} className="text-gray-400 text-xs">✕</button>}
        </div>
        {/* Filtros rápidos */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {FILTROS_RAPIDOS.map((f) => (
            <button key={f} onClick={() => setFiltro(f)} className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold transition-colors ${filtro === f ? "bg-[#6C3FA0] text-white" : "bg-[#F7F7FB] text-gray-500 border border-[#E8E4F0]"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {ofertas.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <span className="text-4xl">🔍</span>
            <p className="text-gray-400 text-sm text-center">No encontramos resultados.<br/>Prueba con otro término.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {ofertas.map((oferta) => (
              <button
                key={oferta.id}
                onClick={() => { setOfertaActiva(oferta); goTo("detalle-oferta"); }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#E8E4F0] text-left hover:border-[#6C3FA0] hover:shadow-md active:scale-95 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ backgroundColor: oferta.logoColor }}>
                    {oferta.logoLetra}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#1a0a2e] text-sm truncate">{oferta.titulo}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{oferta.empresa} · {oferta.ubicacion}</p>
                      </div>
                      <div className="flex flex-col items-end flex-shrink-0">
                        <span className="text-sm font-bold" style={{ color: oferta.compatibilidad >= 85 ? "#6C3FA0" : "#9ca3af" }}>{oferta.compatibilidad}%</span>
                        <span className="text-[9px] text-gray-400">match</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {oferta.sinExperiencia && <span className="text-[9px] bg-[#E6FAF6] text-[#2DC8A8] px-2 py-0.5 rounded-full font-bold">Sin exp.</span>}
                      {oferta.miPrimeraChamba && <span className="text-[9px] bg-[#FFF8EC] text-[#F5A623] px-2 py-0.5 rounded-full font-bold">Mi 1ra Chamba</span>}
                      <span className="text-[9px] bg-[#F3EEFF] text-[#6C3FA0] px-2 py-0.5 rounded-full">{oferta.modalidad}</span>
                      <span className="text-[9px] text-gray-400">{oferta.salario}</span>
                    </div>
                    {postuladas.has(oferta.id) && (
                      <p className="text-[10px] text-[#2DC8A8] font-semibold mt-1.5">✓ Postulado</p>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav goTo={goTo} active="lista" />
    </div>
  );
}
