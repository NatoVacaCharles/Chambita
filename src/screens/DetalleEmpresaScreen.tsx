import { Screen, OFERTAS } from "../App";

type Props = { goTo: (s: Screen) => void; setOfertaActiva: (o: any) => void };

export default function DetalleEmpresaScreen({ goTo, setOfertaActiva }: Props) {
  const empresa = OFERTAS[0];

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      <div className="bg-gradient-to-b from-[#1a0a2e] to-[#3d1c6e] px-5 pt-14 pb-8">
        <button onClick={() => goTo("detalle-oferta")} className="text-white/70 mb-5 flex items-center gap-1">
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          <span className="text-sm">Volver</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-[#F5A623] rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">S</div>
          <div>
            <h1 className="text-white font-bold text-xl">Studio Contable Paro</h1>
            <p className="text-white/60 text-sm">Empresa · Contabilidad</p>
            <p className="text-[#2DC8A8] text-sm">Arequipa</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Descripción */}
        <div className="px-5 py-5 border-b border-[#E8E4F0]">
          <h2 className="font-bold text-[#1a0a2e] text-sm mb-2">Sobre la empresa</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Somos una empresa dedicada a brindar servicios de Contabilidad y Tributaria a todas las MIPES en Arequipa. Con más de 10 años en el mercado.
          </p>
        </div>

        {/* Stats */}
        <div className="px-5 py-4 border-b border-[#E8E4F0]">
          <div className="grid grid-cols-3 gap-3">
            {[
              { val: "20–50", label: "Empleados" },
              { val: "3+", label: "Años en el mercado" },
              { val: "4.5", label: "Valoración" },
            ].map(({ val, label }) => (
              <div key={label} className="bg-[#F7F7FB] rounded-2xl p-3 text-center">
                <p className="font-bold text-[#6C3FA0] text-lg">{val}</p>
                <p className="text-[10px] text-gray-400 leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vacantes */}
        <div className="px-5 py-4">
          <h2 className="font-bold text-[#1a0a2e] text-sm mb-3">Vacantes activas (1)</h2>
          {OFERTAS.slice(0, 2).map((oferta) => (
            <button
              key={oferta.id}
              onClick={() => { setOfertaActiva(oferta); goTo("detalle-oferta"); }}
              className="w-full flex items-center gap-3 bg-[#F7F7FB] rounded-2xl p-4 mb-3 text-left hover:bg-[#F3EEFF] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: oferta.logoColor }}>
                {oferta.logoLetra}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#1a0a2e] text-sm">{oferta.titulo}</p>
                <p className="text-xs text-gray-400">{oferta.tiempo} · {oferta.salario}</p>
              </div>
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-gray-400"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 py-4 border-t border-[#E8E4F0]">
        <button onClick={() => goTo("mensajeria")} className="w-full bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-semibold py-3.5 rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all">
          Ver todas las vacantes
        </button>
      </div>
    </div>
  );
}
