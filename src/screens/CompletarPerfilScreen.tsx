import { useState } from "react";
import { Screen } from "../App";

type Props = { goTo: (s: Screen) => void };

const HABILIDADES = ["Excel", "Word", "Atención al cliente", "Trabajo en equipo", "Photoshop", "Contabilidad", "Marketing digital", "Inglés básico"];

export default function CompletarPerfilScreen({ goTo }: Props) {
  const [carrera, setCarrera] = useState("");
  const [ciclo, setCiclo] = useState("");
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [busca, setBusca] = useState<string[]>([]);
  const [disponibilidad, setDisponibilidad] = useState("");

  const toggleItem = (arr: string[], item: string, setter: (v: string[]) => void) => {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="bg-gradient-to-b from-[#3d1c6e] to-[#6C3FA0] px-6 pt-14 pb-6">
        <h1 className="text-xl font-bold text-white">Completa tu perfil</h1>
        <p className="text-white/70 text-sm mt-1">Cuéntanos más sobre ti</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-[#F3EEFF] border-4 border-white shadow-lg flex items-center justify-center">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" fill="#6C3FA0" opacity="0.5"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#6C3FA0" strokeWidth="2" strokeLinecap="round"/></svg>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#6C3FA0] rounded-full flex items-center justify-center">
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {/* Carrera */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Carrera / Especialidad</label>
            <select value={carrera} onChange={(e) => setCarrera(e.target.value)} className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm text-[#1a0a2e] outline-none focus:border-[#6C3FA0] bg-white">
              <option value="">Seleccionar carrera</option>
              <option>Contabilidad</option>
              <option>Administración</option>
              <option>Marketing</option>
              <option>Ingeniería de Sistemas</option>
              <option>Derecho</option>
            </select>
          </div>

          {/* Ciclo */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Ciclo académico</label>
            <select value={ciclo} onChange={(e) => setCiclo(e.target.value)} className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm text-[#1a0a2e] outline-none focus:border-[#6C3FA0] bg-white">
              <option value="">Seleccionar ciclo</option>
              {[1,2,3,4,5,6,7,8,9,10].map((n) => <option key={n}>{n}° ciclo</option>)}
            </select>
          </div>

          {/* Habilidades */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">Habilidades</label>
            <div className="flex flex-wrap gap-2">
              {HABILIDADES.map((h) => (
                <button
                  key={h}
                  onClick={() => toggleItem(habilidades, h, setHabilidades)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    habilidades.includes(h)
                      ? "bg-[#6C3FA0] text-white border-[#6C3FA0]"
                      : "bg-white text-gray-600 border-[#E8E4F0]"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Qué buscas */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-2 block">¿Qué buscas?</label>
            {["Prácticas preprofesionales", "Primer empleo", "Trabajo temporal"].map((op) => (
              <label key={op} className="flex items-center gap-3 py-2 cursor-pointer">
                <div
                  onClick={() => toggleItem(busca, op, setBusca)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    busca.includes(op) ? "bg-[#6C3FA0] border-[#6C3FA0]" : "border-[#E8E4F0]"
                  }`}
                >
                  {busca.includes(op) && <svg width="12" height="12" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span className="text-sm text-[#1a0a2e]">{op}</span>
              </label>
            ))}
          </div>

          {/* Disponibilidad */}
          <div>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Disponibilidad</label>
            <select value={disponibilidad} onChange={(e) => setDisponibilidad(e.target.value)} className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm text-[#1a0a2e] outline-none focus:border-[#6C3FA0] bg-white">
              <option value="">Seleccione disponibilidad</option>
              <option>Mañanas</option>
              <option>Tardes</option>
              <option>Noches</option>
              <option>Tiempo completo</option>
              <option>Medio tiempo</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => goTo("home")}
          className="w-full mt-6 bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-semibold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all"
        >
          Guardar perfil
        </button>
      </div>
    </div>
  );
}
