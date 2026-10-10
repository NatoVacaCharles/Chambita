import { useState } from "react";
import { Screen } from "../App";
import PerfilPageLayout from "../components/PerfilPageLayout";

type Props = { goTo: (screen: Screen) => void };

const CAMPOS = [
  { key: "nombre", label: "Nombre completo", type: "text" },
  { key: "correo", label: "Correo electrónico", type: "email" },
  { key: "contrasena", label: "Contraseña", type: "password" },
  { key: "celular", label: "Celular", type: "tel" },
  { key: "institucion", label: "Institución educativa", type: "text" },
  { key: "sede", label: "Sede", type: "text" },
];

export default function DatosPersonalesScreen({ goTo }: Props) {
  const [datos, setDatos] = useState<Record<string, string>>({
    nombre: "Kely Tintaya",
    correo: "kely@ejemplo.com",
    contrasena: "chambita123",
    celular: "987 654 321",
    institucion: "Universidad Nacional de San Agustín",
    sede: "Arequipa",
  });
  const [guardado, setGuardado] = useState(false);

  return (
    <PerfilPageLayout goTo={goTo} title="Mis datos personales" subtitle="Mantén tu información de contacto actualizada">
      <div className="bg-white border border-[#E8E4F0] rounded-2xl p-4 flex flex-col gap-4">
        {CAMPOS.map((campo) => (
          <div key={campo.key}>
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">{campo.label}</label>
            <input
              type={campo.type}
              value={datos[campo.key]}
              onChange={(event) => {
                setGuardado(false);
                setDatos({ ...datos, [campo.key]: event.target.value });
              }}
              className="w-full border border-[#E8E4F0] rounded-xl px-4 py-3 text-sm text-[#1a0a2e] outline-none focus:border-[#6C3FA0]"
            />
          </div>
        ))}
      </div>
      {guardado && <p className="text-center text-xs font-medium text-[#2DC8A8] mt-3">Cambios guardados correctamente</p>}
      <button onClick={() => setGuardado(true)} className="w-full mt-4 bg-gradient-to-r from-[#6C3FA0] to-[#9B6FD0] text-white font-semibold py-3.5 rounded-2xl text-sm">
        Guardar cambios
      </button>
    </PerfilPageLayout>
  );
}
