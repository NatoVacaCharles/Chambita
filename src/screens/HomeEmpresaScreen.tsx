import { useState, useEffect } from "react";
import { Convocatoria, Screen, TipoUsuario } from "../App";
import BottomNav from "../components/BottomNav";
import { supabase } from "../services/supabaseClient";

type Props = {
  goTo: (screen: Screen) => void;
  convocatorias?: Convocatoria[];
  tipoUsuario: TipoUsuario;
};

type EmpresaData = {
  nombre: string;
  iniciales: string;
};

type JobItem = {
  id: string;
  title: string;
  location: string;
  status: string;
  postulantesCount: number;
  created_at: string;
};

export default function HomeEmpresaScreen({ goTo, tipoUsuario }: Props) {
  const [empresa, setEmpresa] = useState<EmpresaData>({
    nombre: "Cargando empresa...",
    iniciales: "...",
  });
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarDatosEmpresa() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // 1. Obtener perfil o datos de la empresa desde public.companies / public.profiles
          const { data: companyData } = await supabase
            .from("companies")
            .select("id, company_name")
            .eq("profile_id", user.id)
            .maybeSingle();

          let nombreEmpresa = companyData?.company_name;

          if (!nombreEmpresa) {
            const { data: profileData } = await supabase
              .from("profiles")
              .select("full_name")
              .eq("id", user.id)
              .maybeSingle();

            nombreEmpresa = profileData?.full_name || "Mi Empresa";
          }

          const palabras = nombreEmpresa.split(" ");
          const iniciales = palabras.length >= 2 
            ? `${palabras[0][0]}${palabras[1][0]}`.toUpperCase() 
            : nombreEmpresa.substring(0, 2).toUpperCase();

          setEmpresa({ nombre: nombreEmpresa, iniciales });

          // 2. Obtener empleos de esta empresa en public.jobs
          if (companyData?.id) {
            const { data: jobsData } = await supabase
              .from("jobs")
              .select("id, title, location, status, created_at")
              .eq("company_id", companyData.id)
              .order("created_at", { ascending: false });

            if (jobsData && jobsData.length > 0) {
              // Obtener conteo de postulaciones por empleo en public.applications
              const jobIds = jobsData.map((j) => j.id);
              const { data: applicationsData } = await supabase
                .from("applications")
                .select("job_id")
                .in("job_id", jobIds);

              // Formatear la lista de empleos con el conteo de candidatos
              const jobsConPostulantes: JobItem[] = jobsData.map((j) => {
                const count = applicationsData 
                  ? applicationsData.filter((a) => a.job_id === j.id).length 
                  : 0;

                return {
                  id: j.id,
                  title: j.title,
                  location: j.location,
                  status: j.status === "activa" ? "Activa" : "Finalizada",
                  postulantesCount: count,
                  created_at: new Date(j.created_at).toLocaleDateString("es-PE", {
                    day: "numeric",
                    month: "short",
                  }),
                };
              });

              setJobs(jobsConPostulantes);
            }
          }
        }
      } catch (err) {
        console.error("Error al cargar panel de empresa:", err);
      } finally {
        setCargando(false);
      }
    }

    cargarDatosEmpresa();
  }, []);

  const activasCount = jobs.filter((item) => item.status === "Activa").length;
  const totalPostulantes = jobs.reduce((sum, item) => sum + item.postulantesCount, 0);

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7FB] overflow-hidden">
      {/* Encabezado Principal */}
      <div className="bg-gradient-to-br from-[#0d1b3e] via-[#1e2f6b] to-[#3d1c6e] px-5 pt-14 pb-7">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/50 text-xs">Panel de empresa</p>
            <h1 className="text-white font-bold text-xl mt-0.5">
              {cargando ? "Cargando..." : empresa.nombre}
            </h1>
            <p className="text-white/50 text-xs mt-1">
              Gestiona tus convocatorias y candidatos
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {empresa.iniciales}
          </div>
        </div>

        {/* Métricas Rápidas */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <div className="bg-white/10 border border-white/10 rounded-2xl p-3.5">
            <p className="text-[#2DC8A8] text-xl font-bold">{activasCount}</p>
            <p className="text-white/60 text-[10px] mt-1">
              Convocatorias activas
            </p>
          </div>
          <div className="bg-white/10 border border-white/10 rounded-2xl p-3.5">
            <p className="text-[#2DC8A8] text-xl font-bold">
              {totalPostulantes}
            </p>
            <p className="text-white/60 text-[10px] mt-1">
              Postulantes recibidos
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Convocatorias */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-bold text-[#1a0a2e] text-base">
              Tus convocatorias
            </h2>
            <p className="text-[10px] text-gray-400">
              Revisa el avance de tus oportunidades
            </p>
          </div>
          <button
            onClick={() => goTo("nueva-convocatoria")}
            className="w-9 h-9 rounded-xl bg-[#2DC8A8] text-white text-xl font-medium shadow-sm active:scale-95 transition-all flex items-center justify-center"
            aria-label="Crear convocatoria"
          >
            +
          </button>
        </div>

        {cargando ? (
          <div className="bg-white border border-[#E8E4F0] rounded-2xl p-6 text-center">
            <p className="text-xs text-gray-400">Cargando convocatorias...</p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white border border-dashed border-[#E8E4F0] rounded-2xl p-6 text-center">
            <p className="text-xs text-gray-400 mb-3">
              Aún no has publicado ninguna oferta laboral.
            </p>
            <button
              onClick={() => goTo("nueva-convocatoria")}
              className="bg-[#6C3FA0] text-white text-xs font-semibold px-4 py-2 rounded-xl"
            >
              Publicar primera vacante
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {jobs.slice(0, 5).map((job) => (
              <button
                key={job.id}
                onClick={() => goTo("mis-postulaciones")}
                className="bg-white border border-[#E8E4F0] rounded-2xl p-4 text-left hover:border-[#6C3FA0] active:scale-98 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#1a0a2e]">
                      {job.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {job.location}
                    </p>
                  </div>
                  <span
                    className={`text-[9px] font-bold rounded-full px-2.5 py-1 ${
                      job.status === "Activa"
                        ? "bg-[#E6FAF6] text-[#239b83]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F7F7FB]">
                  <div className="flex items-center gap-2 text-[#6C3FA0]">
                    <svg width="17" height="17" fill="none" viewBox="0 0 24 24">
                      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />
                      <path d="M3 19c0-3 2.7-5.5 6-5.5s6 2.5 6 5.5M16 6.5a3 3 0 0 1 0 5.8M17 14c2.4.5 4 2.4 4 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    <span className="text-xs font-bold">
                      {job.postulantesCount} postulante{job.postulantesCount === 1 ? "" : "s"}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {job.created_at}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {jobs.length > 0 && (
          <button
            onClick={() => goTo("mis-postulaciones")}
            className="w-full mt-4 text-[#6C3FA0] text-xs font-semibold py-3"
          >
            Ver todas las convocatorias
          </button>
        )}
      </div>

      <BottomNav
        goTo={goTo}
        active="home"
        tipoUsuario={tipoUsuario}
      />
    </div>
  );
}