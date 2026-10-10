import { Candidato, Screen } from "../App";

type Props = {
  goTo: (screen: Screen) => void;
  candidatoActivo: Candidato;
};

export default function DetalleCandidatoScreen({
  goTo,
  candidatoActivo,
}: Props) {
  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      <div className="bg-gradient-to-br from-[#0d1b3e] to-[#3d1c6e] px-5 pt-14 pb-7">
        <button
          onClick={() => goTo("postulados")}
          className="text-white/70 flex items-center gap-1 mb-4"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span className="text-sm">Postulantes</span>
        </button>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[#2DC8A8] text-white flex items-center justify-center text-xl font-bold">
            {candidatoActivo.iniciales}
          </div>
          <div className="min-w-0">
            <h1 className="text-white font-bold text-xl">
              {candidatoActivo.nombre}
            </h1>
            <p className="text-white/60 text-xs mt-1">
              {candidatoActivo.carrera} · {candidatoActivo.ciclo}
            </p>
            <span className="inline-block mt-2 bg-white/15 text-[#65e3c9] rounded-full px-2.5 py-1 text-[10px] font-bold">
              {candidatoActivo.compatibilidad}% de compatibilidad
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <Section title="Información personal">
          <Info label="Correo" value={candidatoActivo.correo} />
          <Info label="Celular" value={candidatoActivo.celular} />
          <Info label="Ubicación" value={candidatoActivo.ubicacion} />
        </Section>

        <Section title="Formación académica">
          <p className="text-sm font-semibold text-[#1a0a2e]">
            {candidatoActivo.carrera}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {candidatoActivo.institucion}
          </p>
          <p className="text-[10px] text-gray-400 mt-2">
            Pregrado · {candidatoActivo.ciclo} · En curso
          </p>
        </Section>

        <Section title="Experiencia">
          <p className="text-xs text-gray-600 leading-relaxed">
            {candidatoActivo.experiencia}
          </p>
        </Section>

        <Section title="Habilidades">
          <div className="flex flex-wrap gap-2">
            {candidatoActivo.habilidades.map((item) => (
              <span
                key={item}
                className="bg-[#F3EEFF] text-[#6C3FA0] text-[10px] font-semibold rounded-full px-2.5 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        </Section>

        <Section title="CV y documentos">
          <button className="w-full flex items-center gap-3 bg-[#F7F7FB] rounded-xl p-3 text-left">
            <span className="w-9 h-9 rounded-lg bg-red-50 text-red-400 flex items-center justify-center">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6V3Z" stroke="currentColor" strokeWidth="1.7"/><path d="M14 3v5h4" stroke="currentColor" strokeWidth="1.7"/></svg>
            </span>
            <span className="flex-1">
              <span className="block text-xs font-semibold text-[#1a0a2e]">
                CV_{candidatoActivo.nombre.replaceAll(" ", "_")}.pdf
              </span>
              <span className="block text-[9px] text-gray-400 mt-0.5">
                Documento PDF
              </span>
            </span>
            <span className="text-[#6C3FA0] text-[10px] font-semibold">
              Ver
            </span>
          </button>
        </Section>
      </div>

      <div className="bg-white border-t border-[#E8E4F0] px-5 py-4 flex gap-3">
        <button className="flex-1 border border-[#E8E4F0] text-gray-500 rounded-xl py-3 text-xs font-semibold">
          Descartar
        </button>
        <button className="flex-1 bg-[#6C3FA0] text-white rounded-xl py-3 text-xs font-semibold">
          Contactar
        </button>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-[#E8E4F0] rounded-2xl p-4 mb-3">
      <h2 className="text-xs font-bold text-[#1a0a2e] mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 py-1.5">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-xs font-medium text-[#1a0a2e] text-right">
        {value}
      </span>
    </div>
  );
}
