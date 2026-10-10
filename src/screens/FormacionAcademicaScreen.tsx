import { useState } from "react";
import { Screen } from "../App";
import PerfilPageLayout from "../components/PerfilPageLayout";

type Props = { goTo: (screen: Screen) => void };
type Formacion = { institucion: string; carrera: string; inicio: string; fin: string; grado: string };

const inicial: Formacion = {
  institucion: "Universidad Nacional de San Agustín",
  carrera: "Contabilidad",
  inicio: "Mar 2022",
  fin: "Presente",
  grado: "Pregrado · 7mo ciclo",
};

export default function FormacionAcademicaScreen({ goTo }: Props) {
  const [formaciones, setFormaciones] = useState<Formacion[]>([inicial]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nueva, setNueva] = useState<Formacion>({ institucion: "", carrera: "", inicio: "", fin: "", grado: "" });

  const guardar = () => {
    if (!nueva.institucion || !nueva.carrera) return;
    setFormaciones([...formaciones, { ...nueva, fin: nueva.fin || "Presente" }]);
    setNueva({ institucion: "", carrera: "", inicio: "", fin: "", grado: "" });
    setMostrarFormulario(false);
  };

  return (
    <PerfilPageLayout goTo={goTo} title="Formación académica" subtitle="Añade los estudios que respaldan tu perfil">
      <div className="flex flex-col gap-3">
        {formaciones.map((item, index) => (
          <div key={`${item.institucion}-${index}`} className="bg-white border border-[#E8E4F0] rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#F3EEFF] text-[#6C3FA0] flex items-center justify-center shrink-0">
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="m3 9 9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M6 11v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="1.8"/></svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-[#1a0a2e] text-sm">{item.carrera}</p>
                <p className="text-xs text-gray-500 mt-0.5">{item.institucion}</p>
                <p className="text-xs text-gray-400 mt-2">{item.inicio} — {item.fin}</p>
                <span className="inline-block mt-2 rounded-full bg-[#E6FAF6] text-[#239b83] text-[10px] font-semibold px-2.5 py-1">{item.grado}</span>
              </div>
              <button className="text-gray-300"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" strokeWidth="1.7"/></svg></button>
            </div>
          </div>
        ))}
      </div>

      {mostrarFormulario ? (
        <div className="bg-white border border-[#6C3FA0]/30 rounded-2xl p-4 mt-4">
          <p className="font-bold text-sm text-[#1a0a2e] mb-4">Nueva formación</p>
          <div className="flex flex-col gap-3">
            {[
              ["institucion", "Institución"],
              ["carrera", "Carrera"],
              ["inicio", "Fecha de inicio"],
              ["fin", "Fecha de fin o presente"],
              ["grado", "Grado académico"],
            ].map(([key, label]) => (
              <div key={key}>
                <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                <input value={nueva[key as keyof Formacion]} onChange={(e) => setNueva({ ...nueva, [key]: e.target.value })} placeholder={key === "fin" ? "Presente" : ""} className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0]" />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={() => setMostrarFormulario(false)} className="flex-1 border border-[#E8E4F0] rounded-xl py-2.5 text-xs font-semibold text-gray-500">Cancelar</button>
            <button onClick={guardar} className="flex-1 bg-[#6C3FA0] rounded-xl py-2.5 text-xs font-semibold text-white">Guardar</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setMostrarFormulario(true)} className="w-full mt-4 border-2 border-dashed border-[#9B6FD0]/50 text-[#6C3FA0] font-semibold py-3.5 rounded-2xl text-sm">
          + Añadir formación
        </button>
      )}
    </PerfilPageLayout>
  );
}
