import React from "react";
import { useForm } from "react-hook-form";
import useCalculadoraSueldo from "../hooks/useSalarioNeto";

const CalculadoraSueldo = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { resultados, isCalculated, calcularSalario, limpiarDatos } = useCalculadoraSueldo();

  const onSubmit = (data) => {
    calcularSalario(data.salario);
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow max-w-lg mx-auto">
      <h2 className="text-xl text-gray-700 font-bold mb-4">Calculadora de Sueldo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Ingresos Brutos */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Ingresos Brutos (C$):</label>
          <input
            type="number"
            {...register("salario", { required: true, min: 0 })}
            className="w-full p-2 border rounded text-gray-700"
            placeholder="Ejemplo: 25000"
          />
          {errors.salario && <p className="text-red-500 text-sm">Ingrese un número válido.</p>}
        </div>

        {/* Botones */}
        <div className="flex gap-4">
          <button
            type="submit"
            className={`py-2 px-4 rounded ${
              isCalculated
                ? "bg-gray-500 text-white hover:bg-gray-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {isCalculated ? "Empezar de nuevo" : "Calcular"}
          </button>
          {isCalculated && (
            <button
              type="button"
              onClick={() => {
                limpiarDatos();
                reset();
              }}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Limpiar
            </button>
          )}
        </div>
      </form>

      {/* Tabla de Resultados */}
      {resultados && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Resultados:</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Concepto</th>
                <th className="border border-gray-300 p-2">Mensual (C$)</th>
                <th className="border border-gray-300 p-2">Quincenal (C$)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Salario Bruto</td>
                <td className="border border-gray-300 p-2">{resultados.salarioBruto}</td>
                <td className="border border-gray-300 p-2">-</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">INSS (7%)</td>
                <td className="border border-gray-300 p-2">{resultados.inss}</td>
                <td className="border border-gray-300 p-2">-</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Salario después del INSS</td>
                <td className="border border-gray-300 p-2">{resultados.salarioDespuesINSS}</td>
                <td className="border border-gray-300 p-2">-</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">IR Mensual</td>
                <td className="border border-gray-300 p-2">{resultados.ir}</td>
                <td className="border border-gray-300 p-2">-</td>
              </tr>
              <tr className="font-bold">
                <td className="border border-gray-300 p-2">Salario Neto</td>
                <td className="border border-gray-300 p-2">{resultados.salarioNetoMensual}</td>
                <td className="border border-gray-300 p-2">{resultados.salarioNetoQuincenal}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CalculadoraSueldo;
