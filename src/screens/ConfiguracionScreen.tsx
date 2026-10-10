import { useState } from "react";
import { Screen } from "../App";
import PerfilPageLayout from "../components/PerfilPageLayout";

type Props = { goTo: (screen: Screen) => void };

function Toggle({ activo, onChange }: { activo: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`w-11 h-6 rounded-full p-0.5 transition-colors ${activo ? "bg-[#6C3FA0]" : "bg-gray-200"}`}>
      <span className={`block w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${activo ? "translate-x-5" : ""}`} />
    </button>
  );
}

export default function ConfiguracionScreen({ goTo }: Props) {
  const [notificaciones, setNotificaciones] = useState(true);
  const [correos, setCorreos] = useState(true);
  const [perfilVisible, setPerfilVisible] = useState(true);

  return (
    <PerfilPageLayout goTo={goTo} title="Configuración" subtitle="Personaliza tu experiencia en Chambita">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Preferencias</p>
      <div className="bg-white border border-[#E8E4F0] rounded-2xl overflow-hidden">
        {[
          { label: "Notificaciones de oportunidades", detalle: "Recibe nuevas vacantes compatibles", valor: notificaciones, cambiar: () => setNotificaciones(!notificaciones) },
          { label: "Novedades por correo", detalle: "Consejos y actividad de tu cuenta", valor: correos, cambiar: () => setCorreos(!correos) },
          { label: "Perfil visible para empresas", detalle: "Permite que empresas encuentren tu perfil", valor: perfilVisible, cambiar: () => setPerfilVisible(!perfilVisible) },
        ].map((opcion, index) => (
          <div key={opcion.label} className={`flex items-center gap-3 p-4 ${index < 2 ? "border-b border-[#E8E4F0]" : ""}`}>
            <div className="flex-1">
              <p className="text-sm font-semibold text-[#1a0a2e]">{opcion.label}</p>
              <p className="text-[10px] text-gray-400 mt-1">{opcion.detalle}</p>
            </div>
            <Toggle activo={opcion.valor} onChange={opcion.cambiar} />
          </div>
        ))}
      </div>

      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-6 mb-2 ml-1">Cuenta y seguridad</p>
      <div className="bg-white border border-[#E8E4F0] rounded-2xl overflow-hidden">
        {["Cambiar contraseña", "Términos y privacidad", "Centro de ayuda"].map((opcion, index) => (
          <button key={opcion} className={`w-full flex items-center justify-between p-4 text-left ${index < 2 ? "border-b border-[#E8E4F0]" : ""}`}>
            <span className="text-sm font-medium text-[#1a0a2e]">{opcion}</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" className="text-gray-300"><path d="m9 18 6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        ))}
      </div>

      <button className="w-full mt-6 border border-red-100 text-red-400 font-semibold py-3 rounded-2xl text-sm">Eliminar mi cuenta</button>
      <p className="text-center text-[10px] text-gray-300 mt-4">Chambita versión 1.0.0</p>
    </PerfilPageLayout>
  );
}
