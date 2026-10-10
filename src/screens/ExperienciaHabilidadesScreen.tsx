import { useState } from "react";
import { Screen } from "../App";
import PerfilPageLayout from "../components/PerfilPageLayout";

type Props = { goTo: (screen: Screen) => void };
type Experiencia = { empresa: string; puesto: string; inicio: string; fin: string };

export default function ExperienciaHabilidadesScreen({ goTo }: Props) {
  const [experiencias, setExperiencias] = useState<Experiencia[]>([
    { empresa: "Bodega San José", puesto: "Atención al cliente", inicio: "Ene 2023", fin: "Dic 2023" },
  ]);
  const [nueva, setNueva] = useState<Experiencia>({ empresa: "", puesto: "", inicio: "", fin: "" });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [habilidades, setHabilidades] = useState(["Excel", "Word", "Atención al cliente", "Trabajo en equipo"]);
  const [habilidad, setHabilidad] = useState("");

  const guardarExperiencia = () => {
    if (!nueva.empresa || !nueva.puesto) return;
    setExperiencias([...experiencias, { ...nueva, fin: nueva.fin || "Presente" }]);
    setNueva({ empresa: "", puesto: "", inicio: "", fin: "" });
    setMostrarFormulario(false);
  };
  const agregarHabilidad = () => {
    const valor = habilidad.trim();
    if (!valor || habilidades.includes(valor)) return;
    setHabilidades([...habilidades, valor]);
    setHabilidad("");
  };

  return (
    <PerfilPageLayout goTo={goTo} title="Experiencia y habilidades" subtitle="Muestra lo que sabes hacer y dónde lo aprendiste">
      <p className="font-bold text-sm text-[#1a0a2e] mb-3">Experiencia</p>
      <div className="flex flex-col gap-3">
        {experiencias.map((item, index) => (
          <div key={`${item.empresa}-${index}`} className="bg-white border border-[#E8E4F0] rounded-2xl p-4 flex gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E6FAF6] text-[#239b83] flex items-center justify-center shrink-0">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M8 7V4h8v3M3 12h18" stroke="currentColor" strokeWidth="1.8"/></svg>
            </div>
            <div>
              <p className="text-sm font-bold text-[#1a0a2e]">{item.puesto}</p>
              <p className="text-xs text-gray-500">{item.empresa}</p>
              <p className="text-[10px] text-gray-400 mt-2">{item.inicio} — {item.fin}</p>
            </div>
          </div>
        ))}
      </div>

      {mostrarFormulario ? (
        <div className="bg-white border border-[#6C3FA0]/30 rounded-2xl p-4 mt-3">
          {[
            ["empresa", "Empresa"],
            ["puesto", "Puesto desempeñado"],
            ["inicio", "Fecha de inicio"],
            ["fin", "Fecha de fin o presente"],
          ].map(([key, label]) => (
            <div key={key} className="mb-3">
              <label className="text-xs text-gray-500 mb-1 block">{label}</label>
              <input value={nueva[key as keyof Experiencia]} onChange={(e) => setNueva({ ...nueva, [key]: e.target.value })} placeholder={key === "fin" ? "Presente" : ""} className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0]" />
            </div>
          ))}
          <div className="flex gap-2">
            <button onClick={() => setMostrarFormulario(false)} className="flex-1 border border-[#E8E4F0] rounded-xl py-2.5 text-xs font-semibold text-gray-500">Cancelar</button>
            <button onClick={guardarExperiencia} className="flex-1 bg-[#6C3FA0] rounded-xl py-2.5 text-xs font-semibold text-white">Guardar</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setMostrarFormulario(true)} className="w-full mt-3 border-2 border-dashed border-[#9B6FD0]/50 text-[#6C3FA0] font-semibold py-3 rounded-2xl text-sm">+ Añadir experiencia</button>
      )}

      <p className="font-bold text-sm text-[#1a0a2e] mt-7 mb-3">Habilidades</p>
      <div className="bg-white border border-[#E8E4F0] rounded-2xl p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {habilidades.map((item) => (
            <button key={item} onClick={() => setHabilidades(habilidades.filter((h) => h !== item))} className="bg-[#F3EEFF] text-[#6C3FA0] rounded-full px-3 py-1.5 text-xs font-semibold">
              {item} <span className="ml-1 text-[#9B6FD0]">×</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input value={habilidad} onChange={(e) => setHabilidad(e.target.value)} onKeyDown={(e) => e.key === "Enter" && agregarHabilidad()} placeholder="Nueva habilidad" className="min-w-0 flex-1 border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0]" />
          <button onClick={agregarHabilidad} className="bg-[#2DC8A8] text-white rounded-xl px-4 text-lg font-medium">+</button>
        </div>
      </div>
    </PerfilPageLayout>
  );
}
