import React, { useState } from "react";
import moment from "moment";
import "moment/locale/es";

const CalculadoraAguinaldo = () => {
  const [fechaInicio, setFechaInicio] = useState(null);
  const [modalidadSalario, setModalidadSalario] = useState(""); // Estado inicial vacío
  const [salarioFijo, setSalarioFijo] = useState("");
  const [salariosVariables, setSalariosVariables] = useState(new Array(6).fill(""));
  const [antiguedadTexto, setAntiguedadTexto] = useState("");
  const [aguinaldoTotal, setAguinaldoTotal] = useState("");
  const [showResults, setShowResults] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  // Función para verificar si los campos de salario están llenos
  const camposSalarioLlenos = () => {
    if (modalidadSalario === "fijo") {
      return salarioFijo.trim() !== ""; // Verifica si el salario fijo tiene contenido
    } else if (modalidadSalario === "variable") {
      return salariosVariables.every((salario) => salario.trim() !== ""); // Verifica si todos los salarios variables tienen contenido
    }
    return false; // Si no se ha seleccionado una modalidad, retorna false
  };

  const calcularAntiguedad = () => {
    if (!fechaInicio) return null;

    const fechaInicioMoment = moment(fechaInicio);
    const fechaFinMoment = moment(`30/11/${moment().year()}`, "DD/MM/YYYY").add(1, "days");
    console.log("fechaFinMoment",fechaFinMoment);
    
    if (!fechaInicioMoment.isValid() || !fechaFinMoment.isValid()) {
      console.error("Fechas inválidas");
      return null;
    }

    const anios = fechaFinMoment.diff(fechaInicioMoment, "years");
    fechaInicioMoment.add(anios, "years");

    const meses = fechaFinMoment.diff(fechaInicioMoment, "months");
    fechaInicioMoment.add(meses, "months");

    const dias = fechaFinMoment.diff(fechaInicioMoment, "days");

    const antiguedadStr = `${anios} ${anios === 1 ? "año" : "años"}, ${meses} ${
      meses === 1 ? "mes" : "meses"
    }, ${dias} ${dias === 1 ? "día" : "días"}`;

    setAntiguedadTexto(antiguedadStr);

    return { anios, meses, dias };
  };

  const calcularAguinaldo = (salarioMasAlto, antiguedad) => {
    if (!antiguedad) return;

    let aguinaldo = 0;

    if (antiguedad.anios >= 1) {
      aguinaldo = salarioMasAlto;
    } else {
      const salarioDia = salarioMasAlto / 12 / 30;
      const salarioMes = salarioMasAlto / 12;
      aguinaldo = salarioMes * antiguedad.meses + salarioDia * antiguedad.dias;
    }

    setAguinaldoTotal(formatter.format(aguinaldo));
  };

  const calcularLiquidacion = () => {
    const antiguedad = calcularAntiguedad();
    let salarioMasAlto = 0;

    if (modalidadSalario === "fijo") {
      salarioMasAlto = parseFloat(salarioFijo) || 0;
    } else if (modalidadSalario === "variable") {
      salarioMasAlto = Math.max(...salariosVariables.map(s => parseFloat(s) || 0));
    } else {
      alert("Por favor, selecciona una modalidad de salario.");
      return;
    }

    calcularAguinaldo(salarioMasAlto, antiguedad);
    setShowResults(true);
  };

  const limpiarDatos = () => {
    setFechaInicio(null);
    setModalidadSalario("");
    setSalarioFijo("");
    setSalariosVariables(new Array(6).fill(""));
    setAntiguedadTexto("");
    setAguinaldoTotal("");
    setShowResults(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Calculadora de Aguinaldo</h2>

      {/* Selección de modalidad de salario */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1">Modalidad de salario:</label>
        <select
          className="w-full px-3 py-2 border rounded-md cursor-pointer"
          value={modalidadSalario}
          onChange={(e) => setModalidadSalario(e.target.value)}
        >
          <option value="">Seleccionar</option>
          <option value="fijo">Fijo</option>
          <option value="variable">Variable</option>
        </select>
      </div>

      {/* Campo para salario fijo */}
      {modalidadSalario === "fijo" && (
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Salario mensual:</label>
          <input
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            value={salarioFijo}
            onChange={(e) => setSalarioFijo(e.target.value)}
            placeholder="Ingrese salario mensual"
          />
        </div>
      )}

      {/* Campos para salario variable */}
      {modalidadSalario === "variable" && (
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Últimos 6 salarios:</label>
          {salariosVariables.map((salario, index) => (
            <input
              key={index}
              type="number"
              className="w-full px-3 py-2 border rounded-md mb-2"
              value={salario}
              onChange={(e) => {
                const nuevosSalarios = [...salariosVariables];
                nuevosSalarios[index] = e.target.value;
                setSalariosVariables(nuevosSalarios);
              }}
              placeholder={`Salario ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Mostrar el campo de fecha de inicio solo si los campos de salario están llenos */}
      {camposSalarioLlenos() && (
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Fecha de inicio:</label>
          <input
            type="date"
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      )}

      {/* Botón de calcular */}
      {fechaInicio && camposSalarioLlenos() && !showResults && (
        <button
          className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          onClick={calcularLiquidacion}
        >
          Calcular Aguinaldo
        </button>
      )}

      {showResults  && (
         <button
            className="cursor-pointer mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
            onClick={limpiarDatos}
          >
            Empezar de nuevo
          </button>
       )}

      {/* Resultados */}
      {showResults && (
         <>
          <hr className="my-5" />
          <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-bold text-gray-800">Resultados:</h3>
          <p className="text-gray-700">Antigüedad: {antiguedadTexto}</p>
          <p className="text-gray-700">Aguinaldo Total: {aguinaldoTotal}</p>
        </div>
         </>
        
      )}
    </div>
  );
};

export default CalculadoraAguinaldo;