import { Screen } from "../App";

type Props = { goTo: (s: Screen) => void };

export default function SplashScreen({ goTo }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-between bg-gradient-to-b from-[#0d1b3e] via-[#1e2f6b] to-[#3d1c6e] px-8 py-16 relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-10 right-6 w-36 h-36 rounded-full bg-white/5 blur-xl" />
      <div className="absolute bottom-32 left-4 w-24 h-24 rounded-full bg-[#2DC8A8]/10 blur-xl" />
      <div className="absolute top-36 left-8 w-14 h-14 rounded-full bg-[#6C3FA0]/30" />

      <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center gap-5">
          <div className="w-28 h-28 bg-white/10 rounded-[2rem] flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl shadow-purple-900/50">
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
              <circle cx="20" cy="20" r="11" fill="#2DC8A8"/>
              <circle cx="38" cy="20" r="11" fill="#9B6FD0" opacity="0.85"/>
              <path d="M7 44c0-6 5.8-11 13-11h18c7.2 0 13 5 13 11" stroke="#2DC8A8" strokeWidth="3.5" strokeLinecap="round"/>
              <path d="M25 32v6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M33 32v6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white tracking-widest">CHAMBITA</h1>
            <p className="text-[#2DC8A8] text-base mt-1.5 font-semibold">Tu primer empleo, más cerca.</p>
            <p className="text-white/50 text-xs mt-1">Conectamos talento joven con oportunidades reales en Arequipa</p>
          </div>
        </div>

        {/* Illustration / stats */}
        <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-sm">
          <p className="text-white/40 text-[10px] uppercase tracking-wider mb-3 text-center">Hoy en Arequipa</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "47", label: "Vacantes activas" },
              { val: "120+", label: "Empresas" },
              { val: "0", label: "Experiencia req." },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="text-[#2DC8A8] font-bold text-xl">{val}</p>
                <p className="text-white/50 text-[10px] leading-tight mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partners badge */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2">
          <span className="text-white/40 text-[10px]">Aliado con</span>
          <span className="text-white font-semibold text-xs">UNSA</span>
          <span className="text-white/20">·</span>
          <span className="text-white font-semibold text-xs">MTPE</span>
          <span className="text-white/20">·</span>
          <span className="text-[#F5A623] font-semibold text-xs">Mi Primera Chamba</span>
        </div>
      </div>

      {/* Actions */}
      <div className="w-full flex flex-col gap-3 relative z-10">
        <button
          onClick={() => goTo("login")}
          className="w-full bg-[#2DC8A8] text-white font-bold py-4 rounded-2xl text-sm hover:bg-[#25a98e] active:scale-95 transition-all shadow-lg shadow-teal-700/30"
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => goTo("quien-eres")}
          className="w-full bg-white/10 border border-white/25 text-white font-semibold py-4 rounded-2xl text-sm hover:bg-white/15 active:scale-95 transition-all backdrop-blur-sm"
        >
          Crear cuenta gratis
        </button>
        <button
          onClick={() => goTo("home")}
          className="text-white/40 text-xs text-center py-1.5 hover:text-white/60 transition-colors"
        >
          Explorar sin cuenta →
        </button>
      </div>
    </div>
  );
}
