import { useState, useEffect} from "react";

import "./styles/App.css";

import Tyke from "./Tyke.js";

function App() {

  const [tykes, setTykes] = useState([]);

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
      <div id="tyke-grid">
        {tykes.map((val, i) => {
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
    </div>
  );
}

export default App;
