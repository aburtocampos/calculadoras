import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CalculadoraPension from './calculators/CalculadoraPension';
import CalculadoraSueldo from './calculators/CalculadoraSueldo';
import CalculadoraAguinaldo from './calculators/CalculadoraAguinaldo';
import CalculadoraLiquidacion from './calculators/CalculadoraLiquidacion';
import './App.scss'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
 <Router >
      <div className="container mt-8 mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Calculadoras Financieras</h1>

        {/* Navegación */}
        <nav className="flex justify-center space-x-4 mb-8">
          <Link to="/calculadora-pension" className="text-blue-500 hover:underline">Pensión Alimenticia</Link>
          <Link to="/calculadora-sueldo" className="text-blue-500 hover:underline">Salario Neto</Link>
          <Link to="/calculadora-aguinaldo" className="text-blue-500 hover:underline">Aguinaldo</Link>
        </nav>

        {/* Rutas */}
        <Routes>
          <Route path="/calculadora-pension" element={<CalculadoraPension />} />
          <Route path="/calculadora-aguinaldo" element={<CalculadoraAguinaldo />} />
          <Route path="/calculadora-sueldo" element={<CalculadoraSueldo />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
