import { ReactNode } from "react";
import { Screen } from "../App";

type Props = {
  goTo: (screen: Screen) => void;
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function PerfilPageLayout({
  goTo,
  title,
  subtitle,
  children,
}: Props) {
  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      <div className="bg-gradient-to-br from-[#0d1b3e] to-[#3d1c6e] px-5 pt-14 pb-6">
        <button
          onClick={() => goTo("perfil")}
          className="flex items-center gap-1 text-white/70 mb-4"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="text-sm">Perfil</span>
        </button>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        <p className="text-white/60 text-xs mt-1">{subtitle}</p>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
    </div>
  );
}
