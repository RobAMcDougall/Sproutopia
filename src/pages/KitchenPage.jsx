import React from "react";
import SideNav from "../components/Kitchen/SideNav/SideNav";
import Welcome from "../components/Kitchen/Welcome/Welcome";
import WelcomeBackground from "../assets/welcome-background.png";
const KitchenPage = () => {
  return (
    <div className="kitchen">
      <Welcome />
    </div>
  );
};

export default KitchenPage;
