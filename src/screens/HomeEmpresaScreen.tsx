import { Convocatoria, Screen, TipoUsuario } from "../App";
import BottomNav from "../components/BottomNav";

type Props = {
  goTo: (screen: Screen) => void;
  convocatorias: Convocatoria[];
  tipoUsuario: TipoUsuario;
};

export default function HomeEmpresaScreen({
  goTo,
  convocatorias,
  tipoUsuario,
}: Props) {
  const activas = convocatorias.filter((item) => item.estado === "Activa");
  const totalPostulantes = convocatorias.reduce(
    (total, item) => total + item.postulantes,
    0,
  );

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      <div className="bg-gradient-to-br from-[#0d1b3e] via-[#1e2f6b] to-[#3d1c6e] px-5 pt-14 pb-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs">Panel de empresa</p>
            <h1 className="text-white font-bold text-xl mt-0.5">
              Studio Contable Paro
            </h1>
            <p className="text-white/50 text-xs mt-1">
              Gestiona tus convocatorias y candidatos
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-sm">
            SC
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-white/10 border border-white/10 rounded-2xl p-3.5">
            <p className="text-[#2DC8A8] text-xl font-bold">{activas.length}</p>
            <p className="text-white/60 text-[10px] mt-1">
              Convocatorias activas
            </p>
          </div>
          <div className="bg-white/10 border border-white/10 rounded-2xl p-3.5">
            <p className="text-[#2DC8A8] text-xl font-bold">
              {totalPostulantes}
            </p>
            <p className="text-white/60 text-[10px] mt-1">
              Postulantes recibidos
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-bold text-[#1a0a2e] text-base">
              Tus convocatorias
            </h2>
            <p className="text-[10px] text-gray-400">
              Revisa el avance de tus oportunidades
            </p>
          </div>
          <button
            onClick={() => goTo("nueva-convocatoria")}
            className="w-9 h-9 rounded-xl bg-[#2DC8A8] text-white text-xl font-medium shadow-sm"
            aria-label="Crear convocatoria"
          >
            +
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {convocatorias.slice(0, 3).map((convocatoria) => (
            <button
              key={convocatoria.id}
              onClick={() => goTo("mis-postulaciones")}
              className="bg-white border border-[#E8E4F0] rounded-2xl p-4 text-left hover:border-[#6C3FA0] active:scale-95 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1a0a2e]">
                    {convocatoria.puesto}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {convocatoria.modalidad} · {convocatoria.disponibilidad}
                  </p>
                </div>
                <span
                  className={`text-[9px] font-bold rounded-full px-2.5 py-1 ${
                    convocatoria.estado === "Activa"
                      ? "bg-[#E6FAF6] text-[#239b83]"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {convocatoria.estado}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F7F7FB]">
                <div className="flex items-center gap-2 text-[#6C3FA0]">
                  <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
                    <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M3 19c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5M16 6.5a3 3 0 0 1 0 5.8M17 14c2.4.5 4 2.4 4 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  <span className="text-xs font-bold">
                    {convocatoria.postulantes} postulantes
                  </span>
                </div>
                <span className="text-[10px] text-gray-400">
                  {convocatoria.fecha}
                </span>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo("mis-postulaciones")}
          className="w-full mt-4 text-[#6C3FA0] text-xs font-semibold py-3"
        >
          Ver todas las convocatorias
        </button>
      </div>

      <BottomNav
        goTo={goTo}
        active="home"
        tipoUsuario={tipoUsuario}
      />
    </div>
  );
}
