import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function AdminPageCentre(){

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [centre,setCentre]=useState([])
    const{
            register,
            formState:{error},
            handleSubmit,
    }=useForm()

    useEffect(()=>{
        
        axios.post(`/api/adminCentreGet?page=${currentPage}`)
            .then(response => {
                setCentre(response.data.data); 
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
            axios.post('/api/adminCentreAjouter',{
                ville:data.ville,
                
            })
            .then(response => {
                axios.post(`/api/adminCentreGet?page=${currentPage}`)
                .then(response => {
                    setCentre(response.data.data); 
                    setTotalPages(response.data.last_page);     
                })
                .catch(error => console.log(error));
    
            })
            .catch(error=>console.log(error))
        }
    const Delete=(Ville)=>{
            axios.post('/api/adminCentreDelete',{Ville:Ville})
                .then(response => {
                    axios.post(`/api/adminCentreGet?page=${currentPage}`)
                        .then(response => {
                            setCentre(response.data.data); 
                            setTotalPages(response.data.last_page);     
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
    }
    return(
        <>
            <form action="" className="AdminFormConcours" onSubmit={handleSubmit(submit)}>
                
                <input type="text" placeholder="Ville" className="Inputs" {...register('ville')}/>
                <button class="btn btn-primary">Ajouter</button>
            </form>
            <div className="AdminTableButtons">
                <table>
                                <thead>
                                    <tr>
                                        <th>ville</th>
                                        <th className="DeleteTh" >Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        centre.map((v,k)=>(
                                            <tr>
                                                <td>{v.ville}</td>
                                                <td ><button  class="btn btn-primary" onClick={()=>Delete(v.ville)}>Delete</button></td>
                                                
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