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
      </header>
      <div className="hero">
        <div className="hero-content">
          <div className="hero1">
            <img
              src="src/assets/logo-header.png"
              alt="Sproutapia Title"
              className="logo-landing"
            />
            <h1 className="herotitle">From Planting to Plating</h1>
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

      {/* <div className="container">
        <div className="text">
          <ul>
            <li>
              Explore the plant database and view planting schedules, harvesting
              times and watering frequencies
            </li>
            <br />
            <li>
              Plant your seeds and update your virtual garden to reflect your
              real one! Your little vegetable friend will alert you when it’s
              thirsty and when it’s ready to be harvested
            </li>
            <br />
            <li>
              Organise and keep track of all your important gardening tasks in
              your to-do list
            </li>
            <br />
            <li>
              Is it going to rain today? Use the weather widget to help manage
              your upcoming tasks and watering schedule
            </li>
          </ul>
        </div>
        <div className="landing-img">
          <img className="circular" src="src/assets/cook.jpeg" alt="#" /> */}
        {/* </div> */}
      
      {/* </div> */}

      {/* <div className="container">
        <div className="sow-landing">
          <div className="sow-content">
            <h3 className="info-header">Garden</h3>
            <div className="grid-container">
              <div className="text">
                <ul>
                  <li>
                    Explore the plant database and view planting schedules,
                    harvesting times and watering frequencies
                  </li>
                  <br />
                  <li>
                    Plant your seeds and update your virtual garden to reflect
                    your real one! Your little vegetable friend will alert you
                    when it’s thirsty and when it’s ready to be harvested
                  </li>
                  <br />
                  <li>
                    Organise and keep track of all your important gardening
                    tasks in your to-do list
                  </li>
                  <br />
                  <li>
                    Is it going to rain today? Use the weather widget to help
                    manage your upcoming tasks and watering schedule
                  </li>
                </ul>
              </div>
              <div></div>
              <div className="image">
                <img className="circular" src="src/assets/cook.jpeg" alt="#" />
              </div>
            </div>
          </div>
        </div>
      </div> */}


        <img src={grassImage} alt="Grass" className="grass" />

    </>
  );
};

export default LandingPage;
