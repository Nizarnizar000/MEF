import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function AdminPageConcours(){

    const [concours,setConcours]=useState([])
    const [centres,setCentres]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const {
        register,
        formState:{error},
        handleSubmit,
    }=useForm()
    
    useEffect(()=>{
        
        axios.post(`/api/adminConcours?page=${currentPage}`)
            .then(response => {                
                setConcours(response.data.data); 
                setTotalPages(response.data.last_page);     
            })
            .catch(error => console.log(error));

    },[currentPage])

    

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1); // Go to previous page
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1); // Go to next page
        }
    };

    const submit=(data)=>{
        console.log(data);
        
        axios.post('/api/adminConcoursAjouter',{
            nom:data.nom,
            specialite:data.specialite,
            centre:data.centre,
            date_fin:data.date_fin
        })
        .then(response => {
            axios.post(`/api/adminConcours?page=${currentPage}`)
            .then(response => {
                setConcours(response.data.data); 
                setTotalPages(response.data.last_page);     
            })
            .catch(error => console.log(error));

        })
        .catch(error=>console.log(error))
    }

    useEffect(()=>{
        axios.get('/api/adminCentreGet')
        .then(response=>setCentres(response.data)
        )
    },[])
    const Delete=(id)=>{
        axios.post('/api/adminConcoursDelete',{id:id})
            .then(response => {
                axios.post(`/api/adminConcours?page=${currentPage}`)
                    .then(response => {
                        setConcours(response.data.data); 
                        setTotalPages(response.data.last_page);     
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }
    return(
        <>
            <form action="" className="AdminFormConcours" onSubmit={handleSubmit(submit)}>
                <input type="text" placeholder="Nom du concours" className="Inputs" {...register('nom')}/>
                <select name="" id=""  className="Inputs" {...register('specialite')}>
                    <option value="">specialite du concours</option>
                    <option value="informatique">informatique</option>
                    <option value="juridique">juridique</option>
                    <option value="RH">RH</option>
                    <option value="marketing">marketing</option>
                </select>
                <select name="" id=""  className="Inputs" {...register("centre")}>
                    <option value="">centre d'examen du concours</option>
                    {
                        centres.map((v,k)=>(
                            <option value={v.ville}>{v.ville}</option>
                        ))
                    }
                </select>
                <input type="date" placeholder="Date de fin" className="Inputs" {...register('date_fin')}/>
                <button class="btn btn-primary">Ajouter</button>
            </form>
            <div className="AdminTableButtons">
                <table>
                                <thead>
                                    <tr>
                                        <th>libelle</th>
                                        <th>date-debut</th>
                                        <th>date-fin</th>
                                        <th>specialite</th>
                                        <th>centre_ville</th>
                                        <th className="DeleteTh" >Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        concours.map((v,k)=>(
                                            <tr>
                                                <td>{v.libelle}</td>
                                                <td>{v['date-debut']}</td>
                                                <td>{v['date-fin']}</td>
                                                <td>{v.specialite}</td>
                                                <td>{v.centre_name}</td>
                                                <td><button  class="btn btn-primary" onClick={()=>Delete(v.id)}>Delete</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                </table>
                <div>
                    <button onClick={handlePrevious} disabled={currentPage === 1} class="btn btn-primary">
                            Previous
                    </button>
                    <button onClick={handleNext} disabled={currentPage === totalPages} class="btn btn-primary">
                            Next
                    </button>
                </div>
                <div>
                        <div className="config_buttons">
                            <Link to={'/AdminPageConcours'}><button class="btn btn-primary">Config Concours</button></Link>
                            <button class="btn btn-primary">gestion Utulisateur</button>
                            <Link to={'/AdminPageCentre'}><button class="btn btn-primary">config Centre</button></Link>
                            <Link to={'/AdminPageCandidature'}><button class="btn btn-primary"> voir candidature</button></Link>
                         </div>
                
                </div>
            </div>
        </>
    )
}