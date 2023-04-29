import "../styles/NewTykeMenu.css";

import Russia from "../public/flag-icons/russia.png";
import Japan from "../public/flag-icons/japan.png";
import Egypt from "../public/flag-icons/egypt.png";
import Ireland from "../public/flag-icons/ireland.png";
import Mexico from "../public/flag-icons/mexico.png";

const NewTykeMenu = (props) => {

    const { setNewTykeMenuVis, ETHNICITIES, tykes, setTykes } = props;

    const clickHandler = (eth) => {
        setNewTykeMenuVis(false);

        // SET GENDER
        let tykeGender = "male";

        let chance = Math.round(Math.random());
        if (chance === 1) {
            tykeGender = "female";
        }

        let allMale = true;
        let allFemale = true;

        for (let i = 0; i < tykes.length; i++) {
            if (tykes[i].gender == "male") {allFemale = false}
            else if (tykes[i].gender == "female") {allMale = false}
        }

        if (allMale) {console.log("all male"); tykeGender = "female"}
        if (allFemale) {console.log("all female"); tykeGender = "male"}

        // SET ETHNICITY
        let tykeEthnicity = {
            "Russian": 0,
            "Japanese": 0,
            "Egyptian": 0,
            "Irish": 0,
            "Mexican": 0
        };
        tykeEthnicity[eth] = 1;

        // SET GENERATION
        let oldestCurrentGen = 0;

        for (let i = 0; i < tykes.length; i++) {
            if (tykes[i].generation > oldestCurrentGen) {
                oldestCurrentGen = tykes[i].generation;
            }
        }

        let tykeGeneration = oldestCurrentGen;

        fetch("http://localhost:3001/ethnicities", {
            method: "GET",
        })
            .then(res => res.json())
            .then(dataA => {
                // SET SKIN TONE
                let set;
                for (let i = 0; i < dataA.length; i++) {
                    if (dataA[i].ethnicity === eth) {
                        set = dataA[i];
                    }
                }

                let tykeSkin = set.skinTone;

                // SET HAIR COLOR

                let tykeHair = set.hairColors[Math.floor(Math.random() * set.hairColors.length)];

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
                                skinTone: tykeSkin,
                                hairColor: tykeHair,
                                generation: tykeGeneration
                            })
                        })
                            .then(res => res.json())
                            .then(data => setTykes(data))
                    })
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