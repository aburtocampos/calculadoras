import { useState } from "react";

// Formateador de moneda
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const useCalculadoraSueldo = () => {
  const [resultados, setResultados] = useState(null);
  const [isCalculated, setIsCalculated] = useState(false);

  // Función para calcular el IR
  const calcularIR = (salarioDespuesINSS) => {
    const salarioAnual = salarioDespuesINSS * 12;
    let sobreExceso = 0,
      porcentajeAplicable = 0,
      impuestoBase = 0;

    if (salarioAnual <= 100000) {
      sobreExceso = 0;
      porcentajeAplicable = 0;
      impuestoBase = 0;
    } else if (salarioAnual > 100000 && salarioAnual <= 200000) {
      sobreExceso = 100000;
      porcentajeAplicable = 0.15;
      impuestoBase = 0;
    } else if (salarioAnual > 200000 && salarioAnual <= 350000) {
      sobreExceso = 200000;
      porcentajeAplicable = 0.2;
      impuestoBase = 15000;
    } else if (salarioAnual > 350000 && salarioAnual <= 500000) {
      sobreExceso = 350000;
      porcentajeAplicable = 0.25;
      impuestoBase = 45000;
    } else if (salarioAnual > 500000) {
      sobreExceso = 500000;
      porcentajeAplicable = 0.3;
      impuestoBase = 82500;
    }

    const sinExceso = salarioAnual - sobreExceso;
    const aplicable = sinExceso * porcentajeAplicable;
    const totalIR = (aplicable + impuestoBase) / 12;
    return totalIR;
  };

  // Función para calcular el salario
  const calcularSalario = (salario) => {
    const salarioBruto = parseFloat(salario) || 0;

    // Calcular INSS
    const inss = salarioBruto * 0.07;
    const salarioDespuesINSS = salarioBruto - inss;

    // Calcular IR
    const ir = calcularIR(salarioDespuesINSS);

    // Calcular salario total neto
    const salarioNetoMensual = salarioDespuesINSS - ir;
    const salarioNetoQuincenal = salarioNetoMensual / 2;

    setResultados({
      salarioBruto: formatter.format(salarioBruto),
      inss: formatter.format(inss),
      salarioDespuesINSS: formatter.format(salarioDespuesINSS),
      ir: formatter.format(ir),
      salarioNetoMensual: formatter.format(salarioNetoMensual),
      salarioNetoQuincenal: formatter.format(salarioNetoQuincenal),
    });

    setIsCalculated(true);
  };

  const limpiarDatos = () => {
    setResultados(null);
    setIsCalculated(false);
  };

  return {
    resultados,
    isCalculated,
    calcularSalario,
    limpiarDatos,
  };
};

export default useCalculadoraSueldo;
