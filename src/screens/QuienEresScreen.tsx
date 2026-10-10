import { Screen, TipoUsuario } from "../App";

type Props = {
  goTo: (s: Screen) => void;
  setTipoUsuario: (tipo: TipoUsuario) => void;
};

export default function QuienEresScreen({ goTo, setTipoUsuario }: Props) {
  const comenzarRegistro = (tipo: TipoUsuario) => {
    setTipoUsuario(tipo);
    goTo("registro");
  };

  return (
    <div className="flex-1 flex flex-col bg-white px-6 pt-16 pb-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-[#1a0a2e]">¿Cómo quieres continuar en Chambita?</h1>
        <p className="text-gray-500 text-sm mt-2">Elige una opción</p>
      </div>

      <div className="flex flex-col gap-4 flex-1">
        {/* Estudiante */}
        <button
          onClick={() => comenzarRegistro("estudiante")}
          className="border-2 border-[#6C3FA0] rounded-2xl p-6 text-left hover:bg-[#F3EEFF] active:scale-95 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#F3EEFF] rounded-2xl flex items-center justify-center">
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <rect x="6" y="4" width="20" height="24" rx="3" fill="#6C3FA0" opacity="0.2"/>
                <path d="M16 4L6 10l10 6 10-6-10-6z" fill="#6C3FA0"/>
                <path d="M6 10v8l10 6 10-6v-8" stroke="#6C3FA0" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#1a0a2e] text-base">Soy estudiante</p>
              <p className="text-gray-500 text-sm">Buscar oportunidades</p>
            </div>
            <svg className="ml-auto text-[#6C3FA0]" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>

        {/* Empresa */}
        <button
          onClick={() => comenzarRegistro("empresa")}
          className="border-2 border-[#E8E4F0] rounded-2xl p-6 text-left hover:border-[#6C3FA0] active:scale-95 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#F7F7FB] rounded-2xl flex items-center justify-center">
              <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
                <rect x="4" y="8" width="24" height="20" rx="2" fill="#E8E4F0"/>
                <rect x="8" y="4" width="16" height="6" rx="1" fill="#6C3FA0" opacity="0.4"/>
                <rect x="12" y="14" width="8" height="8" rx="1" fill="#6C3FA0" opacity="0.6"/>
              </svg>
            </div>
            <div>
              <p className="font-bold text-[#1a0a2e] text-base">Soy empresa</p>
              <p className="text-gray-500 text-sm">Publicar opciones</p>
            </div>
            <svg className="ml-auto text-gray-400" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </button>
      </div>

      <p className="text-center text-sm text-gray-400 mt-6">
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={() => goTo("login")}
          className="text-[#6C3FA0] font-medium"
        >
          Iniciar sesión
        </button>
      </p>
    </div>
  );
}
