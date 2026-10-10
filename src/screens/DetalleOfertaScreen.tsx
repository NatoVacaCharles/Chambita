import { Screen, Oferta } from "../App";

type Props = { goTo: (s: Screen) => void; ofertaActiva: Oferta; postuladas: Set<number>; postular: (id: number) => void };

export default function DetalleOfertaScreen({ goTo, ofertaActiva, postuladas, postular }: Props) {
  const yaPostulado = postuladas.has(ofertaActiva.id);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0d1b3e] to-[#3d1c6e] px-5 pt-14 pb-6">
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => goTo("lista")} className="text-white/70 flex items-center gap-1">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="flex items-center gap-2">
            {ofertaActiva.miPrimeraChamba && (
              <span className="text-[10px] bg-[#F5A623] text-white px-2.5 py-1 rounded-full font-bold">Mi Primera Chamba</span>
            )}
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="text-white/60"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-lg" style={{ backgroundColor: ofertaActiva.logoColor }}>
            {ofertaActiva.logoLetra}
          </div>
          <div className="flex-1">
            <h1 className="text-white font-bold text-lg leading-tight">{ofertaActiva.titulo}</h1>
            <button onClick={() => goTo("detalle-empresa")} className="text-[#2DC8A8] text-sm mt-0.5 text-left">{ofertaActiva.empresa}</button>
          </div>
        </div>

        {/* Compatibilidad bar */}
        <div className="mt-4 bg-white/10 rounded-2xl p-3 flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-white/70 text-xs">Compatibilidad con tu perfil</p>
              <p className="text-white font-bold text-sm">{ofertaActiva.compatibilidad}%</p>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${ofertaActiva.compatibilidad}%`, backgroundColor: ofertaActiva.compatibilidad >= 85 ? "#2DC8A8" : "#F5A623" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Badges */}
        <div className="px-5 py-4 flex flex-wrap gap-2 border-b border-[#E8E4F0]">
          {ofertaActiva.sinExperiencia && (
            <span className="flex items-center gap-1.5 text-xs bg-[#E6FAF6] text-[#2DC8A8] px-3 py-1.5 rounded-full font-bold">
              ✅ Sin experiencia requerida
            </span>
          )}
          <span className="text-xs bg-[#F3EEFF] text-[#6C3FA0] px-3 py-1.5 rounded-full font-medium">📍 {ofertaActiva.ubicacion}</span>
          <span className="text-xs bg-[#F7F7FB] text-gray-600 px-3 py-1.5 rounded-full font-medium">⏰ {ofertaActiva.tiempo}</span>
          <span className="text-xs bg-[#F7F7FB] text-gray-600 px-3 py-1.5 rounded-full font-medium">🏢 {ofertaActiva.modalidad}</span>
        </div>

        {/* Salario */}
        <div className="px-5 py-4 border-b border-[#E8E4F0]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Remuneración</p>
              <p className="text-xl font-bold text-[#6C3FA0]">{ofertaActiva.salario}</p>
              <p className="text-xs text-gray-400">mensual · {ofertaActiva.tipo}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-0.5">Área</p>
              <p className="text-sm font-semibold text-[#1a0a2e]">{ofertaActiva.carrera}</p>
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="px-5 py-4 border-b border-[#E8E4F0]">
          <h2 className="font-bold text-[#1a0a2e] text-sm mb-2">Descripción</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{ofertaActiva.descripcion}</p>
        </div>

        {/* Requisitos */}
        <div className="px-5 py-4 border-b border-[#E8E4F0]">
          <h2 className="font-bold text-[#1a0a2e] text-sm mb-3">Requisitos</h2>
          <div className="flex flex-col gap-2">
            {ofertaActiva.requisitos.map((r) => (
              <div key={r} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#F3EEFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#6C3FA0]" />
                </div>
                <p className="text-sm text-gray-600">{r}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Beneficios */}
        <div className="px-5 py-4">
          <h2 className="font-bold text-[#1a0a2e] text-sm mb-3">Beneficios</h2>
          <div className="flex flex-col gap-2">
            {ofertaActiva.beneficios.map((b) => (
              <div key={b} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#E6FAF6] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="11" height="11" fill="none" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#2DC8A8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <p className="text-sm text-gray-600">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-5 py-4 border-t border-[#E8E4F0] bg-white">
        {yaPostulado ? (
          <div className="w-full bg-[#E6FAF6] text-[#2DC8A8] font-semibold py-3.5 rounded-2xl text-sm text-center flex items-center justify-center gap-2">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Ya te postulaste a esta oferta
          </div>
        ) : (
          <button
            onClick={() => postular(ofertaActiva.id)}
            className="w-full bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-bold py-4 rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-purple-200"
          >
            Postularme ahora →
          </button>
        )}
      </div>
    </div>
  );
}
