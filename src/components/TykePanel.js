import "../styles/TykePanel.css";

import { useEffect, useState } from "react";

import Russia from "../public/flag-icons/russia.png";
import Japan from "../public/flag-icons/japan.png";
import Egypt from "../public/flag-icons/egypt.png";
import Ireland from "../public/flag-icons/ireland.png";
import Mexico from "../public/flag-icons/mexico.png";

const TykePanel = (props) => {

    const { 
        tykePanelVis, 
        setTykePanelVis, 
        tykes, 
        setTykes, 
        currGen, 
        ETHNICITIES, 
        ETH_COLORS,
        starredTykes,
        setStarredTykes
    } = props;

    const FLAGS = [Russia, Japan, Egypt, Ireland, Mexico];

    const [topFlags, setTopFlags] = useState([]);
    const [circleGradient, setCircleGradient] = useState("");
    
    const [showRenamePanel, setShowRenamePanel] = useState(false);


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
    } = tykePanelVis;

    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);

    let minAge = (currGen - generation) * 15;
    let maxAge = minAge + 15;

    useEffect(() => {
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
        setTopFlags(topEths.map((val, i) => FLAGS[ETHNICITIES.indexOf(val)]));
    }, []);

    let displayedEthnicities = (Object.keys(ethnicity).filter(val => ethnicity[val] > 0)).sort((a, b) => ethnicity[b] - ethnicity[a]);

    useEffect(() => {

        let displaySeq = [];

        let last = 0;

        for (let i = 0; i < displayedEthnicities.length; i++) {
            let eth = displayedEthnicities[i]
            if (ethnicity[eth] === 0) continue;
            let newItem = `${ETH_COLORS[eth]} calc(3.6deg * ${last}) calc(3.6deg * ${(ethnicity[eth] * 100) + last})`;
            displaySeq.push(newItem);
            last += ethnicity[eth] * 100;
        }

        let gradient = `repeating-conic-gradient(
            from 0deg,
        `;
        
        for (let i = 0; i < displaySeq.length; i++) {
            gradient += ` ${displaySeq[i]}`;
            if (i !== displaySeq.length - 1) {
                gradient += ",";
            }
        }
        gradient += ")";

        setCircleGradient(gradient);

    }, [])


    return <>
        <div id="tyke-panel">
            <button id="tp-x-btn" onClick={() => {setTykePanelVis(null)}}>x</button>
            <h1 id="tp-name-label">{newFirstName} {newLastName}</h1>
            <div id="tp-flags-div">
                {topFlags.map((val, i) => {
                    return <img src={val} key={i} />
                })}
            </div>
            <div id="tp-info-div">
                <div>
                    <h5 className="label">generation:</h5>
                    <h5 className="value">{generation} (age {minAge} - {maxAge})</h5>
                </div>

                <div>
                    <h5 className="label">gender:</h5>
                    <h5 className="value">{gender}</h5>
                </div>

                <div>
                    <h5 className="label">mother:</h5>
                    <h5 className="value">{mother}</h5>
                </div>

                <div>
                    <h5 className="label">father:</h5>
                    <h5 className="value">{father}</h5>
                </div>

                <div>
                    <h5 className="label">skin tone:</h5>
                    <h5 className="value">{skinTone}</h5>
                </div>

                <div>
                    <h5 className="label">hair color:</h5>
                    <h5 className="value">{hairColor}</h5>
                </div>

            </div>

            <div id="tp-ethnicity-div">
                <div id="tp-circle-div" style={{
                    background: circleGradient
                }}>
                    <div id="tp-circle-div-filler"/>
                </div>

                <div id="tp-key-div">
                    {displayedEthnicities.map((val, i) => {
                        return <div className="key-label" key={i}>
                            <div>
                                <h5>{val}</h5>
                                <img src={FLAGS[ETHNICITIES.indexOf(val)]} />
                            </div>
                            <h5 style={{
                                color: ETH_COLORS[val]
                            }}>{ethnicity[val] * 100}%</h5>
                        </div>
                    })}
                </div>
            </div>

            <div id="tp-buttons-div">
                <button id="rename-btn" onClick={() => setShowRenamePanel(prev => !prev)}>rename</button>
                <button id="breed-btn">breed</button>
                <button id="star-btn" onClick={() => {
                    if (starredTykes.includes(_id)) {
                        let newArr = starredTykes.filter(val => val != _id);
                        console.log(newArr);
                        setStarredTykes(newArr);
                    } else {
                        let newArr = [...starredTykes, _id];
                        console.log(newArr);
                        setStarredTykes(newArr);
                    }
                }}>{starredTykes.includes(_id) ? "unstar" : "star"}</button>
            </div>
        </div>

        {showRenamePanel && <div id="rename-panel">
            <button id="rename-x-btn" onClick={() => {
                setShowRenamePanel(false);
            }}>x</button>
            <h3>first name</h3>
            <input id="first-name-input" defaultValue={firstName} onChange={(e) => setNewFirstName(e.target.value)}/>
            <h3>last name</h3>
            <input id="last-name-input" defaultValue={lastName} onChange={(e) => setNewLastName(e.target.value)}/>
            <button id="rename-save-btn" onClick={() => {
                fetch("http://localhost:3001/rename-tyke", {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        _id: _id,
                        newFirstName: newFirstName,
                        newLastName: newLastName
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setTykes(data);
                        setShowRenamePanel(false);
                    })
            }}>save</button>
        </div>}
    </>
}

export default TykePanel;