import { Screen } from "../App";

type Props = { goTo: (s: Screen) => void; ofertaActiva: any };

export default function ConfirmacionScreen({ goTo, ofertaActiva }: Props) {
  return (
    <div className="flex-1 flex flex-col bg-white items-center justify-center px-8">
      {/* Animación */}
      <div className="relative mb-8">
        <div className="w-44 h-44 bg-gradient-to-br from-[#F3EEFF] to-[#E6FAF6] rounded-full flex items-center justify-center shadow-xl shadow-purple-100">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path d="M15 40L65 15L52 65L38 47L15 40Z" fill="#6C3FA0" opacity="0.9"/>
            <path d="M38 47L52 33" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <circle cx="62" cy="20" r="5" fill="#2DC8A8"/>
            <circle cx="70" cy="13" r="3" fill="#F5A623" opacity="0.7"/>
            <circle cx="72" cy="26" r="2" fill="#2DC8A8" opacity="0.5"/>
            <circle cx="58" cy="10" r="2" fill="#9B6FD0" opacity="0.6"/>
          </svg>
        </div>
        {/* Confeti dots */}
        <div className="absolute top-2 left-2 w-3 h-3 bg-[#F5A623] rounded-full opacity-80" />
        <div className="absolute top-8 right-0 w-2 h-2 bg-[#2DC8A8] rounded-full opacity-70" />
        <div className="absolute bottom-4 left-0 w-2.5 h-2.5 bg-[#E83E8C] rounded-full opacity-60" />
      </div>

      <h1 className="text-2xl font-bold text-[#1a0a2e] text-center mb-2">¡Postulación enviada!</h1>
      <p className="text-gray-500 text-sm text-center leading-relaxed mb-4">
        Tu postulación a <span className="font-semibold text-[#6C3FA0]">{ofertaActiva?.titulo || "esta oferta"}</span> fue enviada correctamente.
      </p>

      {/* Info cards */}
      <div className="w-full flex flex-col gap-2 mb-8">
        {[
          { icon: "📋", text: "La empresa revisará tu perfil en los próximos días" },
          { icon: "🔔", text: "Te notificaremos cuando haya una respuesta" },
          { icon: "💬", text: "Puedes escribirles por el chat si tienes dudas" },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-start gap-3 bg-[#F7F7FB] rounded-2xl px-4 py-3">
            <span className="text-base">{icon}</span>
            <p className="text-xs text-gray-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="w-full flex flex-col gap-3">
        <button
          onClick={() => goTo("mis-postulaciones")}
          className="w-full bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-bold py-4 rounded-2xl text-sm hover:opacity-90 active:scale-95 transition-all"
        >
          Ver mis postulaciones
        </button>
        <button
          onClick={() => goTo("lista")}
          className="w-full border-2 border-[#E8E4F0] text-gray-600 font-semibold py-3.5 rounded-2xl text-sm hover:border-[#6C3FA0] hover:text-[#6C3FA0] transition-colors"
        >
          Seguir buscando
        </button>
      </div>
    </div>
  );
}
