import { useState } from "react";
import { Screen } from "../App";
import BottomNav from "../components/BottomNav";

type Props = { goTo: (s: Screen) => void };

const GUIAS = [
  {
    id: 1,
    emoji: "📄",
    titulo: "Cómo hacer un CV sin experiencia",
    categoria: "CV",
    color: "#F3EEFF",
    accent: "#6C3FA0",
    descripcion: "No necesitas experiencia laboral para tener un CV impactante. Aquí te enseñamos cómo destacar tus habilidades, logros académicos y actividades.",
    pasos: [
      "Usa una plantilla limpia y profesional (1 página máximo)",
      "Incluye tus datos de contacto: celular y correo",
      "Agrega tu carrera, universidad y ciclo actual",
      "Lista tus habilidades técnicas (Excel, Word, herramientas)",
      "Incluye cursos, talleres o certificaciones",
      "Añade actividades extracurriculares o voluntariados",
      "Usa verbos de acción: gestioné, organicé, apoyé, desarrollé",
    ],
  },
  {
    id: 2,
    emoji: "🎯",
    titulo: "Cómo postularte con éxito",
    categoria: "Postulación",
    color: "#E6FAF6",
    accent: "#2DC8A8",
    descripcion: "Postularte bien marca la diferencia. Estos consejos aumentan tu probabilidad de ser llamado a entrevista.",
    pasos: [
      "Lee bien la oferta antes de postular",
      "Adapta tu CV a cada posición que solicitas",
      "Escribe una carta de presentación breve (3 párrafos)",
      "Postula en las primeras 48 horas de publicada la vacante",
      "Sigue el estado de tu postulación en 'Mis postulaciones'",
      "Si no recibes respuesta en 5 días, puedes escribirle a la empresa",
    ],
  },
  {
    id: 3,
    emoji: "💬",
    titulo: "Cómo prepararte para una entrevista",
    categoria: "Entrevista",
    color: "#FFF8EC",
    accent: "#F5A623",
    descripcion: "La entrevista es tu momento para brillar. Con buena preparación, la confianza llega sola.",
    pasos: [
      "Investiga la empresa antes de ir (qué hace, cuánto tiempo tiene)",
      "Practica las preguntas típicas: 'Cuéntame de ti', 'Fortalezas', 'Por qué aquí'",
      "Lleva una copia impresa de tu CV",
      "Viste de manera profesional pero cómoda",
      "Llega 10 minutos antes",
      "Habla con seguridad, aunque no tengas experiencia",
      "Al terminar, agradece y pregunta cuándo se comunicarán",
    ],
  },
  {
    id: 4,
    emoji: "🏛️",
    titulo: "Programa Mi Primera Chamba",
    categoria: "Gobierno",
    color: "#EFF6FF",
    accent: "#2563EB",
    descripcion: "El Estado peruano tiene un programa especial para jóvenes sin experiencia. Conoce cómo acceder a subsidios laborales.",
    pasos: [
      "Aplica si tienes entre 18 y 29 años",
      "El empleador recibe un subsidio del 50% de tu sueldo",
      "Las empresas marcadas con 'Mi Primera Chamba' en Chambita participan",
      "Acércate al MTPE más cercano en Arequipa para más info",
      "El programa cubre prácticas y primer empleo formal",
    ],
  },
  {
    id: 5,
    emoji: "💡",
    titulo: "Habilidades más buscadas en Arequipa",
    categoria: "Mercado",
    color: "#FFF1F2",
    accent: "#E83E8C",
    descripcion: "Estas son las habilidades que más valoran las empresas arequipeñas para contratar jóvenes.",
    pasos: [
      "Excel (básico a intermedio) — requerido en el 70% de ofertas",
      "Comunicación oral y escrita clara",
      "Puntualidad y responsabilidad",
      "Trabajo en equipo",
      "Atención al cliente básica",
      "Redes sociales y herramientas digitales",
      "Idioma inglés básico (diferenciador)",
    ],
  },
];

export default function ConsejosScreen({ goTo }: Props) {
  const [activo, setActivo] = useState<typeof GUIAS[0] | null>(null);

  if (activo) {
    return (
      <div className="flex-1 flex flex-col bg-white overflow-hidden">
        <div className="px-5 pt-14 pb-5 border-b border-[#E8E4F0]">
          <button onClick={() => setActivo(null)} className="flex items-center gap-1 text-gray-400 mb-4 text-sm">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Volver a consejos
          </button>
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: activo.color }}>
              {activo.emoji}
            </div>
            <div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: activo.accent, backgroundColor: activo.color }}>{activo.categoria}</span>
              <h1 className="font-bold text-[#1a0a2e] text-base mt-1 leading-tight">{activo.titulo}</h1>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <p className="text-sm text-gray-600 leading-relaxed mb-5">{activo.descripcion}</p>
          <h2 className="font-bold text-[#1a0a2e] text-sm mb-4">Pasos clave</h2>
          <div className="flex flex-col gap-3">
            {activo.pasos.map((paso, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: activo.accent }}>
                  {i + 1}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{paso}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-2xl" style={{ backgroundColor: activo.color }}>
            <p className="text-sm font-semibold" style={{ color: activo.accent }}>¿Listo para aplicar lo aprendido?</p>
            <button onClick={() => goTo("lista")} className="text-sm font-bold mt-2" style={{ color: activo.accent }}>
              Ver vacantes disponibles →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      <div className="bg-white px-5 pt-14 pb-5 border-b border-[#E8E4F0]">
        <h1 className="font-bold text-[#1a0a2e] text-xl">Consejos 💡</h1>
        <p className="text-gray-400 text-sm mt-1">Guías para tu primer empleo en Arequipa</p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {GUIAS.map((guia) => (
            <button
              key={guia.id}
              onClick={() => setActivo(guia)}
              className="bg-white rounded-2xl p-4 border border-[#E8E4F0] text-left hover:border-[#6C3FA0] active:scale-95 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0" style={{ backgroundColor: guia.color }}>
                  {guia.emoji}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1 inline-block" style={{ color: guia.accent, backgroundColor: guia.color }}>
                    {guia.categoria}
                  </span>
                  <p className="font-bold text-[#1a0a2e] text-sm leading-tight">{guia.titulo}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{guia.pasos.length} pasos</p>
                </div>
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" className="text-gray-300 flex-shrink-0"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
            </button>
          ))}
        </div>

        {/* UNSA Banner */}
        <div className="mt-4 bg-gradient-to-r from-[#0d1b3e] to-[#1e2f6b] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">🏛️</span>
            <p className="text-white font-bold text-sm">Bolsa laboral UNSA</p>
          </div>
          <p className="text-white/60 text-xs mb-3">Chambita trabaja con la UNSA para traerte vacantes exclusivas para estudiantes.</p>
          <div className="flex gap-2">
            <span className="text-[10px] bg-white/15 text-white px-3 py-1.5 rounded-full">Artes</span>
            <span className="text-[10px] bg-white/15 text-white px-3 py-1.5 rounded-full">Biomédicas</span>
            <span className="text-[10px] bg-white/15 text-white px-3 py-1.5 rounded-full">Ingenierías</span>
            <span className="text-[10px] bg-white/15 text-white px-3 py-1.5 rounded-full">Sociales</span>
          </div>
        </div>
      </div>

      <BottomNav goTo={goTo} active="consejos" />
    </div>
  );
}
