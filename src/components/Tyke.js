
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
        starredTykes
    } = props;

    return (<>
        <div className="tyke-div" onClick={() => {
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
                generation
            });
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