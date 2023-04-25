import "./styles/TykePanel.css";

import Russia from "./public/flag-icons/russia.png";
import Japan from "./public/flag-icons/japan.png";
import Egypt from "./public/flag-icons/egypt.png";
import Ireland from "./public/flag-icons/ireland.png";
import Mexico from "./public/flag-icons/mexico.png";

const TykePanel = (props) => {

    const { tykePanelVis, setTykePanelVis, tykes, setTykes, currGen, ETHNICITIES} = props;

    const FLAGS = [Russia, Japan, Egypt, Ireland, Mexico];

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
    } = tykePanelVis;

    let minAge = (currGen - generation) * 15;
    let maxAge = minAge + 15;

    let topEths = [];

    let ethnicityClone = {...ethnicity};

    for (let i = 0; i < 3; i++) {
        let high = [null, 0];
        for (const eth in ethnicityClone) {
            if (ethnicityClone[eth] >= high[1]) {
                high[0] = eth;
                high[1] = ethnicityClone[eth];
            }
        }
        topEths.push(high);
        delete ethnicityClone[high[0]];
    }

    topEths = topEths.map(val => val[0]).filter(val => ethnicity[val] > 0);
    let topFlags = topEths.map((val, i) => FLAGS[ETHNICITIES.indexOf(val)]);


    return <div id="tyke-panel">
        <button id="tp-x-btn" onClick={() => {setTykePanelVis(null)}}>x</button>
        <h1 id="tp-name-label">{firstName} {lastName}</h1>
        <div id="tp-flags-div">
            {topFlags.map((val, i) => {
                return <img src={val} key={i} />
            })}
        </div>
        <div id="tp-info-div">
            <div>
                <h5>generation:</h5>
                <h5>{generation} (age {minAge} - {maxAge})</h5>
            </div>

            <div>
                <h5>gender:</h5>
                <h5>{gender}</h5>
            </div>

            <div>
                <h5>mother:</h5>
                <h5>{mother}</h5>
            </div>

            <div>
                <h5>father:</h5>
                <h5>{father}</h5>
            </div>

            <div>
                <h5>skin tone:</h5>
                <h5>{skinTone}</h5>
            </div>

            <div>
                <h5>hair color:</h5>
                <h5>{hairColor}</h5>
            </div>

        </div>

        <div id="tp-ethnicity-div">
            {JSON.stringify(ethnicity)}
        </div>

        <div id="tp-buttons-div">
            <button id="rename-btn">rename</button>
            <button id="breed-btn">breed</button>
            <button id="star-btn">star</button>
        </div>
    </div>

}

export default TykePanel;