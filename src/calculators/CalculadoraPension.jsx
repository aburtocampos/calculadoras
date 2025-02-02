import React from "react";
import { useForm } from "react-hook-form";
import useCalculadoraPension from "../hooks/usePension"; 

const CalculadoraPension = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { resultados, formData, calcularPension, limpiarDatos, handleChange } = useCalculadoraPension();

  // Función para manejar el envío del formulario
  const onSubmit = (data) => {
    calcularPension(data);
  };

  // limpiar datos
  const handleLimpiar = () => {
    reset();
    limpiarDatos();
  };

  // Mostrar input de "Número de Hijos" si hay ingresos netos
  const showNumeroHijos = !!formData.ingresosNetos;
  const showButtons = showNumeroHijos && formData.numeroHijos;

  return (
    <div className="p-4 bg-white rounded shadow max-w-lg mx-auto">
      <h2 className="text-xl text-gray-700 font-bold mb-4">Calculadora de Pensión Alimenticia</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo de Ingresos Netos */}
        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Ingresos Netos (C$):</label>
          <input
            type="number"
            {...register('ingresosNetos', { required: true, min: 0 })}
            className="w-full p-2 border rounded text-gray-700"
            placeholder="Ejemplo: 10000"
            value={formData.ingresosNetos}
            onChange={handleChange}
          />
          {errors.ingresosNetos && <p className="text-red-500 text-sm">Ingrese un número válido.</p>}
        </div>

        {/* Campo de Número de Hijos (solo se muestra si hay ingresos netos) */}
        {showNumeroHijos && (
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Número de Hijos:</label>
            <input
              type="number"
              {...register('numeroHijos', { required: true, min: 1 })}
              className="w-full p-2 border rounded text-gray-700"
              placeholder="1,2,3,..."
              value={formData.numeroHijos}
              onChange={handleChange}
            />
            {errors.numeroHijos && <p className="text-red-500 text-sm">Debe ser al menos 1 hijo.</p>}
          </div>
        )}

        {/* Botones solo si se han ingresado ambos valores */}
        {showButtons && (
          <div className="flex gap-4">
            {!resultados && (
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
              >
                Calcular
              </button>
            )}
            <button
              type="button"
              onClick={handleLimpiar}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 cursor-pointer"
            >
              Empezar de nuevo
            </button>
          </div>
        )}
      </form>

      {/* Resultados */}
      {resultados && (
        <div className="mt-6">
          <hr className="my-2" />
          <h3 className="text-lg font-bold mb-2">Resultados:</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Concepto</th>
                <th className="border border-gray-300 p-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">
                  Porcentaje Total por {formData.numeroHijos} {formData.numeroHijos > 1 ? "hijos" : "hijo"}
                </td>
                <td className="border border-gray-300 p-2">{resultados.porcentaje}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Pensión por Hijo</td>
                <td className="border border-gray-300 p-2">{resultados.pensionPorHijo}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Pensión Total</td>
                <td className="border border-gray-300 p-2">{resultados.pensionTotal}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Salario luego de Pensión</td>
                <td className="border border-gray-300 p-2">{resultados.dineroRestante}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CalculadoraPension;
