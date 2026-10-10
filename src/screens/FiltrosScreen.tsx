import { useState } from "react";
import { Screen } from "../App";

type Props = { goTo: (s: Screen) => void };

export default function FiltrosScreen({ goTo }: Props) {
  const [area, setArea] = useState("");
  const [modalidad, setModalidad] = useState("Todas");
  const [experiencia, setExperiencia] = useState("Sin experiencia");
  const [tipo, setTipo] = useState("Todas");
  const [ubicacion, setUbicacion] = useState("Arequipa, Perú");

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="flex items-center gap-3 px-5 pt-14 pb-5 border-b border-[#E8E4F0]">
        <button onClick={() => goTo("lista")} className="text-gray-400">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <h1 className="font-bold text-[#1a0a2e] text-lg flex-1">Filtros</h1>
        <span className="text-xs text-[#6C3FA0] font-medium">Limpiar</span>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="flex flex-col gap-5">
          {/* Área */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Área / Categoría</label>
            <select value={area} onChange={(e) => setArea(e.target.value)} className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm text-[#1a0a2e] outline-none focus:border-[#6C3FA0] bg-white">
              <option value="">Selección One</option>
              <option>Contabilidad y Finanzas</option>
              <option>Administración</option>
              <option>Ventas y Marketing</option>
              <option>Tecnología</option>
              <option>Atención al cliente</option>
            </select>
          </div>

          {/* Modalidad */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Modalidad</label>
            <div className="flex gap-2 flex-wrap">
              {["Todas", "Presencial", "Remoto", "Semipresencial"].map((m) => (
                <button key={m} onClick={() => setModalidad(m)} className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${modalidad === m ? "bg-[#6C3FA0] text-white border-[#6C3FA0]" : "bg-white text-gray-600 border-[#E8E4F0]"}`}>{m}</button>
              ))}
            </div>
          </div>

          {/* Experiencia */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Experiencia</label>
            <select value={experiencia} onChange={(e) => setExperiencia(e.target.value)} className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm text-[#1a0a2e] outline-none focus:border-[#6C3FA0] bg-white">
              <option>Sin experiencia</option>
              <option>Menos de 1 año</option>
              <option>1–2 años</option>
              <option>Más de 2 años</option>
            </select>
          </div>

          {/* Tipo de oportunidad */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Tipo de oportunidad</label>
            <div className="flex gap-2 flex-wrap">
              {["Todas", "Prácticas", "Primer empleo", "Temporal"].map((t) => (
                <button key={t} onClick={() => setTipo(t)} className={`px-4 py-2 rounded-full text-xs font-medium border transition-colors ${tipo === t ? "bg-[#6C3FA0] text-white border-[#6C3FA0]" : "bg-white text-gray-600 border-[#E8E4F0]"}`}>{t}</button>
              ))}
            </div>
          </div>

          {/* Ubicación */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Ubicación</label>
            <select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm text-[#1a0a2e] outline-none focus:border-[#6C3FA0] bg-white">
              <option>Arequipa, Perú</option>
              <option>Lima, Perú</option>
              <option>Cusco, Perú</option>
              <option>Trujillo, Perú</option>
            </select>
          </div>
        </div>
      </div>

      <div className="px-5 py-4 border-t border-[#E8E4F0] flex gap-3">
        <button onClick={() => goTo("lista")} className="flex-1 border-2 border-[#E8E4F0] text-gray-600 font-semibold py-3 rounded-2xl text-sm hover:border-gray-400 transition-colors">
          Cancelar
        </button>
        <button onClick={() => goTo("lista")} className="flex-1 bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-semibold py-3 rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all">
          Aplicar filtro
        </button>
      </div>
    </div>
  );
}
