import { useState } from "react";
import Logo from "./assets/Mef-maroc.png"; 
export default function NavBar(){

    return(
        <nav className="NavBar">
            <img src={Logo} alt="" className="Icon"/>
            <div className="NavBarButtonsBox">
                <button className="NavBarButtons">Voir ma candidature</button>
                <button className="NavBarButtons">Se connecter</button>
            </div> 
        </nav>
    
    )
}