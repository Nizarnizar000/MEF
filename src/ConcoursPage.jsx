import axios from "axios";
import { useState , useEffect } from "react";
import { Link } from "react-router-dom";

export default function ConcoursPage({SetConcoursName}){
    const Specialite=['Choisir la specialite du Concours','informatique','juridique','RH','marketing']
    const [Concours,setConcours]=useState([])
    const selectchange=(value)=>{
      axios.post('/api/concours', { value: value }).then((res)=>{
          setConcours(res.data)
      })
    }
    const SetConcours=(value)=>{
      SetConcoursName(value)
    }
    useEffect(()=>{

      selectchange('Choisir la specialite du Concours')
  
    },[])
    return(
      <div className="ConcoursSelectDiv">
        <select name="" id=""  onChange={(e)=>selectchange(e.target.value)} className="Select" >
            {Specialite.map((v,k)=>(
              <>
                <option value={v} key={k}>{v}</option>
              </>
            ))}
            
        </select>
        <div className="Concours_div">
          {Concours.map((v,k)=>(
                <Link to={"/Inscription"} className="ConcoursLink" >
                  <div key={k}  onClick={()=>SetConcours(v.libelle)} >{v.libelle}</div>  
                </Link>         
                       
          ))}
        </div>
      </div>
    )
}