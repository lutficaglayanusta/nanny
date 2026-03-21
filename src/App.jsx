import { lazy, Suspense } from 'react'
import './App.css'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Modal from 'react-modal';

const HomePage = lazy(() => import("./pages/HomePage"))
const NanniesPage = lazy(() => import("./pages/NanniesPage"))
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"))

Modal.setAppElement('#root');

function App() {
  

  return (
    <>
      <Header />
      <Suspense>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/nannies' element={<NanniesPage />} />
          <Route path='/favorites' element={<FavoritesPage/>} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
