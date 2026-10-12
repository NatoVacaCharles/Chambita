import { useState } from "react";
import SplashScreen from "./screens/SplashScreen";
import QuienEresScreen from "./screens/QuienEresScreen";
import RegistroScreen from "./screens/RegistroScreen";
import LoginScreen from "./screens/LoginScreen";
import CompletarPerfilScreen from "./screens/CompletarPerfilScreen";
import HomeScreen from "./screens/HomeScreen";
import FiltrosScreen from "./screens/FiltrosScreen";
import ListaScreen from "./screens/ListaScreen";
import DetalleOfertaScreen from "./screens/DetalleOfertaScreen";
import ConfirmacionScreen from "./screens/ConfirmacionScreen";
import MisPostulacionesScreen from "./screens/MisPostulacionesScreen";
import PerfilScreen from "./screens/PerfilScreen";
import MensajeriaScreen from "./screens/MensajeriaScreen";
import DetalleEmpresaScreen from "./screens/DetalleEmpresaScreen";
import ConsejosScreen from "./screens/ConsejosScreen";
import DatosPersonalesScreen from "./screens/DatosPersonalesScreen";
import FormacionAcademicaScreen from "./screens/FormacionAcademicaScreen";
import DocumentosScreen from "./screens/DocumentosScreen";
import ExperienciaHabilidadesScreen from "./screens/ExperienciaHabilidadesScreen";
import ConfiguracionScreen from "./screens/ConfiguracionScreen";
import HomeEmpresaScreen from "./screens/HomeEmpresaScreen";
import PostulacionesEmpresaScreen from "./screens/PostulacionesEmpresaScreen";
import NuevaConvocatoriaScreen from "./screens/NuevaConvocatoriaScreen";
import PostuladosScreen from "./screens/PostuladosScreen";
import DetalleCandidatoScreen from "./screens/DetalleCandidatoScreen";
import PerfilEmpresaScreen from "./screens/PerfilEmpresaScreen";
import RecuperarContrasenaScreen from "./screens/RecuperarContrasenaScreen";

export type Screen =
  | "splash"
  | "quien-eres"
  | "login"
  | "registro"
  | "completar-perfil"
  | "home"
  | "filtros"
  | "lista"
  | "detalle-oferta"
  | "confirmacion"
  | "mis-postulaciones"
  | "perfil"
  | "mensajeria"
  | "detalle-empresa"
  | "consejos"
  | "datos-personales"
  | "formacion-academica"
  | "documentos"
  | "experiencia-habilidades"
  | "configuracion"
  | "nueva-convocatoria"
  | "postulados"
  | "detalle-candidato"
  | "recuperar-contrasena";

export type TipoUsuario = "estudiante" | "empresa";

export type Convocatoria = {
  id: number;
  puesto: string;
  modalidad: string;
  disponibilidad: string;
  remuneracion: string;
  postulantes: number;
  estado: "Activa" | "Finalizada";
  fecha: string;
};

export type Candidato = {
  id: number;
  nombre: string;
  iniciales: string;
  carrera: string;
  institucion: string;
  ciclo: string;
  ubicacion: string;
  celular: string;
  correo: string;
  compatibilidad: number;
  experiencia: string;
  habilidades: string[];
  convocatoria: string;
};

export const CANDIDATOS: Candidato[] = [
  {
    id: 1,
    nombre: "Kely Tintaya",
    iniciales: "KT",
    carrera: "Contabilidad",
    institucion: "Universidad Nacional de San Agustín",
    ciclo: "7mo ciclo",
    ubicacion: "Arequipa",
    celular: "987 654 321",
    correo: "kely@ejemplo.com",
    compatibilidad: 94,
    experiencia: "Atención al cliente · Bodega San José · Ene–Dic 2023",
    habilidades: ["Excel", "Word", "Contabilidad", "Trabajo en equipo"],
    convocatoria: "Practicante de Contabilidad",
  },
  {
    id: 2,
    nombre: "Diego Vargas",
    iniciales: "DV",
    carrera: "Administración",
    institucion: "Instituto del Sur",
    ciclo: "6to ciclo",
    ubicacion: "Cayma, Arequipa",
    celular: "965 230 114",
    correo: "diego.vargas@ejemplo.com",
    compatibilidad: 87,
    experiencia: "Asistente de ventas · Comercial Sur · 6 meses",
    habilidades: ["Excel", "Ventas", "Comunicación"],
    convocatoria: "Asistente Administrativo",
  },
  {
    id: 3,
    nombre: "Valeria Núñez",
    iniciales: "VN",
    carrera: "Marketing",
    institucion: "Universidad Católica San Pablo",
    ciclo: "8vo ciclo",
    ubicacion: "Yanahuara, Arequipa",
    celular: "951 844 730",
    correo: "valeria.nunez@ejemplo.com",
    compatibilidad: 82,
    experiencia: "Community manager freelance · 1 año",
    habilidades: ["Redes sociales", "Canva", "Copywriting"],
    convocatoria: "Asistente de Marketing Digital",
  },
];

export type Oferta = {
  id: number;
  titulo: string;
  empresa: string;
  logoColor: string;
  logoLetra: string;
  ubicacion: string;
  modalidad: string;
  salario: string;
  tipo: string;
  tiempo: string;
  descripcion: string;
  requisitos: string[];
  beneficios: string[];
  carrera: string;
  sinExperiencia: boolean;
  miPrimeraChamba: boolean;
  compatibilidad: number;
};

export const OFERTAS: Oferta[] = [
  {
    id: 1,
    titulo: "Practicante de Contabilidad",
    empresa: "Studio Contable Paro",
    logoColor: "#F5A623",
    logoLetra: "SC",
    ubicacion: "Arequipa",
    modalidad: "Presencial",
    salario: "S/ 700 – 800",
    tipo: "Prácticas preprofesionales",
    tiempo: "Medio tiempo",
    descripcion: "Brindamos servicios de contabilidad para empresas en distintos sectores. Buscamos practicante proactivo para apoyar en registro de operaciones, declaraciones y reportes contables.",
    requisitos: ["Estudiante de Contabilidad en 6to ciclo o superior", "Conocimientos en Excel básico", "No se requiere experiencia previa"],
    beneficios: ["Capacitación constante", "Certificado de prácticas", "Posibilidad de línea de carrera"],
    carrera: "Contabilidad",
    sinExperiencia: true,
    miPrimeraChamba: true,
    compatibilidad: 94,
  },
  {
    id: 2,
    titulo: "Asistente de Atención al Cliente",
    empresa: "ServiPlus",
    logoColor: "#2DC8A8",
    logoLetra: "SP",
    ubicacion: "Cayma, Arequipa",
    modalidad: "Semipresencial",
    salario: "S/ 160 – 400",
    tipo: "Primer empleo",
    tiempo: "Tiempo completo",
    descripcion: "Empresa de servicios busca joven proactivo para atención al cliente en tienda física y soporte por redes sociales. Buen ambiente de trabajo y oportunidades de crecimiento.",
    requisitos: ["Secundaria completa o estudios técnicos", "Habilidades comunicativas", "Disponibilidad para fines de semana"],
    beneficios: ["Sueldo base + comisiones", "Horario flexible", "Buen ambiente laboral"],
    carrera: "Administración",
    sinExperiencia: true,
    miPrimeraChamba: false,
    compatibilidad: 78,
  },
  {
    id: 3,
    titulo: "Asistente Administrativo",
    empresa: "Grupo Solutions",
    logoColor: "#6C3FA0",
    logoLetra: "GS",
    ubicacion: "Arequipa Centro",
    modalidad: "Presencial",
    salario: "S/ 600 – 800",
    tipo: "Trabajo temporal",
    tiempo: "Tiempo completo",
    descripcion: "Empresa líder en gestión administrativa busca asistente para apoyar en gestión documentaria, atención de llamadas y coordinación de agenda ejecutiva.",
    requisitos: ["Estudiante de Administración o carreras afines", "Manejo básico de Office", "Buena comunicación oral y escrita"],
    beneficios: ["Pagos puntuales", "Horario de oficina (8am–5pm)", "Posibilidad de continuidad"],
    carrera: "Administración",
    sinExperiencia: true,
    miPrimeraChamba: true,
    compatibilidad: 85,
  },
  {
    id: 4,
    titulo: "Auxiliar Contable",
    empresa: "Contack2",
    logoColor: "#E83E8C",
    logoLetra: "C2",
    ubicacion: "Miraflores, Arequipa",
    modalidad: "Presencial",
    salario: "S/ 550 – 700",
    tipo: "Prácticas preprofesionales",
    tiempo: "Medio tiempo",
    descripcion: "Firma contable con 10 años en el mercado busca auxiliar para apoyar en registro de facturas, conciliaciones y reportes. Excelente oportunidad para ganar experiencia real.",
    requisitos: ["Estudiante de Contabilidad o Administración", "Excel intermedio", "Puntualidad y responsabilidad"],
    beneficios: ["Modalidad mixta (presencial y remota)", "Capacitación en software contable", "Excelente ambiente"],
    carrera: "Contabilidad",
    sinExperiencia: true,
    miPrimeraChamba: false,
    compatibilidad: 91,
  },
  {
    id: 5,
    titulo: "Asistente de Marketing Digital",
    empresa: "Impulsa Arequipa",
    logoColor: "#FF6B35",
    logoLetra: "IA",
    ubicacion: "Arequipa",
    modalidad: "Remoto",
    salario: "S/ 500 – 700",
    tipo: "Prácticas preprofesionales",
    tiempo: "Medio tiempo",
    descripcion: "Agencia digital en crecimiento busca estudiante creativo para gestionar redes sociales, crear contenido y apoyar en campañas digitales para clientes locales.",
    requisitos: ["Estudiante de Marketing, Comunicaciones o afines", "Conocimiento de redes sociales", "Creatividad y proactividad"],
    beneficios: ["100% remoto", "Horario flexible", "Portafolio real con clientes"],
    carrera: "Marketing",
    sinExperiencia: true,
    miPrimeraChamba: false,
    compatibilidad: 72,
  },
  {
    id: 6,
    titulo: "Practicante de Sistemas",
    empresa: "TechMine Perú",
    logoColor: "#0EA5E9",
    logoLetra: "TM",
    ubicacion: "Arequipa",
    modalidad: "Semipresencial",
    salario: "S/ 800 – 1,000",
    tipo: "Prácticas preprofesionales",
    tiempo: "Tiempo completo",
    descripcion: "Empresa del sector minero busca practicante de sistemas para soporte técnico, gestión de infraestructura y desarrollo de mejoras en sistemas internos.",
    requisitos: ["Estudiante de Ingeniería de Sistemas o afines desde 7mo ciclo", "Conocimiento en redes y bases de datos", "Disponibilidad inmediata"],
    beneficios: ["Movilidad cubierta", "Almuerzo incluido", "Subvención económica competitiva"],
    carrera: "Ingeniería",
    sinExperiencia: false,
    miPrimeraChamba: true,
    compatibilidad: 68,
  },
];

const CONVOCATORIAS_INICIALES: Convocatoria[] = [
  {
    id: 1,
    puesto: "Practicante de Contabilidad",
    modalidad: "Presencial",
    disponibilidad: "Medio tiempo",
    remuneracion: "S/ 700 – 800",
    postulantes: 18,
    estado: "Activa",
    fecha: "Publicada hace 2 días",
  },
  {
    id: 2,
    puesto: "Asistente Administrativo",
    modalidad: "Semipresencial",
    disponibilidad: "Tiempo completo",
    remuneracion: "S/ 1,100",
    postulantes: 12,
    estado: "Activa",
    fecha: "Publicada hace 5 días",
  },
  {
    id: 3,
    puesto: "Asistente de Marketing Digital",
    modalidad: "Remoto",
    disponibilidad: "Medio tiempo",
    remuneracion: "S/ 650",
    postulantes: 9,
    estado: "Finalizada",
    fecha: "Finalizada el 8 may",
  },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [tipoUsuario, setTipoUsuario] = useState<TipoUsuario>("estudiante");
  const [ofertaActiva, setOfertaActiva] = useState<Oferta>(OFERTAS[0]);
  const [postuladas, setPostuladas] = useState<Set<number>>(new Set());
  const [convocatorias, setConvocatorias] = useState<Convocatoria[]>(
    CONVOCATORIAS_INICIALES,
  );
  const [candidatoActivo, setCandidatoActivo] = useState<Candidato>(
    CANDIDATOS[0],
  );

  const goTo = (s: Screen) => setScreen(s);

  const postular = (id: number) => {
    setPostuladas((prev) => new Set(prev).add(id));
    goTo("confirmacion");
  };

  const props = {
    goTo,
    tipoUsuario,
    setTipoUsuario,
    ofertaActiva,
    setOfertaActiva,
    postuladas,
    postular,
    convocatorias,
    setConvocatorias,
    candidatoActivo,
    setCandidatoActivo,
  };

  return (
    <div className="flex items-center justify-center min-h-full bg-[#0d1b3e] p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-white rounded-[44px] overflow-hidden shadow-2xl shadow-blue-900/60 relative flex flex-col">
        {screen === "splash" && <SplashScreen {...props} />}
        {screen === "quien-eres" && <QuienEresScreen {...props} />}
        {screen === "login" && <LoginScreen {...props} />}
        {screen === "registro" && <RegistroScreen {...props} />}
        {screen === "completar-perfil" && <CompletarPerfilScreen {...props} />}
        {screen === "home" &&
          (tipoUsuario === "empresa" ? (
            <HomeEmpresaScreen {...props} />
          ) : (
            <HomeScreen {...props} />
          ))}
        {screen === "filtros" && <FiltrosScreen {...props} />}
        {screen === "lista" && <ListaScreen {...props} />}
        {screen === "detalle-oferta" && <DetalleOfertaScreen {...props} />}
        {screen === "confirmacion" && <ConfirmacionScreen {...props} />}
        {screen === "mis-postulaciones" &&
          (tipoUsuario === "empresa" ? (
            <PostulacionesEmpresaScreen {...props} />
          ) : (
            <MisPostulacionesScreen {...props} />
          ))}
        {screen === "perfil" &&
          (tipoUsuario === "empresa" ? (
            <PerfilEmpresaScreen {...props} />
          ) : (
            <PerfilScreen {...props} />
          ))}
        {screen === "mensajeria" && <MensajeriaScreen {...props} />}
        {screen === "detalle-empresa" && <DetalleEmpresaScreen {...props} />}
        {screen === "consejos" && <ConsejosScreen {...props} />}
        {screen === "datos-personales" && <DatosPersonalesScreen {...props} />}
        {screen === "formacion-academica" && <FormacionAcademicaScreen {...props} />}
        {screen === "documentos" && <DocumentosScreen {...props} />}
        {screen === "experiencia-habilidades" && <ExperienciaHabilidadesScreen {...props} />}
        {screen === "configuracion" && <ConfiguracionScreen {...props} />}
        {screen === "nueva-convocatoria" && <NuevaConvocatoriaScreen {...props} />}
        {screen === "postulados" && <PostuladosScreen {...props} />}
        {screen === "detalle-candidato" && <DetalleCandidatoScreen {...props} />}
        {screen == "recuperar-contrasena" && <RecuperarContrasenaScreen {...props} />}
      </div>
    </div>
  );
}
