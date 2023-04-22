import {useState} from "react";

import "./styles/Tyke.css";

const Tyke = (props) => {

    const [showPanel, setShowPanel] = useState(false);

    const {
        firstName,
        lastName,
        gender,
        mother,
        father,
        ethnicity,
        generation
    } = props;

    return (<>
        <div className="tyke-div" style={
            (gender === "male") ? {backgroundColor: "rgb(160, 192, 215)"} : {backgroundColor: "rgb(176, 180, 186)"}
        }>
            <div className="tyke-img-div">
                <img src=""/>
            </div>
            <h3 className="tyke-name">{firstName} {lastName}</h3>
            <h5 className="tyke-gen">GEN {generation}</h5>
        </div>

        {showPanel && <div className="tyke-info-panel">
            
        </div>}
    </>)
}

export default Tyke;