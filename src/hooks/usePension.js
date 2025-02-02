import { useState, useEffect } from "react";

const usePension = () => {
  const [resultados, setResultados] = useState(null);
  const [formData, setFormData] = useState({
    ingresosNetos: "",
    numeroHijos: "",
  });

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem("pensionFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("pensionFormData", JSON.stringify(formData));
  }, [formData]);

  // Función para calcular la pensión alimenticia
  const calcularPension = (data) => {
    const ingresos = parseFloat(data.ingresosNetos) || 0;
    const hijos = parseInt(data.numeroHijos) || 0;

    let porcentaje = 0;

    switch (hijos) {
        case 1:
            porcentaje = 25;
            break;
        case 2:
            porcentaje = 35;
            break;
        default:
            if (hijos >= 3) {
                porcentaje = 50;
            }
        break;
    }

    const pensionPorHijo = ingresos * (porcentaje / hijos / 100) || 0;
    const pensionTotal = pensionPorHijo * hijos;
    const dineroRestante = ingresos - pensionTotal;

    setResultados({
      porcentaje: `${porcentaje}%`,
      pensionPorHijo: `C$ ${pensionPorHijo.toFixed(2)}`,
      pensionTotal: `C$ ${pensionTotal.toFixed(2)}`,
      dineroRestante: `C$ ${dineroRestante.toFixed(2)}`,
    });
  };

  // Función para limpiar los datos
  const limpiarDatos = () => {
    setResultados(null);
    setFormData({ ingresosNetos: "", numeroHijos: "" });
  };

  // Función para manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    resultados,
    formData,
    calcularPension,
    limpiarDatos,
    handleChange,
  };
};

export default usePension;