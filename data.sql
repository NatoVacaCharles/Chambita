-- 1. TIPOS ENUM (Para mantener consistencia de datos)
CREATE TYPE user_role AS ENUM ('candidato', 'empresa', 'admin');
CREATE TYPE job_status AS ENUM ('activa', 'finalizada', 'borrador');
CREATE TYPE application_status AS ENUM ('postulado', 'en_revision', 'entrevista', 'aceptado', 'descartado');

-- ==========================================
-- 2. TABLA DE PERFILES / USUARIOS BASE
-- ==========================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  role user_role NOT NULL DEFAULT 'candidato',
  full_name TEXT NOT NULL,
  phone TEXT,
  cv_url TEXT, -- Enlace al PDF guardado en Supabase Storage
  documents_url TEXT[], -- Array de enlaces a otros documentos
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 3. TABLA DE EMPRESAS
-- ==========================================
CREATE TABLE public.companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  company_name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  location TEXT,
  logo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 4. TABLAS DE FORMACIÓN ACADÉMICA
-- ==========================================
CREATE TABLE public.educational_institutions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE public.careers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Tabla intermedia: Formación académica del candidato (1 candidato -> N estudios)
CREATE TABLE public.academic_backgrounds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  institution_id UUID REFERENCES public.educational_institutions(id) ON DELETE RESTRICT NOT NULL,
  career_id UUID REFERENCES public.careers(id) ON DELETE RESTRICT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL indica que sigue estudiando actualmente
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 5. TABLA DE EXPERIENCIA LABORAL
-- ==========================================
CREATE TABLE public.work_experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  candidate_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL indica empleo actual
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 6. TABLA DE HABILIDADES Y RELACIÓN
-- ==========================================
CREATE TABLE public.skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

-- Tabla intermedia (N candidatos <-> N habilidades)
CREATE TABLE public.candidate_skills (
  candidate_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (candidate_id, skill_id)
);

-- ==========================================
-- 7. TABLA DE CONVOCATORIAS / OFERTAS DE TRABAJO
-- ==========================================
CREATE TABLE public.jobs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  salary_min NUMERIC(10, 2),
  salary_max NUMERIC(10, 2),
  status job_status DEFAULT 'activa' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ==========================================
-- 8. TABLA DE POSTULACIONES
-- ==========================================
CREATE TABLE public.applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  job_id UUID REFERENCES public.jobs(id) ON DELETE CASCADE NOT NULL,
  candidate_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  status application_status DEFAULT 'postulado' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(job_id, candidate_id) -- Garantiza que un usuario no se postule dos veces a la misma vacante
);

-- ==========================================
-- 9. TRIGGER DE SINCRONIZACIÓN DE USUARIOS CON AUTH.USERS
-- ==========================================
-- Función que se ejecuta cada vez que alguien se registra con Supabase Auth
-- Reemplazar la función handle_new_user por una versión más robusta
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  assigned_role public.user_role;
BEGIN
  -- 1. Asignar el rol validando el valor recibido en los metadatos
  IF new.raw_user_meta_data->>'role' = 'empresa' THEN
    assigned_role := 'empresa'::public.user_role;
  ELSE
    assigned_role := 'candidato'::public.user_role;
  END IF;

  -- 2. Insertar en la tabla profiles
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Usuario sin nombre'),
    assigned_role
  );
  
  RETURN new;
EXCEPTION
  WHEN OTHERS THEN
    -- Muestra en los logs de Supabase el error exacto si vuelve a fallar
    RAISE LOG 'Error en handle_new_user: %', SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Disparador (Trigger) asociado a auth.users
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ==========================================
-- 1. INSTITUCIONES EDUCATIVAS EN AREQUIPA (10)
-- ==========================================
INSERT INTO public.educational_institutions (name) VALUES
  ('Universidad Nacional de San Agustín (UNSA)'),
  ('Universidad Católica de Santa María (UCSM)'),
  ('Universidad San Ignacio de Loyola (USIL) - Sede Arequipa'),
  ('Universidad Tecnológica del Perú (UTP) - Sede Arequipa'),
  ('Universidad Continental - Sede Arequipa'),
  ('Universidad La Salle Arequipa'),
  ('Instituto Tecsup - Sede Arequipa'),
  ('Instituto Cibertec - Sede Arequipa'),
  ('Instituto SENATI - Sede Arequipa'),
  ('Instituto del Sur (ISUR)')
ON CONFLICT (name) DO NOTHING;

-- ==========================================
-- 2. CARRERAS PROFESIONALES Y TÉCNICAS (20)
-- ==========================================
INSERT INTO public.careers (name) VALUES
  ('Ingeniería de Sistemas'),
  ('Ingeniería de Software'),
  ('Ingeniería Industrial'),
  ('Ingeniería de Minas'),
  ('Ingeniería Civil'),
  ('Ingeniería Mecánica / Electromecánica'),
  ('Ingeniería Electrónica y Telecomunicaciones'),
  ('Ingeniería Química'),
  ('Administración de Empresas'),
  ('Contabilidad y Finanzas'),
  ('Marketing y Negocios Digitales'),
  ('Derecho'),
  ('Psicología'),
  ('Medicina Humana'),
  ('Enfermería'),
  ('Diseño Gráfico y Publicitario'),
  ('Desarrollo de Sistemas de Información (Técnica)'),
  ('Mantenimiento de Maquinaria Pesada (Técnica)'),
  ('Gestión de Logística y Cadena de Suministro'),
  ('Gastronomía y Arte Culinario')
ON CONFLICT (name) DO NOTHING;

-- ==========================================
-- 3. HABILIDADES TÉCNICAS Y BLANDAS - SKILLS (30)
-- ==========================================
INSERT INTO public.skills (name) VALUES
  -- Habilidades Técnicas / Programación
  ('JavaScript / TypeScript'),
  ('React.js'),
  ('Node.js / Express'),
  ('Python'),
  ('SQL / PostgreSQL'),
  ('HTML5 & CSS3 / Tailwind CSS'),
  ('Git & GitHub'),
  ('Figma / UI & UX Design'),
  ('Desarrollo de APIs RESTful'),
  ('Docker & Containers'),
  
  -- Habilidades Profesionales y de Gestión
  ('Gestión de Proyectos (Scrum / Agile)'),
  ('Análisis de Datos & Power BI'),
  ('Excel Avanzado'),
  ('Contabilidad Financiera'),
  ('Marketing Digital & SEO'),
  ('Ventas B2B & Negociación'),
  ('Gestión de Almacenes e Inventarios'),
  ('Mantenimiento Preventivo e Industrial'),
  ('Seguridad y Salud Ocupacional (SOMA)'),
  ('Redacción Técnica y Legal'),

  -- Habilidades Blandas (Soft Skills)
  ('Trabajo en Equipo'),
  ('Comunicación Asertiva'),
  ('Resolución de Problemas'),
  ('Pensamiento Crítico'),
  ('Liderazgo de Equipos'),
  ('Adaptabilidad al Cambio'),
  ('Gestión del Tiempo'),
  ('Atención al Cliente'),
  ('Inglés Intermedio / Avanzado'),
  ('Capacidad de Aprendizaje Autónomo')
ON CONFLICT (name) DO NOTHING;