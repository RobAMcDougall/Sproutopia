import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import CalendarPage from './pages/CalendarPage'
import GardenPage from './pages/GardenPage'
import KitchenPage from './pages/KitchenPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import PlantInfoPage from './pages/PlantInfoPage'
import SearchPage from './pages/SearchPage'

const App = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/garden" element={<GardenPage />} />
      <Route path="/:id" element={<PlantInfoPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/kitchen" element={<KitchenPage />} />
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default App;
