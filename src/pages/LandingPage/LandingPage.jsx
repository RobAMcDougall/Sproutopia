import React from "react";
import skyImage from "../../assets/sky.svg";
import grassImage from "../../assets/grass.svg";
import "./LandingPage.css";
import Landingnav from "../../components/Landingnav/Landingnav";

const LandingPage = () => {
  return (
    <>
      <Landingnav />
      <header>
        <img src={skyImage} alt="sky" className="sky" />
      </header>
      <div className="hero">
        <div className="hero-content">
          <div className="hero1">
            <img src="src/assets/logo-header.png" alt="Sproutapia Title" />
            <h1 className="herotitle">From Planting to Plate</h1>
          </div>
          <div className="hero2">
            <div className="sowheader">
              <h3 className="sowtitle">Sow</h3>
              <img
                className="circular"
                src="src/assets/sprout.jpg"
                alt="Seed sprouting"
              />
              <p className="sow-about">
                🌱 Cultivate with Confidence Personalised guidance from seed to
                sprout, ensuring your garden thrives.
              </p>
            </div>
            <div className="harvestheader">
              <h3 className="harvesttitle">Harvest</h3>
              <img
                className="circular"
                src="src/assets/harvest.avif"
                alt="harvest vegetables"
              />
              <p className="harvest-about">
                🌱 Maximise Your Bounty Expert tips to make the most of your
                harvest, ensuring abundant and flavourful produce.
              </p>
            </div>
            <div className="cookheader">
              <h3 className="cooktitle">Cook</h3>
              <img className="circular" src="src/assets/cook.jpeg" alt="#" />
              <p className="cook-about">
                🌱 From Garden to Table Delicious recipes crafted to complement
                your homegrown bounty, turning every meal into a celebration.
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="divider" />
      <div className="sow">
        <div className="sow-content">
          <h3>Grow with confidence using our vegetable tracker!</h3>
          <img src="" alt="" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique
            quod ea, illum nesciunt et voluptate hic fugiat! Vitae, dignissimos
            eaque pariatur consequuntur ea dolor quae sit architecto, nam,
            voluptatum animi!
          </p>
        </div>
      </div>
      <hr className="divider" />
      <div className="harvest">
        <div className="harvest-content">
          <h3>
            Never miss a harvest and take those happy little veg with you to
            your kitchen!
          </h3>
          <img src="" alt="" />
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima
            ipsam, consequatur suscipit, distinctio quidem dignissimos eligendi
            molestiae dolores rem odio autem commodi ab inventore. Quae ipsam
            repellendus sint architecto esse.
          </p>
        </div>
        <hr className="divider" />
        <div className="cook">
          <div className="cook-content">
            <h3>
              Do your part to help the environment by reducing your food waste,
              all while making some tasty treats
            </h3>
            <img src="" alt="" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
              dicta quibusdam iusto iure? Laborum neque velit reprehenderit sit
              tenetur minus sequi, ab hic repudiandae! Possimus voluptatibus
              culpa ratione consectetur maiores.
            </p>
          </div>
        </div>
      </div>
      <div className="mascot-container"></div>
      <footer>
        <img src={grassImage} alt="Grass" className="grass" />
      </footer>
    </>
  );
};

export default LandingPage;
