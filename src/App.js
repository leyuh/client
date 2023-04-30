import { useState, useEffect} from "react";

import "./styles/App.css";

import Tyke from "./components/Tyke.js";
import NewTykeMenu from "./components/NewTykeMenu.js";
import TykePanel from "./components/TykePanel.js";

import GraveIcon from "./public/grave-icon.png";
import HeadIcon from "./public/head-icon.png";

import HomePage from "./pages/HomePage";
import GraveyardPage from "./pages/GraveyardPage";


function App() {

  const ETHNICITIES = ["Russian", "Japanese", "Egyptian", "Irish", "Mexican"];
  const ETH_COLORS = {
    "Russian": "#4c72ad",
    "Japanese": "#e8e8e8",
    "Egyptian": "#242424",
    "Irish": "#3c8034",
    "Mexican": "#a32a2a"
  }

  const [tykes, setTykes] = useState([]);
  const [newTykeMenuVis, setNewTykeMenuVis] = useState(false);
  const [tykePanelVis, setTykePanelVis] = useState(null);
  const [currGen, setCurrGen] = useState(0);
  const [choosingBreeder, setChoosingBreeder] = useState(null);

  const [currPage, setCurrPage] = useState("home");

  const [starredTykes, setStarredTykes] = useState([]);


  // check local storage for starred tykes
  useEffect(() => {
    let data = localStorage.getItem("starredTykes");
    if (data != "" && data != null) {
      setStarredTykes(data.split(","));
    }
  }, []);

  // set local storage when starred tykes changes
  useEffect(() => {
    localStorage.setItem("starredTykes", starredTykes.toString());
  }, [starredTykes])

  // fetch tykes
  useEffect(() => {
    fetch("http://localhost:3001/", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => setTykes(data))
  }, [])

  // update current generation
  useEffect(() => {
    let oldestGen = 0;
    for (let i = 0; i < tykes.length; i++) {
      if (tykes[i].generation > oldestGen) {
        oldestGen = tykes[i].generation;
      }
    }

    setCurrGen(oldestGen);
  }, [tykes])

  window.onclick = e => {
    if (choosingBreeder) {
      if (e.target.id == "home-page" || e.target.id == "tyke-grid") {
        setChoosingBreeder(null)
      }
    }
  }

  return (
    <div id="App">
      {choosingBreeder && <div id="shade-div" />}
      <h1 id="nav-title">tykes</h1>

      <div id="main-btns-div">

      <div id="current-pop-wrapper">
        <div style={
          currPage === "home" ? {backgroundColor: "rgb(50, 83, 96)"} : {backgroundColor: "#999"}
        }>
          <h2 id="curr-pop-display">{tykes.length}</h2>
        </div>
        <h5>population</h5>
      </div>

        <div id="current-gen-wrapper">
          <div style={
            currPage === "home" ? {backgroundColor: "rgb(50, 83, 96)"} : {backgroundColor: "#999"}
          }>
            <h2 id="curr-gen-display">{currGen}</h2>
          </div>
          <h5>current gen</h5>
        </div>

        <div id="graveyard-div" style={
          currPage === "home" ? {backgroundColor: "rgb(50, 83, 96)"} : {backgroundColor: "#999"}
        }>
          <img src={currPage == "home" ? GraveIcon : HeadIcon} onClick={() => {
            if (currPage == "home") {
              setCurrPage("graveyard");
              document.body.style.backgroundColor = "rgb(93, 120, 93)";
            } else {
              setCurrPage("home");
              document.body.style.backgroundColor = "rgb(127, 168, 184)";
            }
          }} />
        </div>

      </div>

      {currPage == "home" ? <HomePage 
        tykes={tykes}
        setTykes={setTykes}
        newTykeMenuVis={newTykeMenuVis}
        setNewTykeMenuVis={setNewTykeMenuVis}
        tykePanelVis={tykePanelVis}
        setTykePanelVis={setTykePanelVis}
        starredTykes={starredTykes}
        setStarredTykes={setStarredTykes}
        choosingBreeder={choosingBreeder}
        setChoosingBreeder={setChoosingBreeder}
        currGen={currGen}
        ETHNICITIES={ETHNICITIES}
        ETH_COLORS={ETH_COLORS}
      /> : <GraveyardPage 
      
      />}

      

    </div>
  );
}

export default App;
