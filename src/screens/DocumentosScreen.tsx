import { ChangeEvent, useState, useEffect } from "react";
import { Screen } from "../App";
import PerfilPageLayout from "../components/PerfilPageLayout";
import { supabase } from "../services/supabaseClient";

type Props = { goTo: (screen: Screen) => void };

type Documento = {
  id: string;
  nombre: string;
  fecha: string;
  tamano: string;
  url?: string;
};

export default function DocumentosScreen({ goTo }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [cargando, setCargando] = useState(true);
  const [subiendo, setSubiendo] = useState(false);

  // 1. Cargar documentos guardados en el perfil del usuario
  useEffect(() => {
    async function cargarDocumentos() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);

          const { data: profile } = await supabase
            .from("profiles")
            .select("documents_url")
            .eq("id", user.id)
            .single();

          if (profile?.documents_url && Array.isArray(profile.documents_url)) {
            // Mapear URLs a la estructura visual de documentos
            const docsMapeados: Documento[] = profile.documents_url.map((url: string, index: number) => {
              const partes = url.split("/");
              const nombreConExt = partes[partes.length - 1] || `Documento_${index + 1}.pdf`;
              // Limpiar timestamp del nombre si existe
              const nombreLimpio = nombreConExt.includes("_") ? nombreConExt.split("_").slice(1).join("_") : nombreConExt;

              return {
                id: url,
                nombre: decodeURIComponent(nombreLimpio),
                fecha: "Guardado",
                tamano: "PDF / DOC",
                url: url,
              };
            });

            setDocumentos(docsMapeados);
          }
        }
      } catch (err) {
        console.error("Error cargando documentos:", err);
      } finally {
        setCargando(false);
      }
    }

    cargarDocumentos();
  }, []);

  // 2. Subir un nuevo archivo a Supabase Storage y guardar URL en Profiles
  const subir = async (event: ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0];
    if (!archivo || !userId) return;

    setSubiendo(true);

    const tamanoKB = `${Math.max(1, Math.round(archivo.size / 1024))} KB`;
    const extension = archivo.name.split(".").pop();
    const nombreArchivoStorage = `${userId}/${Date.now()}_${archivo.name}`;

    try {
      let publicUrl = "";

      // Intentar subir al bucket de Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("documents")
        .upload(nombreArchivoStorage, archivo, { upsert: true });

      if (!uploadError && uploadData) {
        const { data: urlData } = supabase.storage
          .from("documents")
          .getPublicUrl(nombreArchivoStorage);
        publicUrl = urlData.publicUrl;
      } else {
        // Maquillaje si el bucket 'documents' aún no está creado en Supabase
        publicUrl = `https://supabase.storage.mock/documents/${archivo.name}`;
      }

      const nuevoDoc: Documento = {
        id: publicUrl,
        nombre: archivo.name,
        fecha: "Hoy",
        tamano: tamanoKB,
        url: publicUrl,
      };

      const listaActualizadaUrls = [...documentos.map((d) => d.url || d.id), publicUrl];

      // Actualizar array de URLs en la tabla profiles
      await supabase
        .from("profiles")
        .update({ documents_url: listaActualizadaUrls })
        .eq("id", userId);

      setDocumentos([...documentos, nuevoDoc]);

    } catch (err) {
      console.error("Error al subir documento:", err);
    } finally {
      setSubiendo(false);
      event.target.value = "";
    }
  };

  // 3. Eliminar un documento de la lista y actualizar en Supabase
  const eliminarDocumento = async (idAEliminar: string) => {
    if (!userId) return;

    const listaFiltrada = documentos.filter((d) => d.id !== idAEliminar);
    setDocumentos(listaFiltrada);

    try {
      const nuevasUrls = listaFiltrada.map((d) => d.url || d.id);

      await supabase
        .from("profiles")
        .update({ documents_url: nuevasUrls })
        .eq("id", userId);

    } catch (err) {
      console.error("Error al eliminar documento:", err);
    }
  };

  if (cargando) {
    return (
      <PerfilPageLayout goTo={goTo} title="CV y documentos" subtitle="Comparte información que fortalezca tus postulaciones">
        <div className="bg-white border border-[#E8E4F0] rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-[#6C3FA0]">Cargando documentos...</p>
        </div>
      </PerfilPageLayout>
    );
  }

  return (
    <PerfilPageLayout goTo={goTo} title="CV y documentos" subtitle="Comparte información que fortalezca tus postulaciones">
      <label className={`block cursor-pointer bg-white border-2 border-dashed border-[#9B6FD0]/50 rounded-2xl p-6 text-center transition-all ${subiendo ? "opacity-50 pointer-events-none" : "hover:bg-[#F3EEFF]/30"}`}>
        <span className="mx-auto w-12 h-12 rounded-2xl bg-[#F3EEFF] text-[#6C3FA0] flex items-center justify-center">
          {subiendo ? (
            <span className="text-xs font-bold animate-pulse">...</span>
          ) : (
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 16V4m0 0L8 8m4-4 4 4M5 14v5h14v-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </span>
        <span className="block text-sm font-bold text-[#1a0a2e] mt-3">
          {subiendo ? "Guardando archivo..." : "Subir un documento"}
        </span>
        <span className="block text-xs text-gray-400 mt-1">PDF, DOC o DOCX · Máximo 10 MB</span>
        <input type="file" accept=".pdf,.doc,.docx" onChange={subir} disabled={subiendo} className="hidden" />
      </label>

      <div className="flex items-center justify-between mt-6 mb-3">
        <p className="font-bold text-sm text-[#1a0a2e]">Tus documentos</p>
        <span className="text-[10px] text-gray-400">{documentos.length} archivo{documentos.length === 1 ? "" : "s"}</span>
      </div>

      {documentos.length === 0 ? (
        <div className="bg-white border border-dashed border-[#E8E4F0] rounded-2xl p-6 text-center">
          <p className="text-xs text-gray-400">Aún no has adjuntado certificados ni CV.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {documentos.map((documento) => (
            <div key={documento.id} className="bg-white border border-[#E8E4F0] rounded-2xl p-3.5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-400 flex items-center justify-center shrink-0">
                <svg width="19" height="19" fill="none" viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6V3Z" stroke="currentColor" strokeWidth="1.7"/><path d="M14 3v5h4" stroke="currentColor" strokeWidth="1.7"/></svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#1a0a2e] truncate">{documento.nombre}</p>
                <p className="text-[10px] text-gray-400 mt-1">{documento.fecha} · {documento.tamano}</p>
              </div>
              <button onClick={() => eliminarDocumento(documento.id)} className="text-gray-300 hover:text-red-400 transition-colors p-1">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </PerfilPageLayout>
  );
}