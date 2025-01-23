import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CalculadoraPension from './calculators/CalculadoraPension';
//import CalculadoraImpuestos from './calculators/CalculadoraImpuestos';
//import CalculadoraPresupuesto from './calculators/CalculadoraPresupuesto';
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center mb-8">Aplicación de Calculadoras</h1>

        {/* Navegación */}
        <nav className="flex justify-center space-x-4 mb-8">
          <Link to="/calculadora-pension" className="text-blue-500 hover:underline">Pensión Alimenticia</Link>

        </nav>

        {/* Rutas */}
        <Routes>
          <Route path="/calculadora-pension" element={<CalculadoraPension />} />
        { /* <Route path="/calculadora-impuestos" element={<CalculadoraImpuestos />} />
          <Route path="/calculadora-presupuesto" element={<CalculadoraPresupuesto />} />*/}
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
