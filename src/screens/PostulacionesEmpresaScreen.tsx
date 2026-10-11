import { useState, useEffect } from "react";
import { Convocatoria, Screen, TipoUsuario } from "../App";
import BottomNav from "../components/BottomNav";
import { supabase } from "../services/supabaseClient";

type Props = {
  goTo: (screen: Screen) => void;
  convocatorias?: Convocatoria[];
  tipoUsuario: TipoUsuario;
};

type ConvocatoriaReal = {
  id: string;
  puesto: string;
  ubicacion: string;
  estado: "Activa" | "Finalizada";
  postulantes: number;
};

const TABS = ["Todas", "Activas", "Finalizadas"];

export default function PostulacionesEmpresaScreen({
  goTo,
  tipoUsuario,
}: Props) {
  const [tab, setTab] = useState("Todas");
  const [jobs, setJobs] = useState<ConvocatoriaReal[]>([]);
  const [cargando, setCargando] = useState(true);

  // Cargar ofertas laborales publicadas por la empresa
  useEffect(() => {
    async function cargarConvocatorias() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Obtener ID de la empresa en public.companies
          const { data: companyData } = await supabase
            .from("companies")
            .select("id")
            .eq("profile_id", user.id)
            .maybeSingle();

          if (companyData?.id) {
            // Consultar empleos de la empresa
            const { data: jobsData } = await supabase
              .from("jobs")
              .select("id, title, location, status")
              .eq("company_id", companyData.id)
              .order("created_at", { ascending: false });

            if (jobsData && jobsData.length > 0) {
              const jobIds = jobsData.map((j) => j.id);

              // Consultar conteo de postulaciones en public.applications
              const { data: appsData } = await supabase
                .from("applications")
                .select("job_id")
                .in("job_id", jobIds);

              const jobsFormateados: ConvocatoriaReal[] = jobsData.map((j) => {
                const count = appsData
                  ? appsData.filter((a) => a.job_id === j.id).length
                  : 0;

                return {
                  id: j.id,
                  puesto: j.title,
                  ubicacion: j.location,
                  estado: j.status === "activa" ? "Activa" : "Finalizada",
                  postulantes: count,
                };
              });

              setJobs(jobsFormateados);
            }
          }
        }
      } catch (err) {
        console.error("Error al cargar convocatorias:", err);
      } finally {
        setCargando(false);
      }
    }

    cargarConvocatorias();
  }, []);

  const visibles = jobs.filter((item) => {
    if (tab === "Activas") return item.estado === "Activa";
    if (tab === "Finalizadas") return item.estado === "Finalizada";
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      {/* Encabezado */}
      <div className="bg-white px-5 pt-14 pb-4 border-b border-[#E8E4F0]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-bold text-[#1a0a2e] text-xl">
              Convocatorias
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              {cargando ? "Cargando..." : `${jobs.length} oportunidades publicadas`}
            </p>
          </div>
          <button
            onClick={() => goTo("nueva-convocatoria")}
            className="bg-[#6C3FA0] text-white text-xs font-semibold px-3.5 py-2.5 rounded-xl active:scale-95 transition-all"
          >
            + Nueva
          </button>
        </div>

        {/* Pestañas de Filtro */}
        <div className="flex gap-1">
          {TABS.map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab === item
                  ? "bg-[#6C3FA0] text-white"
                  : "bg-[#F7F7FB] text-gray-500 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de Convocatorias */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {cargando ? (
          <div className="bg-white border border-[#E8E4F0] rounded-2xl p-6 text-center">
            <p className="text-xs text-gray-400">Cargando convocatorias...</p>
          </div>
        ) : visibles.length === 0 ? (
          <div className="bg-white border border-dashed border-[#E8E4F0] rounded-2xl p-8 text-center mt-2">
            <p className="text-xs text-gray-400 mb-3">
              No hay convocatorias disponibles en esta sección.
            </p>
            <button
              onClick={() => goTo("nueva-convocatoria")}
              className="bg-[#6C3FA0] text-white text-xs font-semibold px-4 py-2.5 rounded-xl"
            >
              Crear nueva convocatoria
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {visibles.map((convocatoria) => (
              <div
                key={convocatoria.id}
                className="bg-white border border-[#E8E4F0] rounded-2xl p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-[#1a0a2e]">
                      {convocatoria.puesto}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {convocatoria.ubicacion}
                    </p>
                  </div>
                  <span
                    className={`text-[9px] font-bold px-2.5 py-1 rounded-full ${
                      convocatoria.estado === "Activa"
                        ? "bg-[#E6FAF6] text-[#239b83]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {convocatoria.estado}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F7F7FB]">
                  <div>
                    <p className="text-[#6C3FA0] text-sm font-bold">
                      {convocatoria.postulantes}
                    </p>
                    <p className="text-[9px] text-gray-400">
                      Postulante{convocatoria.postulantes === 1 ? "" : "s"}
                    </p>
                  </div>
                  <button
                    onClick={() => goTo("postulados")}
                    className="border border-[#6C3FA0] text-[#6C3FA0] text-xs font-semibold px-3.5 py-2 rounded-xl hover:bg-[#F3EEFF] active:scale-95 transition-all"
                  >
                    Ver postulantes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav
        goTo={goTo}
        active="mis-postulaciones"
        tipoUsuario={tipoUsuario}
      />
    </div>
  );
}