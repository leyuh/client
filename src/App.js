import { useState, useEffect} from "react";

import "./styles/App.css";

import Tyke from "./Tyke.js";
import NewTykeMenu from "./NewTykeMenu.js";

function App() {

  const ETHNICITIES = ["Russian", "Japanese", "Egyptian", "Irish", "Mexican"];

  const [tykes, setTykes] = useState([]);
  const [newTykeMenuVis, setNewTykeMenuVis] = useState(false);

  // fetch tykes
  useEffect(() => {
    fetch("http://localhost:3001/", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => setTykes(data))
  }, [])


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
            generation
          } = val;
          return <Tyke
            firstName={firstName}
            lastName={lastName}
            gender={gender}
            mother={mother}
            father={father}
            ethnicity={ethnicity}
            generation={generation}
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
    </div>
  );
}

export default App;
