import axios from "axios";
import { useState , useEffect } from "react";

export default function ConcoursPage(){
    const Specialite=['Choisir la specialite du Concours','informatique','juridique','RH','marketing']
    const [Concours,setConcours]=useState([])
    const selectchange=(value)=>{
      axios.post('/api/concours', { value: value }).then((res)=>{
          setConcours(res.data)
      })
    }
    useEffect(()=>{

      selectchange('Choisir la specialite du Concours')
  
    },[])
    return(
      <div className="ConcoursSelectDiv">
        <select name="" id=""  onChange={(e)=>selectchange(e.target.value)} className="Select">
            {Specialite.map((v,k)=>(
              <>
                <option value={v} key={k}>{v}</option>
              </>
            ))}
            
        </select>
        <div className="Concours_div">
          {Concours.map((v,k)=>(         
                <button key={k} className="Concours">{v.libelle}</button>         
          ))}
        </div>
      </div>
    )
}