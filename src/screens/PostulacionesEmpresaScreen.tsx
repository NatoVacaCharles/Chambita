import { useState } from "react";
import { Convocatoria, Screen, TipoUsuario } from "../App";
import BottomNav from "../components/BottomNav";

type Props = {
  goTo: (screen: Screen) => void;
  convocatorias: Convocatoria[];
  tipoUsuario: TipoUsuario;
};

const TABS = ["Todas", "Activas", "Finalizadas"];

export default function PostulacionesEmpresaScreen({
  goTo,
  convocatorias,
  tipoUsuario,
}: Props) {
  const [tab, setTab] = useState("Todas");
  const visibles = convocatorias.filter((item) => {
    if (tab === "Activas") return item.estado === "Activa";
    if (tab === "Finalizadas") return item.estado === "Finalizada";
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      <div className="bg-white px-5 pt-14 pb-4 border-b border-[#E8E4F0]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-bold text-[#1a0a2e] text-xl">
              Convocatorias
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {convocatorias.length} oportunidades publicadas
            </p>
          </div>
          <button
            onClick={() => goTo("nueva-convocatoria")}
            className="bg-[#6C3FA0] text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl"
          >
            + Nueva
          </button>
        </div>
        <div className="flex gap-1">
          {TABS.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold ${
                tab === item
                  ? "bg-[#6C3FA0] text-white"
                  : "bg-[#F7F7FB] text-gray-500"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {visibles.map((convocatoria) => (
            <div
              key={convocatoria.id}
              className="bg-white border border-[#E8E4F0] rounded-2xl p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#1a0a2e]">
                    {convocatoria.puesto}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {convocatoria.modalidad} · {convocatoria.disponibilidad}
                  </p>
                </div>
                <span
                  className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${
                    convocatoria.estado === "Activa"
                      ? "bg-[#E6FAF6] text-[#239b83]"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {convocatoria.estado}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F7F7FB]">
                <div>
                  <p className="text-[#6C3FA0] text-sm font-bold">
                    {convocatoria.postulantes}
                  </p>
                  <p className="text-[9px] text-gray-400">Postulantes</p>
                </div>
                <button
                  onClick={() => goTo("postulados")}
                  className="border border-[#6C3FA0] text-[#6C3FA0] text-xs font-semibold px-3.5 py-2 rounded-xl"
                >
                  Ver postulantes
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav
        goTo={goTo}
        active="mis-postulaciones"
        tipoUsuario={tipoUsuario}
      />
    </div>
  );
}
