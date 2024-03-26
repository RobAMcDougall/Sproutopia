import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";
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
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/garden"
            element={
              <ProtectedRoute>
                <GardenPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plant/:id"
            element={
              <ProtectedRoute>
                <PlantInfoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<SideNav />}>
            <Route
              path="/kitchen"
              element={
                <ProtectedRoute>
                  <KitchenPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipes"
              element={
                <ProtectedRoute>
                  <RecipeListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/recipes/:id"
              element={
                <ProtectedRoute>
                  <RecipePage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
