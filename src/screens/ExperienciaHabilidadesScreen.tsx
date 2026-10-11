import { useState, useEffect } from "react";
import { Screen } from "../App";
import PerfilPageLayout from "../components/PerfilPageLayout";
import { supabase } from "../services/supabaseClient";

type Props = { goTo: (screen: Screen) => void };

type Experiencia = {
  id?: string;
  company_name: string;
  job_title: string;
  start_date: string;
  end_date: string;
};

type Skill = {
  id: string;
  name: string;
};

export default function ExperienciaHabilidadesScreen({ goTo }: Props) {
  const [userId, setUserId] = useState<string | null>(null);
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [misHabilidades, setMisHabilidades] = useState<Skill[]>([]);
  const [catalogoSkills, setCatalogoSkills] = useState<Skill[]>([]);

  const [nuevaExp, setNuevaExp] = useState<Experiencia>({
    company_name: "",
    job_title: "",
    start_date: "",
    end_date: "",
  });

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mostrarModalSkills, setMostrarModalSkills] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [guardandoExp, setGuardandoExp] = useState(false);
  const [guardandoSkill, setGuardandoSkill] = useState(false);

  // 1. Cargar información de Supabase
  useEffect(() => {
    async function cargarInformacion() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          setUserId(user.id);

          // Cargar Experiencias
          const { data: expData } = await supabase
            .from("work_experiences")
            .select("id, company_name, job_title, start_date, end_date")
            .eq("candidate_id", user.id)
            .order("created_at", { ascending: false });

          if (expData) {
            setExperiencias(
              expData.map((item) => ({
                ...item,
                end_date: item.end_date || "Presente",
              }))
            );
          }

          // Cargar Habilidades asociadas
          const { data: cSkillsData } = await supabase
            .from("candidate_skills")
            .select("skill_id, skills(id, name)")
            .eq("candidate_id", user.id);

          if (cSkillsData) {
            const formateadas = cSkillsData
              .map((item: any) => item.skills)
              .filter(Boolean);
            setMisHabilidades(formateadas);
          }
        }

        // Cargar Catálogo General de Habilidades
        const { data: skillsCatalog } = await supabase
          .from("skills")
          .select("id, name")
          .order("name");

        if (skillsCatalog) setCatalogoSkills(skillsCatalog);

      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setCargando(false);
      }
    }

    cargarInformacion();
  }, []);

  // Guardar Experiencia Laboral
  const guardarExperiencia = async () => {
    if (!nuevaExp.company_name.trim() || !nuevaExp.job_title.trim() || !userId) return;

    setGuardandoExp(true);
    try {
      const payload = {
        candidate_id: userId,
        company_name: nuevaExp.company_name.trim(),
        job_title: nuevaExp.job_title.trim(),
        start_date: nuevaExp.start_date.trim() || new Date().toISOString().split("T")[0],
        end_date: nuevaExp.end_date.trim() || null,
      };

      const { data, error } = await supabase
        .from("work_experiences")
        .insert([payload])
        .select()
        .single();

      if (!error && data) {
        setExperiencias([
          { ...data, end_date: data.end_date || "Presente" },
          ...experiencias,
        ]);
        setNuevaExp({ company_name: "", job_title: "", start_date: "", end_date: "" });
        setMostrarFormulario(false);
      }
    } catch (err) {
      console.error("Error al guardar experiencia:", err);
    } finally {
      setGuardandoExp(false);
    }
  };

  // Vincular Habilidad (candidate_skills)
  const seleccionarHabilidad = async (skill: Skill) => {
    if (!userId || guardandoSkill) return;

    // Si ya existe no hacemos nada
    if (misHabilidades.some((s) => s.id === skill.id)) {
      setMostrarModalSkills(false);
      return;
    }

    setGuardandoSkill(true);
    try {
      const { error } = await supabase
        .from("candidate_skills")
        .insert([{ candidate_id: userId, skill_id: skill.id }]);

      if (!error) {
        setMisHabilidades([...misHabilidades, skill]);
        setMostrarModalSkills(false);
      }
    } catch (err) {
      console.error("Error al agregar habilidad:", err);
    } finally {
      setGuardandoSkill(false);
    }
  };

  // Desvincular Habilidad
  const eliminarHabilidad = async (skillId: string) => {
    if (!userId) return;
    try {
      const { error } = await supabase
        .from("candidate_skills")
        .delete()
        .eq("candidate_id", userId)
        .eq("skill_id", skillId);

      if (!error) {
        setMisHabilidades(misHabilidades.filter((s) => s.id !== skillId));
      }
    } catch (err) {
      console.error("Error al desvincular habilidad:", err);
    }
  };

  if (cargando) {
    return (
      <PerfilPageLayout goTo={goTo} title="Experiencia y habilidades" subtitle="Muestra lo que sabes hacer y dónde lo aprendiste">
        <div className="bg-white border border-[#E8E4F0] rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-[#6C3FA0]">Cargando información...</p>
        </div>
      </PerfilPageLayout>
    );
  }

  return (
    <PerfilPageLayout goTo={goTo} title="Experiencia y habilidades" subtitle="Muestra lo que sabes hacer y dónde lo aprendiste">
      
      {/* SECCIÓN EXPERIENCIA */}
      <p className="font-bold text-sm text-[#1a0a2e] mb-3">Experiencia laboral</p>

      {experiencias.length === 0 && !mostrarFormulario ? (
        <div className="bg-white border border-dashed border-[#E8E4F0] rounded-2xl p-6 text-center mb-3">
          <p className="text-xs text-gray-400">Aún no has agregado ninguna experiencia laboral.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {experiencias.map((item) => (
            <div key={item.id || item.company_name} className="bg-white border border-[#E8E4F0] rounded-2xl p-4 flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E6FAF6] text-[#239b83] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8 7V4h8v3M3 12h18" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#1a0a2e]">{item.job_title}</p>
                  <p className="text-xs text-gray-500">{item.company_name}</p>
                  <p className="text-[10px] text-gray-400 mt-2">{item.start_date} — {item.end_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {mostrarFormulario ? (
        <div className="bg-white border border-[#6C3FA0]/30 rounded-2xl p-4 mt-3">
          <div className="mb-3">
            <label className="text-xs text-gray-500 mb-1 block">Empresa</label>
            <input
              value={nuevaExp.company_name}
              onChange={(e) => setNuevaExp({ ...nuevaExp, company_name: e.target.value })}
              placeholder="Ej. Bodega San José"
              className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0]"
            />
          </div>
          <div className="mb-3">
            <label className="text-xs text-gray-500 mb-1 block">Puesto desempeñado</label>
            <input
              value={nuevaExp.job_title}
              onChange={(e) => setNuevaExp({ ...nuevaExp, job_title: e.target.value })}
              placeholder="Ej. Asistente Administrativo"
              className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0]"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Fecha de inicio</label>
              <input
                value={nuevaExp.start_date}
                onChange={(e) => setNuevaExp({ ...nuevaExp, start_date: e.target.value })}
                placeholder="AAAA-MM-DD"
                className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0]"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Fecha fin</label>
              <input
                value={nuevaExp.end_date}
                onChange={(e) => setNuevaExp({ ...nuevaExp, end_date: e.target.value })}
                placeholder="Presente"
                className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0]"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setMostrarFormulario(false)} className="flex-1 border border-[#E8E4F0] rounded-xl py-2.5 text-xs font-semibold text-gray-500">Cancelar</button>
            <button onClick={guardarExperiencia} disabled={guardandoExp} className="flex-1 bg-[#6C3FA0] rounded-xl py-2.5 text-xs font-semibold text-white disabled:opacity-50">
              {guardandoExp ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setMostrarFormulario(true)} className="w-full mt-3 border-2 border-dashed border-[#9B6FD0]/50 text-[#6C3FA0] font-semibold py-3 rounded-2xl text-sm hover:bg-[#F3EEFF]/50 transition-colors">
          + Añadir experiencia
        </button>
      )}

      {/* SECCIÓN HABILIDADES CON BOTÓN & SELECCIÓN LIMPIA */}
      <p className="font-bold text-sm text-[#1a0a2e] mt-7 mb-3">Habilidades</p>
      <div className="bg-white border border-[#E8E4F0] rounded-2xl p-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {misHabilidades.length === 0 ? (
            <p className="text-xs text-gray-400">Selecciona tus habilidades del catálogo.</p>
          ) : (
            misHabilidades.map((item) => (
              <button key={item.id} onClick={() => eliminarHabilidad(item.id)} className="bg-[#F3EEFF] text-[#6C3FA0] rounded-full px-3 py-1.5 text-xs font-semibold hover:bg-red-50 hover:text-red-500 transition-colors">
                {item.name} <span className="ml-1 text-[#9B6FD0]">×</span>
              </button>
            ))
          )}
        </div>

        <button
          onClick={() => setMostrarModalSkills(true)}
          className="w-full bg-[#2DC8A8] text-white font-semibold rounded-xl py-2.5 text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all"
        >
          <span>+</span> Añadir habilidad del catálogo
        </button>
      </div>

      {/* MODAL / LISTA DE SELECCIÓN DE HABILIDADES */}
      {mostrarModalSkills && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl p-5 shadow-xl max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <p className="font-bold text-[#1a0a2e] text-sm">Selecciona una habilidad</p>
              <button onClick={() => setMostrarModalSkills(false)} className="text-gray-400 hover:text-gray-600 font-bold p-1">
                ✕
              </button>
            </div>

            <div className="overflow-y-auto flex-1 flex flex-col gap-2 pr-1">
              {catalogoSkills.map((skill) => {
                const yaLaTiene = misHabilidades.some((s) => s.id === skill.id);
                return (
                  <button
                    key={skill.id}
                    onClick={() => seleccionarHabilidad(skill)}
                    disabled={yaLaTiene || guardandoSkill}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-semibold transition-all flex justify-between items-center ${
                      yaLaTiene
                        ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white border-[#E8E4F0] text-[#1a0a2e] hover:border-[#6C3FA0] hover:bg-[#F3EEFF]/40"
                    }`}
                  >
                    <span>{skill.name}</span>
                    {yaLaTiene && <span className="text-[10px] text-emerald-600">✓ Agregada</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </PerfilPageLayout>
  );
}