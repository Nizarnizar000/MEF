import { useState } from "react";
import Logo from "./assets/Mef-maroc.png"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function NavBar({Boolean,setBoolean}){

    const navigate=useNavigate()
    const submit=(event)=>{
        event.preventDefault()
        axios.post('/api/Log_out')
        .then(Response=>{
            localStorage.clear();
            setBoolean(true)
            navigate('/Log_In')
        })
        .catch(error=>console.log('ther is an error'))
    }
   
    return(
        <nav className="NavBar">
            <div className="NavBarButtonsBox">
                <Link to={'/VoirCandidat'}><button className="NavBarButtons" class="btn btn-primary">Voir ma candidature</button></Link>
                {
                    Boolean==true?<Link to={'/Log_In'}><button className="NavBarButtons" class="btn btn-primary">Se connecter</button></Link>
                    :
                    <form action="" onSubmit={submit}>
                        <button  class="btn btn-primary">Se deconnecter</button>
                    </form>
                }
                
            </div> 
        </nav>
    
    )
}