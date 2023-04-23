import Russia from "./public/flag-icons/russia.png";
import Japan from "./public/flag-icons/japan.png";
import Egypt from "./public/flag-icons/egypt.png";
import Ireland from "./public/flag-icons/ireland.png";
import Mexico from "./public/flag-icons/mexico.png";

import "./styles/NewTykeMenu.css";

const NewTykeMenu = () => {

    return (<div id="new-tyke-menu-div">
        <div id="flags-div">
            <img src={Russia} alt={"russia"}/>
            <img src={Japan} alt={"japan"} />
            <img src={Egypt} alt={"egypt"} />
            <img src={Ireland} alt={"ireland"} />
            <img src={Mexico} alt={"mexico"} />
        </div>
    </div>)
}

export default NewTykeMenu;