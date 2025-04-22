import axios from "axios"
import { useEffect , useState} from "react"
import { Link, useNavigate } from "react-router-dom"

export default function AdminPageCandidature({setAccepterouRefuser}){
    const [candidat,setCandidat]=useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [select,setSelect]=useState([])
    const [Chosenselect,setChosenSelect]=useState([])
    useEffect(()=>{
        
        axios.post(`/api/adminCandidature?page=${currentPage}`,{Cin:Chosenselect})
            .then(response => {
                setCandidat(response.data.data); // Set the current page's data
                setTotalPages(response.data.last_page); // Set total pages
            })
            .catch(error => console.log(error));

    },[currentPage,Chosenselect])

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

    useEffect(()=>{
        
        axios.get(`/api/adminCandidatureCin`)
            .then(response => {
                setSelect(response.data);
                
            })
            .catch(error => console.log(error));

    },[])

    const change=(data)=>{
        setChosenSelect(data)
    }

    const Delete=(Cin)=>{
        axios.post('/api/adminCandidatureDelete',{Cin:Cin})
            .then(response => {
                axios.post(`/api/adminCandidature?page=${currentPage}`,{Cin:Chosenselect})
                    .then(response => {
                        setCandidat(response.data.data); // Set the current page's data
                        setTotalPages(response.data.last_page); // Set total pages
                })
                .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    }

    const Accepter=()=>{
        setAccepterouRefuser('Accepter')
    }
    return(
        <div>
            <div className="AdminTableButtons">
                <select name="" id="" className="Inputs" onChange={event=>change(event.target.value)}>
                    <option value="">Choisir un Cin</option>
                    {
                        select.map((v,k)=>(
                            <>
                                <option value={v.Cin}>{v.Cin}</option>
                            </>
                        ))
                    }
                    
                </select>
                { <div>
                    {
                        <table>
                            <thead>
                                <tr>
                                    <th>Prenom</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Cin</th>
                                    <th>Adresse</th>
                                    <th>Numero de telephone</th>
                                    <th>date_de_naissance</th>
                                    <th>Experience Professionnelle</th>
                                    <th>Accepter</th>
                                    <th>Refuser</th>
                                    <th className="DeleteTh">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    candidat.map((v,k)=>(
                                        <tr>
                                            <td>{v.Prenom}</td>
                                            <td>{v.Nom}</td>
                                            <td>{v.Email}</td>
                                            <td>{v.Cin}</td>
                                            <td>{v.Adresse}</td>
                                            <td>{v["Numero de telephone"]}</td>
                                            <td>{v.date_de_naissance}</td>
                                            <td>{v["Experience Professionnelle"]}</td>
                                            <td><button  class="btn btn-primary" onClick={Accepter(v.Cin)}>Accepter</button></td>
                                            <td><button  class="btn btn-primary">Refuser</button></td>
                                            <td><button  class="btn btn-primary" onClick={()=>Delete(v.Cin)}>Delete</button></td>                                            
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
            
                    }
                </div> }
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
            
        </div>
    )
}