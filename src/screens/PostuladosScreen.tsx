import { CANDIDATOS, Candidato, Screen } from "../App";

type Props = {
  goTo: (screen: Screen) => void;
  setCandidatoActivo: (candidato: Candidato) => void;
};

export default function PostuladosScreen({
  goTo,
  setCandidatoActivo,
}: Props) {
  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      <div className="bg-white px-5 pt-14 pb-4 border-b border-[#E8E4F0]">
        <button
          onClick={() => goTo("mis-postulaciones")}
          className="flex items-center gap-1 text-gray-400 mb-4"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-sm">Convocatorias</span>
        </button>
        <h1 className="font-bold text-[#1a0a2e] text-xl">Postulantes</h1>
        <p className="text-xs text-gray-400 mt-1">
          Candidatos para tus convocatorias
        </p>
      </div>

      <div className="px-5 py-3 bg-white border-b border-[#E8E4F0]">
        <div className="flex items-center gap-2 bg-[#F7F7FB] rounded-xl px-3.5 py-2.5">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-gray-400">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="m20 20-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <input
            placeholder="Buscar candidato"
            className="flex-1 bg-transparent text-sm outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {CANDIDATOS.map((candidato) => (
            <button
              key={candidato.id}
              onClick={() => {
                setCandidatoActivo(candidato);
                goTo("detalle-candidato");
              }}
              className="bg-white border border-[#E8E4F0] rounded-2xl p-4 text-left"
            >
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F3EEFF] text-[#6C3FA0] flex items-center justify-center font-bold text-sm shrink-0">
                  {candidato.iniciales}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-[#1a0a2e] truncate">
                        {candidato.nombre}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {candidato.carrera} · {candidato.ciclo}
                      </p>
                    </div>
                    <span className="text-[#6C3FA0] text-sm font-bold">
                      {candidato.compatibilidad}%
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-2 truncate">
                    Postula a: {candidato.convocatoria}
                  </p>
                  <div className="flex gap-1 mt-2">
                    {candidato.habilidades.slice(0, 2).map((item) => (
                      <span
                        key={item}
                        className="text-[9px] bg-[#E6FAF6] text-[#239b83] px-2 py-0.5 rounded-full"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
