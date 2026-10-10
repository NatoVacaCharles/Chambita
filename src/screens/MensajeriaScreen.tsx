import { useState } from "react";
import { Screen } from "../App";
import BottomNav from "../components/BottomNav";

type Props = { goTo: (s: Screen) => void };

const CHATS = [
  { id: 1, nombre: "Studio Contable Paro", logo: "S", logoColor: "#F5A623", mensaje: "Gracias por postularte, revisaremos tu perfil...", tiempo: "15:30 a.m.", tipo: "Todos", unread: 2 },
  { id: 2, nombre: "ServiPlus", logo: "SP", logoColor: "#2DC8A8", mensaje: "Ponte en contacto si tienes preguntas...", tiempo: "1 día", tipo: "Empresa", unread: 0 },
  { id: 3, nombre: "Grupo Phantoms", logo: "GP", logoColor: "#6C3FA0", mensaje: "Te invitamos a conocernos más...", tiempo: "2 días", tipo: "Empresa", unread: 0 },
  { id: 4, nombre: "Chambita", logo: "C", logoColor: "#1a0a2e", mensaje: "Fija tu perfil para obtener más oportunidades!", tiempo: "3 días", tipo: "App", unread: 0 },
];

const TABS_MSG = ["Todos", "Empresas", "Empresa"];

export default function MensajeriaScreen({ goTo }: Props) {
  const [tab, setTab] = useState("Todos");
  const [chatActivo, setChatActivo] = useState<null | typeof CHATS[0]>(null);
  const [mensaje, setMensaje] = useState("");

  if (chatActivo) {
    return (
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex items-center gap-3 px-5 pt-14 pb-4 border-b border-[#E8E4F0]">
          <button onClick={() => setChatActivo(null)} className="text-gray-400">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: chatActivo.logoColor }}>
            {chatActivo.logo}
          </div>
          <div>
            <p className="font-bold text-[#1a0a2e] text-sm">{chatActivo.nombre}</p>
            <p className="text-xs text-[#2DC8A8]">En línea</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          <div className="flex gap-2">
            <div className="w-8 h-8 rounded-xl flex-shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: chatActivo.logoColor }}>{chatActivo.logo}</div>
            <div className="bg-[#F7F7FB] rounded-2xl rounded-tl-none px-4 py-3 max-w-[75%]">
              <p className="text-sm text-[#1a0a2e]">{chatActivo.mensaje}</p>
              <p className="text-[10px] text-gray-400 mt-1">{chatActivo.tiempo}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-[#6C3FA0] rounded-2xl rounded-tr-none px-4 py-3 max-w-[75%]">
              <p className="text-sm text-white">Hola, muchas gracias por la oportunidad. Estoy muy interesada.</p>
              <p className="text-[10px] text-white/60 mt-1">Ahora</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 border-t border-[#E8E4F0] flex items-center gap-2">
          <input
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribe un mensaje…"
            className="flex-1 bg-[#F7F7FB] rounded-2xl px-4 py-2.5 text-sm outline-none"
          />
          <button className="w-10 h-10 bg-[#6C3FA0] rounded-2xl flex items-center justify-center">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      <div className="bg-white px-5 pt-14 pb-4 border-b border-[#E8E4F0]">
        <h1 className="font-bold text-[#1a0a2e] text-xl mb-4">Mensajes</h1>
        <div className="flex gap-1">
          {TABS_MSG.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${tab === t ? "bg-[#6C3FA0] text-white" : "text-gray-500"}`}>{t}</button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-[#E8E4F0] bg-white">
        {CHATS.map((chat) => (
          <button key={chat.id} onClick={() => setChatActivo(chat)} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-[#F7F7FB] transition-colors text-left">
            <div className="relative">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: chat.logoColor }}>{chat.logo}</div>
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#6C3FA0] rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">{chat.unread}</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-[#1a0a2e] text-sm">{chat.nombre}</p>
                <p className="text-[10px] text-gray-400">{chat.tiempo}</p>
              </div>
              <p className="text-xs text-gray-400 truncate mt-0.5">{chat.mensaje}</p>
            </div>
          </button>
        ))}
      </div>
      <BottomNav goTo={goTo} active="mensajeria" />
    </div>
  );
}
