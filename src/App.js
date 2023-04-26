import { useState, useEffect} from "react";

import "./styles/App.css";

import Tyke from "./Tyke.js";
import NewTykeMenu from "./NewTykeMenu.js";
import TykePanel from "./TykePanel.js";


function App() {

  const ETHNICITIES = ["Russian", "Japanese", "Egyptian", "Irish", "Mexican"];
  const ETH_COLORS = {
    "Russian": "#2c4582",
    "Japanese": "#a31d1d",
    "Egyptian": "#c76e2e",
    "Irish": "#5db54e",
    "Mexican": "#1b5c1e"
  }

  const [tykes, setTykes] = useState([]);
  const [newTykeMenuVis, setNewTykeMenuVis] = useState(false);
  const [tykePanelVis, setTykePanelVis] = useState(null);
  const [currGen, setCurrGen] = useState(0);

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


  return (
    <div id="App">
      <h1 id="nav-title">tykes</h1>

      <div id="new-tyke-btn">
        <h1 onClick={() => {
          setNewTykeMenuVis(prev => !prev);
        }}>
          +
        </h1>
      </div>

      <div id="tyke-grid">
        {tykes.slice(0).reverse().map((val, i) => {
          let {
            firstName,
            lastName,
            gender,
            mother,
            father,
            ethnicity,
            skinTone,
            hairColor,
            generation
          } = val;
          return <Tyke
            firstName={firstName}
            lastName={lastName}
            gender={gender}
            mother={mother}
            father={father}
            ethnicity={ethnicity}
            skinTone={skinTone}
            hairColor={hairColor}
            generation={generation}
            setTykePanelVis={setTykePanelVis}
            key={i}
          />
        })}
      </div>

      {newTykeMenuVis && <NewTykeMenu 
        setNewTykeMenuVis={setNewTykeMenuVis}
        ETHNICITIES={ETHNICITIES}
        tykes={tykes}
        setTykes={setTykes}
      />}

      {tykePanelVis && <TykePanel
        tykePanelVis={tykePanelVis}
        setTykePanelVis={setTykePanelVis} 
        tykes={tykes}
        setTykes={setTykes}
        currGen={currGen}
        ETHNICITIES={ETHNICITIES}
        ETH_COLORS={ETH_COLORS}
      />}

    </div>
  );
}

export default App;
