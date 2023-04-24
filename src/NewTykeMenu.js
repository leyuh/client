import Russia from "./public/flag-icons/russia.png";
import Japan from "./public/flag-icons/japan.png";
import Egypt from "./public/flag-icons/egypt.png";
import Ireland from "./public/flag-icons/ireland.png";
import Mexico from "./public/flag-icons/mexico.png";

import "./styles/NewTykeMenu.css";

const NewTykeMenu = (props) => {

    const { setNewTykeMenuVis, ETHNICITIES, tykes, setTykes } = props;

    const clickHandler = (eth) => {
        setNewTykeMenuVis(false);

        // SET RANDOM GENDER
        let tykeGender = "male";

        let chance = Math.round(Math.random());
        if (chance === 1) {
            tykeGender = "female";
        }

        // SET ETHNICITY
        let tykeEthnicity = [0, 0, 0, 0, 0];
        tykeEthnicity[ETHNICITIES.indexOf(eth)] = 1;

        // SET GENERATION
        let oldestCurrentGen = 0;

        for (let i = 0; i < tykes.length; i++) {
            if (tykes[i].generation > oldestCurrentGen) {
                oldestCurrentGen = tykes[i].generation;
            }
        }

        let tykeGeneration = oldestCurrentGen + 1;

        // SET NAME
        let firstNames = [];
        let lastNames = [];

        // get names
        fetch("http://localhost:3001/names", {
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                let ethData = [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].ethnicity === eth) {
                        ethData.push(data[i]);
                    }
                }

                for (let i = 0; i < ethData.length; i++) {
                    if (ethData[i].type === "last") {
                        lastNames.push(ethData[i].name);
                    } else if (ethData[i].type === tykeGender) {
                        firstNames.push(ethData[i].name);
                    }
                }

                let tykeFirstName = firstNames[(Math.floor(Math.random() * firstNames.length))];
                let tykeLastName = lastNames[(Math.floor(Math.random() * lastNames.length))];


                // POST NEW TYKE
                fetch("http://localhost:3001/new-tyke", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firstName: tykeFirstName,
                        lastName: tykeLastName,
                        gender: tykeGender,
                        mother: "unknown",
                        father: "unknown",
                        ethnicity: tykeEthnicity,
                        generation: tykeGeneration
                    })
                })
                    .then(res => res.json())
                    .then(data => setTykes(data))
            })
    }

    return (<div id="new-tyke-menu-div">
        <div id="flags-div">
            <div id="flag-row-1" className="flag-row">
                <img src={Russia} alt={"russia"} onClick={() => clickHandler("Russian")}/>
                <img src={Japan} alt={"japan"} onClick={() => clickHandler("Japanese")}/>
                <img src={Egypt} alt={"egypt"} onClick={() => clickHandler("Egyptian")}/>
            </div>
            <div id="flag-row-2" className="flag-row">
                <img src={Ireland} alt={"ireland"} onClick={() => clickHandler("Irish")}/>
                <img src={Mexico} alt={"mexico"} onClick={() => clickHandler("Mexican")}/>
            </div>

        </div>
    </div>)
}

export default NewTykeMenu;