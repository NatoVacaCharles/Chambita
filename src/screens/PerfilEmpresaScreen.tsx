import { useRef, useState } from "react";
import { Screen, TipoUsuario } from "../App";
import BottomNav from "../components/BottomNav";

type Props = {
  goTo: (screen: Screen) => void;
  tipoUsuario: TipoUsuario;
};

type Hito = {
  anio: string;
  titulo: string;
  descripcion: string;
};

const Icon = ({
  name,
  className = "w-5 h-5",
}: {
  name: "building" | "target" | "eye" | "route" | "heart" | "camera" | "plus" | "trash" | "check" | "edit" | "globe" | "logout";
  className?: string;
}) => {
  const paths = {
    building: <><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M8 7h4M8 11h4M8 15h4M9 21v-2h2v2M2 21h20" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><path d="m15 9 5-5M17 4h3v3" /></>,
    eye: <><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><circle cx="12" cy="12" r="2.5" /></>,
    route: <><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h3a3 3 0 0 0 3-3V8a3 3 0 0 1 3-3" /></>,
    heart: <path d="M20.8 5.7a5.5 5.5 0 0 0-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z" />,
    camera: <><path d="M14.5 5 13 3h-2L9.5 5H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4.5Z" /><circle cx="12" cy="12.5" r="3.5" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    edit: <><path d="m14 5 5 5M4 20l3.5-.7L19 7.8a2.1 2.1 0 0 0-3-3L4.7 16.4 4 20Z" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9S14.5 18.5 12 21M12 3c-2.5 2.5-3.8 5.5-3.8 9s1.3 6.5 3.8 9" /></>,
    logout: <><path d="M10 17l5-5-5-5M15 12H3M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" /></>,
  };

  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </g>
    </svg>
  );
};

const SectionTitle = ({
  icon,
  title,
  subtitle,
}: {
  icon: Parameters<typeof Icon>[0]["name"];
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-center gap-3 mb-4">
    <span className="w-10 h-10 rounded-xl bg-viola-mist text-viola flex items-center justify-center shrink-0">
      <Icon name={icon} />
    </span>
    <div>
      <p className="font-bold text-slate-900 text-sm">{title}</p>
      <p className="text-gray-400 text-[10px]">{subtitle}</p>
    </div>
  </div>
);

export default function PerfilEmpresaScreen({ goTo, tipoUsuario }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [editando, setEditando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [logo, setLogo] = useState<string>();
  const [datos, setDatos] = useState({
    nombre: "Studio Contable Paro",
    rubro: "Contabilidad y finanzas",
    ruc: "20604578219",
    sede: "Arequipa, Perú",
    web: "www.studioparo.pe",
    celular: "954 321 876",
    descripcion: "Acompañamos a emprendedores y MYPES a crecer con una gestión contable clara, cercana y confiable.",
    mision: "Simplificar la gestión contable de nuestros clientes con asesoría personalizada y soluciones que impulsen su crecimiento.",
    vision: "Ser la firma contable referente del sur del Perú por nuestra cercanía, innovación y compromiso con cada negocio.",
  });
  const [hitos, setHitos] = useState<Hito[]>([
    { anio: "2014", titulo: "Nace Studio Paro", descripcion: "Iniciamos atendiendo a pequeños negocios de Arequipa." },
    { anio: "2019", titulo: "100 empresas acompañadas", descripcion: "Ampliamos nuestros servicios tributarios y laborales." },
    { anio: "2024", titulo: "Transformación digital", descripcion: "Creamos un equipo joven enfocado en soluciones contables digitales." },
  ]);
  const [nuevoHito, setNuevoHito] = useState<Hito>({ anio: "", titulo: "", descripcion: "" });

  const actualizar = (key: keyof typeof datos, value: string) => {
    setGuardado(false);
    setDatos((actuales) => ({ ...actuales, [key]: value }));
  };

  const guardar = () => {
    setEditando(false);
    setGuardado(true);
    window.setTimeout(() => setGuardado(false), 2500);
  };

  const agregarHito = () => {
    if (!nuevoHito.anio.trim() || !nuevoHito.titulo.trim()) return;
    setHitos((actuales) => [...actuales, nuevoHito]);
    setNuevoHito({ anio: "", titulo: "", descripcion: "" });
    setGuardado(false);
  };

  const cargarLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = event.target.files?.[0];
    if (!archivo) return;
    setLogo(URL.createObjectURL(archivo));
    setGuardado(false);
  };

  const inputClass = "w-full border border-line rounded-xl px-3.5 py-3 text-sm text-slate-900 outline-none focus:border-viola bg-white";

  return (
    <div className="flex-1 flex flex-col bg-surface overflow-hidden">
      <div className="bg-gradient-to-br from-viola-dark via-viola to-viola-light px-5 pt-12 pb-8">
        <div className="flex justify-between items-center mb-5">
          <div>
            <p className="text-white/60 text-[10px] uppercase tracking-widest font-semibold">Perfil empresarial</p>
            <p className="text-white font-bold text-lg mt-1">Tu marca empleadora</p>
          </div>
          <button
            onClick={editando ? guardar : () => setEditando(true)}
            className="h-9 px-3.5 rounded-xl bg-white/15 border border-white/20 text-white text-xs font-semibold flex items-center gap-2"
          >
            <Icon name={editando ? "check" : "edit"} className="w-4 h-4" />
            {editando ? "Guardar" : "Editar"}
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center overflow-hidden shadow-lg">
              {logo ? (
                <img src={logo} alt="Logo de la empresa" className="w-full h-full object-cover" />
              ) : (
                <span className="text-viola font-bold text-2xl">SC</span>
              )}
            </div>
            <input ref={fileInput} onChange={cargarLogo} type="file" accept="image/*" className="hidden" />
            <button
              onClick={() => fileInput.current?.click()}
              aria-label="Cambiar logo"
              className="absolute -right-2 -bottom-2 w-8 h-8 rounded-xl bg-teal text-white border-2 border-viola flex items-center justify-center shadow"
            >
              <Icon name="camera" className="w-4 h-4" />
            </button>
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-base truncate">{datos.nombre}</p>
            <p className="text-white/65 text-xs mt-0.5">{datos.rubro}</p>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="bg-teal/20 text-teal-light text-[9px] font-semibold px-2 py-1 rounded-full flex items-center gap-1">
                <Icon name="check" className="w-3 h-3" /> Empresa verificada
              </span>
              <span className="bg-white/10 text-white/70 text-[9px] px-2 py-1 rounded-full">{datos.sede}</span>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex justify-between text-[10px] mb-2">
            <span className="text-white/65">Perfil completado</span>
            <span className="text-white font-bold">85%</span>
          </div>
          <div className="h-1.5 bg-white/15 rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-teal rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {guardado && (
          <div className="bg-teal-light border border-teal/20 text-teal text-xs font-semibold rounded-xl px-4 py-3 flex items-center gap-2">
            <Icon name="check" className="w-4 h-4" /> Perfil actualizado correctamente
          </div>
        )}

        <div className="bg-white border border-line rounded-2xl p-4">
          <SectionTitle icon="building" title="Información de la empresa" subtitle="Los datos que verán tus postulantes" />
          {editando ? (
            <div className="grid grid-cols-2 gap-3">
              {([
                ["nombre", "Nombre comercial"],
                ["rubro", "Rubro"],
                ["ruc", "RUC"],
                ["sede", "Sede principal"],
                ["web", "Sitio web"],
                ["celular", "Celular"],
              ] as [keyof typeof datos, string][]).map(([key, label]) => (
                <label key={key} className={key === "nombre" || key === "rubro" ? "col-span-2" : ""}>
                  <span className="text-[10px] font-medium text-gray-500 block mb-1.5">{label}</span>
                  <input value={datos[key]} onChange={(event) => actualizar(key, event.target.value)} className={inputClass} />
                </label>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-3">
              {[
                ["Rubro", datos.rubro],
                ["RUC", datos.ruc],
                ["Sede principal", datos.sede],
                ["Contacto", datos.celular],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[9px] uppercase tracking-wide text-gray-400">{label}</p>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{value}</p>
                </div>
              ))}
              <div className="col-span-2 flex items-center gap-1.5 text-viola text-xs font-semibold pt-1">
                <Icon name="globe" className="w-4 h-4" /> {datos.web}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white border border-line rounded-2xl p-4">
          <SectionTitle icon="heart" title="Quiénes somos" subtitle="Cuenta qué hace especial a tu empresa" />
          {editando ? (
            <textarea value={datos.descripcion} onChange={(event) => actualizar("descripcion", event.target.value)} rows={4} className={`${inputClass} resize-none leading-relaxed`} />
          ) : (
            <p className="text-xs text-gray-600 leading-relaxed">{datos.descripcion}</p>
          )}
        </div>

        <div className="bg-white border border-line rounded-2xl p-4 space-y-5">
          <div>
            <SectionTitle icon="target" title="Misión" subtitle="El propósito que mueve a tu equipo" />
            {editando ? (
              <textarea value={datos.mision} onChange={(event) => actualizar("mision", event.target.value)} rows={4} className={`${inputClass} resize-none leading-relaxed`} />
            ) : (
              <p className="text-xs text-gray-600 leading-relaxed">{datos.mision}</p>
            )}
          </div>
          <div className="border-t border-line pt-5">
            <SectionTitle icon="eye" title="Visión" subtitle="Hacia dónde se dirige la empresa" />
            {editando ? (
              <textarea value={datos.vision} onChange={(event) => actualizar("vision", event.target.value)} rows={4} className={`${inputClass} resize-none leading-relaxed`} />
            ) : (
              <p className="text-xs text-gray-600 leading-relaxed">{datos.vision}</p>
            )}
          </div>
        </div>

        <div className="bg-white border border-line rounded-2xl p-4">
          <SectionTitle icon="route" title="Nuestra trayectoria" subtitle="Hitos que respaldan tu experiencia" />
          <div className="space-y-0">
            {hitos.map((hito, index) => (
              <div key={`${hito.anio}-${index}`} className="flex gap-3 relative pb-5 last:pb-1">
                {index < hitos.length - 1 && <div className="absolute left-[17px] top-8 bottom-0 w-px bg-line" />}
                <span className="w-9 h-9 rounded-xl bg-viola-mist text-viola text-[9px] font-bold flex items-center justify-center shrink-0 relative z-10">{hito.anio}</span>
                <div className="flex-1 pt-0.5 min-w-0">
                  <p className="text-xs font-bold text-slate-900">{hito.titulo}</p>
                  <p className="text-[10px] text-gray-500 leading-relaxed mt-1">{hito.descripcion}</p>
                </div>
                {editando && (
                  <button onClick={() => setHitos((actuales) => actuales.filter((_, itemIndex) => itemIndex !== index))} className="text-gray-300 hover:text-red-400 self-start p-1" aria-label={`Eliminar hito ${hito.titulo}`}>
                    <Icon name="trash" className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
          {editando && (
            <div className="mt-3 pt-4 border-t border-line">
              <p className="text-xs font-bold text-slate-800 mb-3">Añadir un hito</p>
              <div className="grid grid-cols-[5rem_1fr] gap-2">
                <input placeholder="Año" value={nuevoHito.anio} onChange={(event) => setNuevoHito({ ...nuevoHito, anio: event.target.value })} className={inputClass} />
                <input placeholder="Título del hito" value={nuevoHito.titulo} onChange={(event) => setNuevoHito({ ...nuevoHito, titulo: event.target.value })} className={inputClass} />
                <textarea placeholder="Breve descripción" value={nuevoHito.descripcion} onChange={(event) => setNuevoHito({ ...nuevoHito, descripcion: event.target.value })} rows={2} className={`${inputClass} col-span-2 resize-none`} />
              </div>
              <button onClick={agregarHito} className="w-full mt-3 border border-viola text-viola rounded-xl py-2.5 text-xs font-semibold flex justify-center items-center gap-2">
                <Icon name="plus" className="w-4 h-4" /> Agregar a la trayectoria
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border border-line rounded-2xl p-4">
          <SectionTitle icon="heart" title="Cultura y beneficios" subtitle="Lo que tu equipo ofrece a nuevos talentos" />
          <div className="flex flex-wrap gap-2">
            {["Aprendizaje continuo", "Horarios flexibles", "Buen clima laboral", "Línea de carrera", "Mentoría"].map((beneficio) => (
              <span key={beneficio} className="bg-teal-light text-teal text-[10px] font-semibold px-3 py-1.5 rounded-full">{beneficio}</span>
            ))}
          </div>
        </div>

        <button className="w-full bg-viola-mist text-viola font-semibold py-3 rounded-2xl text-xs flex items-center justify-center gap-2">
          <Icon name="eye" className="w-4 h-4" /> Ver perfil público
        </button>
        <button onClick={() => goTo("splash")} className="w-full border border-red-100 text-red-400 font-semibold py-3 rounded-2xl text-xs flex items-center justify-center gap-2">
          <Icon name="logout" className="w-4 h-4" /> Cerrar sesión
        </button>
      </div>

      <BottomNav goTo={goTo} active="perfil" tipoUsuario={tipoUsuario} />
    </div>
  );
}