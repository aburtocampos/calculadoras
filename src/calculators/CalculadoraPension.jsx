import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const CalculadoraPension = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [resultados, setResultados] = useState(null);

  const calcularPension = (data) => {
    const ingresos = parseFloat(data.ingresosNetos) || 0;
    const hijos = parseInt(data.numeroHijos) || 0;

    let porcentaje = 0;
    if (hijos === 1) porcentaje = 25;
    else if (hijos === 2) porcentaje = 35;
    else if (hijos >= 3) porcentaje = 50;

    const pensionPorHijo = ingresos * (porcentaje / hijos / 100) || 0;
    const pensionTotal = pensionPorHijo * hijos;

    setResultados({
      porcentaje: `${porcentaje}%`,
      pensionPorHijo: `C$ ${pensionPorHijo.toFixed(2)}`,
      pensionTotal: `C$ ${pensionTotal.toFixed(2)}`,
    });
  };

  const limpiarDatos = () => {
    reset();
    setResultados(null);
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow max-w-lg mx-auto">
      <h2 className="text-xl text-gray-700 font-bold mb-4">Calculadora de Pensión Alimenticia</h2>
      <form onSubmit={handleSubmit(calcularPension)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Ingresos Netos (C$):</label>
          <input
            type="number"
            {...register('ingresosNetos', { required: true, min: 0 })}
            className="w-full p-2 border rounded text-gray-700"
            placeholder="Ejemplo: 30000"
          />
          {errors.ingresosNetos && <p className="text-red-500 text-sm">Ingrese un número válido.</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Número de Hijos:</label>
          <input
            type="number"
            {...register('numeroHijos', { required: true, min: 1 })}
            className="w-full p-2 border rounded text-gray-700"
            placeholder="Ejemplo: 2"
          />
          {errors.numeroHijos && <p className="text-red-500 text-sm">Debe ser al menos 1 hijo.</p>}
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Calcular
          </button>
          <button
            type="button"
            onClick={limpiarDatos}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Limpiar
          </button>
        </div>
      </form>
      {resultados && (
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Resultados:</h3>
          <p>Pensión por Hijo: {resultados.pensionPorHijo}</p>
          <p>Pensión Total: {resultados.pensionTotal}</p>
          <p>Porcentaje Total: {resultados.porcentaje}</p>
        </div>
      )}
    </div>
  );
};

export default CalculadoraPension;
