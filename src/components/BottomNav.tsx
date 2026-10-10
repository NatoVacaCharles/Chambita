import { Screen, TipoUsuario } from "../App";

type Props = {
  goTo: (s: Screen) => void;
  active: string;
  tipoUsuario?: TipoUsuario;
};

const items = [
  { label: "Inicio", screen: "home" as Screen, icon: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 12L12 4l9 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M5 10v9a1 1 0 001 1h4v-5h4v5h4a1 1 0 001-1v-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )},
  { label: "Buscar", screen: "lista" as Screen, icon: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  )},
  { label: "Postulaciones", screen: "mis-postulaciones" as Screen, icon: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  )},
  { label: "Consejos", screen: "consejos" as Screen, icon: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 2a7 7 0 015.74 11.02L17 15H7l-.74-1.98A7 7 0 0112 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M9 15v1a3 3 0 006 0v-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  )},
  { label: "Perfil", screen: "perfil" as Screen, icon: (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
  )},
];

export default function BottomNav({ goTo, active, tipoUsuario = "estudiante" }: Props) {
  const visibleItems =
    tipoUsuario === "empresa"
      ? items.filter((item) => !["Buscar", "Consejos"].includes(item.label))
      : items;

  return (
    <div className="border-t border-[#E8E4F0] bg-white flex">
      {visibleItems.map((item) => {
        const isActive = active === item.screen;
        return (
          <button
            key={item.label}
            onClick={() => goTo(item.screen)}
            className="flex-1 flex flex-col items-center gap-0.5 py-2.5 relative"
          >
            <span className={isActive ? "text-[#6C3FA0]" : "text-gray-400"}>{item.icon}</span>
            <span className={`text-[9px] font-semibold ${isActive ? "text-[#6C3FA0]" : "text-gray-400"}`}>{item.label}</span>
            {isActive && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#6C3FA0] rounded-full" />}
          </button>
        );
      })}
    </div>
  );
}
