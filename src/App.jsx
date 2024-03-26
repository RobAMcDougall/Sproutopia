import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import CalendarPage from "./pages/CalendarPage";
import GardenPage from "./pages/GardenPage";
import KitchenPage from "./pages/KitchenPage";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginRegisterPage/LoginPage";
import RegisterPage from "./pages/LoginRegisterPage/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import PlantInfoPage from "./pages/PlantInfoPage/PlantInfoPage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipePage from "./pages/RecipePage";
import SideNav from "./components/Kitchen/SideNav/SideNav";
import Navbar from "./components/Header/Navbar";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/garden" element={<GardenPage />} />
          <Route path="/plant/:id" element={<PlantInfoPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/" element={<SideNav />}>
            <Route path="/kitchen" element={<KitchenPage />} />
            <Route path="/recipes" element={<RecipeListPage />} />
            <Route path="/recipes/:id" element={<RecipePage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
