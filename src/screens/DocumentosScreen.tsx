import { ChangeEvent, useState } from "react";
import { Screen } from "../App";
import PerfilPageLayout from "../components/PerfilPageLayout";

type Props = { goTo: (screen: Screen) => void };
type Documento = { nombre: string; fecha: string; tamano: string };

export default function DocumentosScreen({ goTo }: Props) {
  const [documentos, setDocumentos] = useState<Documento[]>([
    { nombre: "Certificado Excel básico.pdf", fecha: "12 jun 2024", tamano: "620 KB" },
  ]);

  const subir = (event: ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0];
    if (!archivo) return;
    setDocumentos([
      ...documentos,
      {
        nombre: archivo.name,
        fecha: "Hoy",
        tamano: `${Math.max(1, Math.round(archivo.size / 1024))} KB`,
      },
    ]);
    event.target.value = "";
  };

  return (
    <PerfilPageLayout goTo={goTo} title="CV y documentos" subtitle="Comparte información que fortalezca tus postulaciones">
      <label className="block cursor-pointer bg-white border-2 border-dashed border-[#9B6FD0]/50 rounded-2xl p-6 text-center">
        <span className="mx-auto w-12 h-12 rounded-2xl bg-[#F3EEFF] text-[#6C3FA0] flex items-center justify-center">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 16V4m0 0L8 8m4-4 4 4M5 14v5h14v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <span className="block text-sm font-bold text-[#1a0a2e] mt-3">Subir un documento</span>
        <span className="block text-xs text-gray-400 mt-1">PDF, DOC o DOCX · Máximo 10 MB</span>
        <input type="file" accept=".pdf,.doc,.docx" onChange={subir} className="hidden" />
      </label>

      <div className="flex items-center justify-between mt-6 mb-3">
        <p className="font-bold text-sm text-[#1a0a2e]">Tus documentos</p>
        <span className="text-[10px] text-gray-400">{documentos.length} archivo{documentos.length === 1 ? "" : "s"}</span>
      </div>
      <div className="flex flex-col gap-2.5">
        {documentos.map((documento, index) => (
          <div key={`${documento.nombre}-${index}`} className="bg-white border border-[#E8E4F0] rounded-2xl p-3.5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center shrink-0">
              <svg width="19" height="19" fill="none" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6V3Z" stroke="currentColor" strokeWidth="1.7"/><path d="M14 3v5h4" stroke="currentColor" strokeWidth="1.7"/></svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#1a0a2e] truncate">{documento.nombre}</p>
              <p className="text-[10px] text-gray-400 mt-1">{documento.fecha} · {documento.tamano}</p>
            </div>
            <button onClick={() => setDocumentos(documentos.filter((_, i) => i !== index))} className="text-gray-300 hover:text-red-400">
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
            </button>
          </div>
        ))}
      </div>
    </PerfilPageLayout>
  );
}
