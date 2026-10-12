# 💼 Chambita

> **Nota importante:** Este proyecto es un **prototipo funcional e interactivo** desarrollado como modelo administrativo y de experiencia de usuario (UI/UX). **No constituye una aplicación comercial 100% terminada o en producción real**, sino una prueba de concepto para evaluar la factibilidad operativa y la interfaz de una bolsa de trabajo regional.

---

## 📌 Finalidad del Proyecto

**Chambita** nace con la finalidad de conectar a estudiantes, egresados y jóvenes profesionales de la región de Arequipa con empresas locales e instituciones en busca de talento. 

El propósito de esta plataforma es simplificar el proceso de reclutamiento regional mediante una interfaz móvil ágil, moderna y accesible, permitiendo a los postulantes destacar sus competencias académicas y experiencia, y a las empresas gestionar sus convocatorias de manera eficiente.

---

## 🎯 Alcance del Proyecto

El alcance actual del prototipo abarca los siguientes frentes:

* **Perfil Postulante (Candidato):** Registro e inicio de sesión, visualización de ofertas laborales, postulación directa a vacantes, gestión de formación académica, experiencia laboral, habilidades del catálogo y carga de documentos (CV, certificados).
* **Perfil Empresa (Reclutador):** Panel de control (*dashboard*) empresarial, gestión de marca empleadora (perfil público, misión, visión, trayectoria), publicación de vacantes y revisión de postulantes recibidos.
* **Seguridad y Persistencia:** Autenticación de usuarios por roles y almacenamiento persistente en la nube.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Rol y Utilidad en el Proyecto |
| :--- | :--- |
| **Figma** | **Diseño UI/UX y Prototipado:** Utilizado para diseñar la arquitectura visual, la paleta de colores, la tipografía y los flujos de navegación antes de la codificación. |
| **React + TypeScript** | **Desarrollo Frontend:** Desarrollo de la interfaz de usuario basada en componentes reutilizables, garantizando un tipado estricto y un código mantenible. |
| **Vite** | **Entorno de Construcción (Bundler):** Proporciona un entorno de desarrollo ultra rápido y optimiza los archivos para el despliegue en producción. |
| **Tailwind CSS** | **Estilizado y Diseño Responsivo:** Permite un diseño ágil, moderno y adaptable a pantallas móviles y de escritorio utilizando clases de utilidad. |
| **Supabase** | **Backend as a Service (BaaS):** <br>• **PostgreSQL Database:** Base de datos relacional para guardar perfiles, convocatorias, empresas, habilidades y postulaciones.<br>• **Supabase Auth:** Autenticación segura de usuarios (JWT).<br>• **Supabase Storage:** Almacenamiento en la nube de documentos PDF (CVs) y logos de empresas.<br>• **Row Level Security (RLS):** Control de acceso a los datos según el usuario autenticado. |
| **Vercel** | **Despliegue y CI/CD:** Hosting de producción con integración continua desde GitHub, generación de SSL automático y configuración de enrutamiento SPA (`vercel.json`). |

---

## ✅ Funcionalidades Realmente Operativas

Actualmente, el prototipo permite ejecutar en tiempo real las siguientes acciones:

1. **Autenticación e Inicio de Sesión:**
   * Registro e inicio de sesión seguro con correo y contraseña.
   * Diferenciación de vistas según el rol del usuario (`candidato` o `empresa`).

2. **Gestión de Perfil del Candidato:**
   * Carga y sincronización dinámica de experiencia laboral y formación académica.
   * Vinculación N:N de habilidades desde el catálogo central (`skills`).
   * Subida de documentos (PDF/DOCX) a Supabase Storage con actualización de la base de datos.

3. **Panel de Empresa y Marca Empleadora:**
   * Edición en tiempo real de la información institucional (misión, visión, contacto, trayectoria).
   * Carga y previsualización de logo corporativo.
   * Visualización del catálogo de convocatorias publicadas con conteo automático de postulantes.

---

## 🚀 Posibles Mejoras Futuras

Para evolucionar este prototipo hacia una plataforma comercial en producción, se sugieren las siguientes mejoras:

- [ ] **Filtros Avanzados de Búsqueda:** Búsqueda de empleos por distrito dentro de Arequipa (Cayma, Yanahuara, Paucarpata, etc.), rango salarial y modalidad (remoto/presencial).
- [ ] **Notificaciones en Tiempo Real:** Alertar al candidato cuando el estado de su postulación cambie (ej. "En revisión", "Entrevista").
- [ ] **Filtro de Candidatos con IA:** Algoritmo que ordene automáticamente los CVs de los postulantes con mayor compatibilidad según las habilidades requeridas en la vacante.
- [ ] **Chat Directo:** Sistema de mensajería interna entre la empresa y el postulante para coordinar entrevistas.
- [ ] **Autenticación Social:** Permitir el inicio de sesión con Google o LinkedIn.

---

## 📂 Estructura de la Base de Datos (Supabase)

El sistema se apoya en las siguientes tablas relacionales en PostgreSQL:
* `profiles`: Datos de usuario base y rol.
* `companies`: Información detallada de las empresas.
* `jobs` & `applications`: Gestión de convocatorias y postulaciones.
* `educational_institutions`, `careers` & `academic_backgrounds`: Formación académica.
* `work_experiences`: Historial laboral.
* `skills` & `candidate_skills`: Catálogo y vinculación de competencias.