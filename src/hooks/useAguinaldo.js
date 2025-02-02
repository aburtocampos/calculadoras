import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAguinaldoStore from "../store/useAguinaldoStore"; // Asegúrate de que la ruta sea correcta

const useAguinaldo = () => {
  const { formData, resultados, setModalidadSalario, calcularAguinaldo, limpiarDatos } = useAguinaldoStore();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: formData, // Asegúrate de que formData no sea undefined
  });

  const modalidad = watch("modalidaSalario");
  const salarioFijo = watch("salario");
  const salariosVariables = [
    watch("salario1"),
    watch("salario2"),
    watch("salario3"),
    watch("salario4"),
    watch("salario5"),
    watch("salario6"),
  ];
  const fechaInicio = watch("fechaInicio");

  useEffect(() => {
    reset(formData); // Sincroniza el formulario con el estado del store
  }, [formData, reset]);

  useEffect(() => {
    setModalidadSalario(modalidad);
  }, [modalidad, setModalidadSalario]);

  const showSalarioFijo = modalidad === "fijo";
  const showSalariosVariables = modalidad === "variable";
  const showFechaInicio =
    (modalidad === "fijo" && !!salarioFijo) ||
    (modalidad === "variable" && salariosVariables.every(Boolean));
  const showButtons = modalidad !== "Seleccionar" && fechaInicio && showFechaInicio;

  return {
    register,
    handleSubmit,
    errors,
    resultados,
    calcularAguinaldo,
    limpiarDatos,
    showSalarioFijo,
    showSalariosVariables,
    showFechaInicio,
    showButtons,
  };
};

export default useAguinaldo;