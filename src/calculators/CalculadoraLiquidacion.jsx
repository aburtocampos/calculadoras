import React, { useState } from "react";
import moment from "moment";
import "moment/locale/es";

const CalculadoraLiquidacion = () => {
  const [modalidadSalario, setModalidadSalario] = useState("");
  const [salarioFijo, setSalarioFijo] = useState("");
  const [salariosVariables, setSalariosVariables] = useState(new Array(6).fill(""));
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [vacaciones, setVacaciones] = useState("");
  const [resultados, setResultados] = useState(null);
  const [errores, setErrores] = useState("");

  const formatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  const calcularAntiguedad = () => {
    if (!fechaInicio || !fechaFin) return null;

    const inicio = moment(fechaInicio, "YYYY-MM-DD");
    const fin = moment(fechaFin, "YYYY-MM-DD");

    if (!inicio.isValid() || !fin.isValid() || fin.isBefore(inicio)) {
      setErrores("La fecha de fin debe ser mayor a la de inicio.");
      return null;
    }

    const anios = fin.diff(inicio, "years");
    inicio.add(anios, "years");

    const meses = fin.diff(inicio, "months");
    inicio.add(meses, "months");

    const dias = fin.diff(inicio, "days");

    return { anios, meses, dias };
  };

  const calcularLiquidacion = () => {
    setErrores("");

    const antiguedad = calcularAntiguedad();
    if (!antiguedad) return;

    let salarioMensual = modalidadSalario === "fijo"
      ? parseFloat(salarioFijo) || 0
      : Math.max(...salariosVariables.map(s => parseFloat(s) || 0));

    if (!salarioMensual || salarioMensual <= 0) {
      setErrores("Debe ingresar un salario válido.");
      return;
    }

    const salarioPorDia = salarioMensual / 30;
    const diasIndemnizados = antiguedad.anios * 30 + antiguedad.meses * 2.5 + antiguedad.dias * (30 / 365);
    const indemnizacion = salarioPorDia * diasIndemnizados;
    const vaca = (parseFloat(vacaciones) || 0) * salarioPorDia;
    const aguinaldo = antiguedad.anios >= 1 ? salarioMensual : salarioMensual / 12 * antiguedad.meses + (salarioMensual / 12 / 30) * antiguedad.dias;
    const salarioProporcional = salarioPorDia * moment(fechaFin, "YYYY-MM-DD").date();
    const ingresosBrutos = indemnizacion + vaca + aguinaldo + salarioProporcional;

    // Cálculo de deducciones
    const inssVacaciones = vaca * 0.07;
    const inssSalarioProp = salarioProporcional * 0.07;
    const totalINSS = inssVacaciones + inssSalarioProp;

    const irVacaciones = vaca * 0.15;
    const irSalarioProp = salarioProporcional * 0.15;
    const totalIR = irVacaciones + irSalarioProp;

    const netoRecibir = ingresosBrutos - totalINSS - totalIR;

    setResultados({
      antiguedad: `${antiguedad.anios} años, ${antiguedad.meses} meses, ${antiguedad.dias} días`,
      diasIndemnizados: diasIndemnizados.toFixed(2),
      indemnizacion: formatter.format(indemnizacion),
      vacaciones: formatter.format(vaca),
      aguinaldo: formatter.format(aguinaldo),
      salarioProporcional: formatter.format(salarioProporcional),
      ingresosBrutos: formatter.format(ingresosBrutos),
      inssVacaciones: formatter.format(inssVacaciones),
      inssSalarioProp: formatter.format(inssSalarioProp),
      totalINSS: formatter.format(totalINSS),
      irVacaciones: formatter.format(irVacaciones),
      irSalarioProp: formatter.format(irSalarioProp),
      totalIR: formatter.format(totalIR),
      netoRecibir: formatter.format(netoRecibir),
    });
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Calculadora de Liquidación</h2>

      {errores && <p className="text-red-500">{errores}</p>}

      <label className="block text-sm text-gray-700 mb-1">Tipo de Salario:</label>
      <select className="w-full px-3 py-2 border rounded-md" onChange={(e) => setModalidadSalario(e.target.value)}>
        <option value="">Seleccionar</option>
        <option value="fijo">Fijo</option>
        <option value="variable">Variable</option>
      </select>

      {modalidadSalario === "fijo" && (
        <input type="number" className="w-full px-3 py-2 border rounded-md mt-2" placeholder="Salario mensual" onChange={(e) => setSalarioFijo(e.target.value)} />
      )}

      {modalidadSalario === "variable" && salariosVariables.map((s, i) => (
        <input key={i} type="number" className="w-full px-3 py-2 border rounded-md mt-2" placeholder={`Salario ${i + 1}`} onChange={(e) => {
          let newSalarios = [...salariosVariables];
          newSalarios[i] = e.target.value;
          setSalariosVariables(newSalarios);
        }} />
      ))}

      <input type="date" className="w-full px-3 py-2 border rounded-md mt-2" onChange={(e) => setFechaInicio(e.target.value)} />
      <input type="date" className="w-full px-3 py-2 border rounded-md mt-2" onChange={(e) => setFechaFin(e.target.value)} />
      <input type="number" className="w-full px-3 py-2 border rounded-md mt-2" placeholder="Días de vacaciones" onChange={(e) => setVacaciones(e.target.value)} />

      <button className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md" onClick={calcularLiquidacion}>Calcular</button>

      {resultados && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          {Object.entries(resultados).map(([key, value]) => (
            <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1')}:</strong> {value}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalculadoraLiquidacion;