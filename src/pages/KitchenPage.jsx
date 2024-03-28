import React from "react";
import SideNav from "../components/Kitchen/SideNav/SideNav";
import Welcome from "../components/Kitchen/Welcome/Welcome";
import WelcomeBackground from "../assets/welcome-background.png";
import AddIngredientsModal from "../components/Header/Shared/AddIngredientsModal";
const KitchenPage = () => {
  return (
    <div className="kitchen">
      <AddIngredientsModal />
      <Welcome />
    </div>
  );
};

export default KitchenPage;
