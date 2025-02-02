// store.js
import create from 'zustand';

const useFormStore = create((set) => ({
  tipoSalario: '',
  salarioFijo: '',
  salariosVariables: ['', '', '', '', '', ''],
  fechaInicio: null,
  setTipoSalario: (tipo) => set({ tipoSalario: tipo }),
  setSalarioFijo: (salario) => set({ salarioFijo: salario }),
  setSalariosVariables: (index, value) => set((state) => {
    const newSalarios = [...state.salariosVariables];
    newSalarios[index] = value;
    return { salariosVariables: newSalarios };
  }),
  setFechaInicio: (fecha) => set({ fechaInicio: fecha }),
}));

export default useFormStore;