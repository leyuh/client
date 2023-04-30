
import "../styles/Tyke.css";

import Head from "../public/tyke-icons/head.png";
import Hair from "../public/tyke-icons/hair.png";

import Star from "../public/star.png";

const Tyke = (props) => {

    const {
        _id,
        firstName,
        lastName,
        gender,
        mother,
        father,
        ethnicity,
        skinTone,
        hairColor,
        generation,
        setTykePanelVis,
        starredTykes,
        choosingBreeder,
        setChoosingBreeder,
        tykes,
        setTykes,
        ETHNICITIES,
        currGen
    } = props;

    return (<>
        <div className="tyke-div" id={_id} onClick={() => {
            if (!choosingBreeder) {
                setTykePanelVis({
                    _id,
                    firstName,
                    lastName,
                    gender,
                    mother,
                    father,
                    ethnicity,
                    skinTone,
                    hairColor,
                    generation,
                });
            } else {
                let breeder1Id = choosingBreeder;
                let breeder2Id = _id;

                let breeder1;
                for (let i = 0; i < tykes.length; i++) {
                    if (tykes[i]._id == breeder1Id) {
                        breeder1 = tykes[i];
                    }
                }

                let breeder2;
                for (let i = 0; i < tykes.length; i++) {
                    if (tykes[i]._id == breeder2Id) {
                        breeder2 = tykes[i];
                    }
                }

                let father = [breeder1, breeder2].filter((val) => val.gender === "male")[0];
                let mother = [breeder1, breeder2].filter((val) => val.gender === "female")[0];

                // SET GENDER
                let tykeGender = "male";

                let chance = Math.round(Math.random());
                if (chance === 1) {
                    tykeGender = "female";
                }

                // SET FIRST NAME

                let firstNames = [];

                // get names

                let possibleEths = [];
                for (let i = 0; i < ETHNICITIES.length; i++) {
                    if (father.ethnicity[ETHNICITIES[i]] > 0 || mother.ethnicity[ETHNICITIES[i]] > 0){
                        possibleEths.push(ETHNICITIES[i]);
                    }
                }

                fetch("http://localhost:3001/names", {
                    method: "GET",
                })
                    .then(res => res.json())
                    .then(data => {
                        for (let i = 0; i < data.length; i++) {
                            if (possibleEths.includes(data[i].ethnicity) && data[i].type == tykeGender) {
                                firstNames.push(data[i].name);
                            }
                        }

                        let tykeFirstName = firstNames[(Math.floor(Math.random() * firstNames.length))];

                        // SET LAST NAME
                        let tykeLastName = father.lastName; 

                        // SET MOTHER, FATHER
                        let tykeFather = `${father.firstName} ${father.lastName}`;
                        let tykeMother = `${mother.firstName} ${mother.lastName}`;

                        // SET ETHNICITY
                        let tykeEthnicity = {};
                        for (let i = 0; i < ETHNICITIES.length; i++) {
                            tykeEthnicity[ETHNICITIES[i]] = 0;
                        }

                        // analyze mother's dna
                        for (let i = 0; i < ETHNICITIES.length; i++) {
                            tykeEthnicity[ETHNICITIES[i]] += (mother.ethnicity[ETHNICITIES[i]] / 2);
                        }

                        // analyze father's dna
                        for (let i = 0; i < ETHNICITIES.length; i++) {
                            tykeEthnicity[ETHNICITIES[i]] += (father.ethnicity[ETHNICITIES[i]] / 2);
                        }

                        // SET HAIR, SKIN TONE
                        let tykeHair = mother.hairColor;

                        let chance = Math.round(Math.random());
                        if (chance === 1) {
                            tykeHair = father.hairColor;
                        }

                        let tykeSkin = mother.skinTone;

                        chance = Math.round(Math.random());
                        if (chance === 1) {
                            tykeSkin = father.skinTone;
                        }

                        // SET GEN
                        let gen;
                        if (mother.generation == currGen || father.generation == currGen) {
                            gen = currGen + 2;
                        } else {
                            gen = currGen;
                        }
                        let tykeGeneration = gen;

                        // POST NEW TYKE
                        fetch("http://localhost:3001/new-tyke", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                firstName: tykeFirstName,
                                lastName: tykeLastName,
                                gender: tykeGender,
                                mother: tykeMother,
                                father: tykeFather,
                                ethnicity: tykeEthnicity,
                                skinTone: tykeSkin,
                                hairColor: tykeHair,
                                generation: tykeGeneration
                            })
                        })
                            .then(res => res.json())
                            .then(data => setTykes(data))
                    })



                setChoosingBreeder(null);
            }
        }} style={
            (gender === "male") ? {
                backgroundColor: "rgb(160, 192, 215)",
                backgroundImage: "linear-gradient(rgb(176, 205, 225), rgb(136, 178, 208))"
            } : {
                backgroundColor: "rgb(176, 180, 186)",
                backgroundImage: "linear-gradient(rgb(207, 198, 206), rgb(188, 166, 182))"
            }
        }>
            {starredTykes.includes(_id) ? <img id="star-icon" src={Star} /> : ""}

            <div className="tyke-img-div">
                <img className="tyke-img" id="head-img" src={Head} style={{
                    backgroundColor: skinTone
                }}/>
                <img className="tyke-img" id="hair-img" src={Hair} style={
                    (gender === "male") ? {
                        visibility: "hidden",
                        backgroundColor: hairColor
                    } : {
                        visibility: "visible",
                        backgroundColor: hairColor
                    }
                }/>
            </div>
            <h3 className="tyke-name">{firstName} {lastName}</h3>
            <h5 className="tyke-gen">GEN {generation}</h5>
        </div>


    </>)
}

export default Tyke;