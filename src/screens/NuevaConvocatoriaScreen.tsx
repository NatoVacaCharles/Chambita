import { useState } from "react";
import { Convocatoria, Screen } from "../App";

type Props = {
  goTo: (screen: Screen) => void;
  convocatorias: Convocatoria[];
  setConvocatorias: (items: Convocatoria[]) => void;
};

export default function NuevaConvocatoriaScreen({
  goTo,
  convocatorias,
  setConvocatorias,
}: Props) {
  const [form, setForm] = useState({
    puesto: "",
    modalidad: "",
    disponibilidad: "",
    remuneracion: "",
  });

  const publicar = () => {
    if (Object.values(form).some((value) => !value.trim())) return;
    setConvocatorias([
      {
        id: Date.now(),
        ...form,
        postulantes: 0,
        estado: "Activa",
        fecha: "Publicada hoy",
      },
      ...convocatorias,
    ]);
    goTo("mis-postulaciones");
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      <div className="bg-gradient-to-br from-[#0d1b3e] to-[#3d1c6e] px-5 pt-14 pb-6">
        <button
          onClick={() => goTo("mis-postulaciones")}
          className="flex items-center gap-1 text-white/70 mb-4"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-sm">Convocatorias</span>
        </button>
        <h1 className="text-xl text-white font-bold">Nueva convocatoria</h1>
        <p className="text-white/60 text-xs mt-1">
          Publica una oportunidad para nuevos talentos
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="bg-white border border-[#E8E4F0] rounded-2xl p-4 flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1.5">
              Puesto
            </label>
            <input
              value={form.puesto}
              onChange={(event) =>
                setForm({ ...form, puesto: event.target.value })
              }
              placeholder="Ej. Practicante de Contabilidad"
              className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6C3FA0]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1.5">
              Modalidad
            </label>
            <select
              value={form.modalidad}
              onChange={(event) =>
                setForm({ ...form, modalidad: event.target.value })
              }
              className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm bg-white outline-none focus:border-[#6C3FA0]"
            >
              <option value="">Seleccionar modalidad</option>
              <option>Presencial</option>
              <option>Remoto</option>
              <option>Semipresencial</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1.5">
              Disponibilidad
            </label>
            <select
              value={form.disponibilidad}
              onChange={(event) =>
                setForm({ ...form, disponibilidad: event.target.value })
              }
              className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm bg-white outline-none focus:border-[#6C3FA0]"
            >
              <option value="">Seleccionar disponibilidad</option>
              <option>Tiempo completo</option>
              <option>Medio tiempo</option>
              <option>Por horas</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500 block mb-1.5">
              Remuneración
            </label>
            <input
              value={form.remuneracion}
              onChange={(event) =>
                setForm({ ...form, remuneracion: event.target.value })
              }
              placeholder="Ej. S/ 700 – 900"
              className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#6C3FA0]"
            />
          </div>
        </div>
        <button
          onClick={publicar}
          className="w-full mt-5 bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-semibold py-3.5 rounded-2xl text-sm"
        >
          Publicar convocatoria
        </button>
      </div>
    </div>
  );
}
