import Tyke from "../components/Tyke.js";
import NewTykeMenu from "../components/NewTykeMenu.js";
import TykePanel from "../components/TykePanel.js";

const HomePage = (props) => {
    const {
        tykes,
        setTykes,

        newTykeMenuVis,
        setNewTykeMenuVis,

        tykePanelVis,
        setTykePanelVis,

        starredTykes,
        setStarredTykes,

        choosingBreeder,
        setChoosingBreeder,

        currGen,

        ETHNICITIES,
        ETH_COLORS
    } = props;

    return <div id="home-page">
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
            _id,
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
            _id={_id}
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
            starredTykes={starredTykes}
            choosingBreeder={choosingBreeder}
            setChoosingBreeder={setChoosingBreeder}
            tykes={tykes}
            setTykes={setTykes}
            ETHNICITIES={ETHNICITIES}
            currGen={currGen}
            key={i}
          />
        })}
      </div>

      {newTykeMenuVis && <NewTykeMenu 
        setNewTykeMenuVis={setNewTykeMenuVis}
        ETHNICITIES={ETHNICITIES}
        tykes={tykes}
        setTykes={setTykes}
        currGen={currGen}
      />}

      {tykePanelVis && <TykePanel
        tykePanelVis={tykePanelVis}
        setTykePanelVis={setTykePanelVis} 
        tykes={tykes}
        setTykes={setTykes}
        currGen={currGen}
        ETHNICITIES={ETHNICITIES}
        ETH_COLORS={ETH_COLORS}
        starredTykes={starredTykes}
        setStarredTykes={setStarredTykes}
        setChoosingBreeder={setChoosingBreeder}
      />}
    </div>
}

export default HomePage;