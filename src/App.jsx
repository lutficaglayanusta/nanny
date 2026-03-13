import { Suspense } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Header />
      <Suspense>
        <Routes>
          <Route/>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
