import { useState, useEffect } from "react";
import { Screen } from "../App";
import PerfilPageLayout from "../components/PerfilPageLayout";
import { supabase } from "../services/supabaseClient";

type Props = { goTo: (screen: Screen) => void };

type Formacion = {
  id?: string;
  institution_name: string;
  degree_name: string;
  start_date: string;
  end_date: string;
  grade_level: string;
};

type CatalogItem = {
  id: string;
  name: string;
};

export default function FormacionAcademicaScreen({ goTo }: Props) {
  const [formaciones, setFormaciones] = useState<Formacion[]>([]);
  const [instituciones, setInstituciones] = useState<CatalogItem[]>([]);
  const [carreras, setCarreras] = useState<CatalogItem[]>([]);

  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const [nueva, setNueva] = useState<Formacion>({
    institution_name: "",
    degree_name: "",
    start_date: "",
    end_date: "Presente",
    grade_level: "Pregrado",
  });

  // 1. Cargar formación del usuario y catálogos de Arequipa
  useEffect(() => {
    async function cargarDatos() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
          // Obtener formación del usuario
          const { data: eduData, error: eduError } = await supabase
            .from("user_education")
            .select("*")
            .eq("profile_id", user.id)
            .order("created_at", { ascending: false });

          if (!eduError && eduData) {
            setFormaciones(eduData);
          }
        }

        // Cargar Catálogo de Instituciones
        const { data: instData } = await supabase
          .from("educational_institutions")
          .select("id, name")
          .order("name");
        if (instData) setInstituciones(instData);

        // Cargar Catálogo de Carreras
        const { data: carData } = await supabase
          .from("careers")
          .select("id, name")
          .order("name");
        if (carData) setCarreras(carData);

      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setCargando(false);
      }
    }

    cargarDatos();
  }, []);

  // 2. Guardar o Actualizar registro en Supabase
  const guardar = async () => {
    if (!nueva.institution_name || !nueva.degree_name) return;

    setGuardando(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      if (editandoId) {
        // Actualizar existente
        const { error } = await supabase
          .from("user_education")
          .update({
            institution_name: nueva.institution_name,
            degree_name: nueva.degree_name,
            start_date: nueva.start_date,
            end_date: nueva.end_date || "Presente",
            grade_level: nueva.grade_level,
          })
          .eq("id", editandoId);

        if (!error) {
          setFormaciones((prev) =>
            prev.map((item) =>
              item.id === editandoId ? { ...nueva, id: editandoId } : item
            )
          );
        }
      } else {
        // Insertar nuevo registro
        const { data, error } = await supabase
          .from("user_education")
          .insert([
            {
              profile_id: user.id,
              institution_name: nueva.institution_name,
              degree_name: nueva.degree_name,
              start_date: nueva.start_date,
              end_date: nueva.end_date || "Presente",
              grade_level: nueva.grade_level,
            },
          ])
          .select()
          .single();

        if (!error && data) {
          setFormaciones([data, ...formaciones]);
        }
      }

      // Limpiar formulario
      setNueva({
        institution_name: "",
        degree_name: "",
        start_date: "",
        end_date: "Presente",
        grade_level: "Pregrado",
      });
      setEditandoId(null);
      setMostrarFormulario(false);
    } catch (err) {
      console.error("Error al guardar:", err);
    } finally {
      setGuardando(false);
    }
  };

  // 3. Eliminar registro
  const eliminar = async (id?: string) => {
    if (!id) return;
    try {
      const { error } = await supabase
        .from("user_education")
        .delete()
        .eq("id", id);

      if (!error) {
        setFormaciones(formaciones.filter((item) => item.id !== id));
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
    }
  };

  // Preparar para editar
  const prepararEdicion = (item: Formacion) => {
    setNueva(item);
    setEditandoId(item.id || null);
    setMostrarFormulario(true);
  };

  if (cargando) {
    return (
      <PerfilPageLayout goTo={goTo} title="Formación académica" subtitle="Añade los estudios que respaldan tu perfil">
        <div className="bg-white border border-[#E8E4F0] rounded-2xl p-6 text-center">
          <p className="text-sm font-semibold text-[#6C3FA0]">Cargando formación académica...</p>
        </div>
      </PerfilPageLayout>
    );
  }

  return (
    <PerfilPageLayout goTo={goTo} title="Formación académica" subtitle="Añade los estudios que respaldan tu perfil">
      
      {/* Lista de Formaciones */}
      {formaciones.length === 0 && !mostrarFormulario ? (
        <div className="bg-white border border-dashed border-[#E8E4F0] rounded-2xl p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-[#F3EEFF] text-[#6C3FA0] flex items-center justify-center mx-auto mb-3">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path d="m3 9 9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M6 11v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="1.8"/>
            </svg>
          </div>
          <p className="text-sm font-semibold text-[#1a0a2e]">Sin formación registrada</p>
          <p className="text-xs text-gray-400 mt-1 mb-4">Añade tu universidad o instituto para mejorar la visibilidad de tu perfil.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {formaciones.map((item) => (
            <div key={item.id || item.institution_name} className="bg-white border border-[#E8E4F0] rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#F3EEFF] text-[#6C3FA0] flex items-center justify-center shrink-0">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                    <path d="m3 9 9-5 9 5-9 5-9-5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
                    <path d="M6 11v5c3 3 9 3 12 0v-5" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-[#1a0a2e] text-sm">{item.degree_name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{item.institution_name}</p>
                  <p className="text-xs text-gray-400 mt-2">{item.start_date} — {item.end_date}</p>
                  <span className="inline-block mt-2 rounded-full bg-[#E6FAF6] text-[#239b83] text-[10px] font-semibold px-2.5 py-1">
                    {item.grade_level}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => prepararEdicion(item)} className="text-gray-400 hover:text-[#6C3FA0] p-1">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5Z" stroke="currentColor" strokeWidth="1.7"/>
                    </svg>
                  </button>
                  <button onClick={() => eliminar(item.id)} className="text-gray-400 hover:text-red-500 p-1">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formulario de Agregar / Editar */}
      {mostrarFormulario ? (
        <div className="bg-white border border-[#6C3FA0]/30 rounded-2xl p-4 mt-4 shadow-sm">
          <p className="font-bold text-sm text-[#1a0a2e] mb-4">
            {editandoId ? "Editar formación" : "Nueva formación"}
          </p>
          <div className="flex flex-col gap-3">
            
            {/* Selector de Institución */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Institución Educativa</label>
              <select
                value={nueva.institution_name}
                onChange={(e) => setNueva({ ...nueva, institution_name: e.target.value })}
                className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0] bg-white text-[#1a0a2e]"
              >
                <option value="">Selecciona una institución...</option>
                {instituciones.map((inst) => (
                  <option key={inst.id} value={inst.name}>{inst.name}</option>
                ))}
              </select>
            </div>

            {/* Selector de Carrera */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Carrera / Programa</label>
              <select
                value={nueva.degree_name}
                onChange={(e) => setNueva({ ...nueva, degree_name: e.target.value })}
                className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0] bg-white text-[#1a0a2e]"
              >
                <option value="">Selecciona una carrera...</option>
                {carreras.map((car) => (
                  <option key={car.id} value={car.name}>{car.name}</option>
                ))}
              </select>
            </div>

            {/* Grado Académico */}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Grado o Nivel</label>
              <input
                type="text"
                value={nueva.grade_level}
                onChange={(e) => setNueva({ ...nueva, grade_level: e.target.value })}
                placeholder="Ej. Pregrado · 7mo ciclo / Egresado"
                className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0]"
              />
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Fecha Inicio</label>
                <input
                  type="text"
                  value={nueva.start_date}
                  onChange={(e) => setNueva({ ...nueva, start_date: e.target.value })}
                  placeholder="Ej. Mar 2022"
                  className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0]"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Fecha Fin</label>
                <input
                  type="text"
                  value={nueva.end_date}
                  onChange={(e) => setNueva({ ...nueva, end_date: e.target.value })}
                  placeholder="Presente"
                  className="w-full border border-[#E8E4F0] rounded-xl px-3.5 py-2.5 text-sm outline-none focus:border-[#6C3FA0]"
                />
              </div>
            </div>

          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => {
                setMostrarFormulario(false);
                setEditandoId(null);
              }}
              className="flex-1 border border-[#E8E4F0] rounded-xl py-2.5 text-xs font-semibold text-gray-500"
            >
              Cancelar
            </button>
            <button
              onClick={guardar}
              disabled={guardando}
              className="flex-1 bg-[#6C3FA0] rounded-xl py-2.5 text-xs font-semibold text-white disabled:opacity-50"
            >
              {guardando ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setEditandoId(null);
            setNueva({
              institution_name: "",
              degree_name: "",
              start_date: "",
              end_date: "Presente",
              grade_level: "Pregrado",
            });
            setMostrarFormulario(true);
          }}
          className="w-full mt-4 border-2 border-dashed border-[#9B6FD0]/50 text-[#6C3FA0] font-semibold py-3.5 rounded-2xl text-sm hover:bg-[#F3EEFF]/50 transition-colors"
        >
          + Añadir formación
        </button>
      )}
    </PerfilPageLayout>
  );
}