import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CandidatTable from "./pages/Candidat/CandidatTable";

export default function VoirCandidat() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [data, setData] = useState('')
    const [catchError, setcatchError] = useState('')
    const submit = (data) => {
        axios.post('/api/ChercherCandidat', { numeroUnique: data.numeroUnique })
            .then(Response => setData(Response.data), setcatchError(''))
            .catch(errors => setcatchError(errors.response.data.message), setData(''))
    }
    return (
        <>
            <form className="chercherForm" onSubmit={handleSubmit(submit)}>
                <Link to="/">retourner a la page des concours</Link>
                <input type="text" placeholder="Chercher Via un numero unique" className="Inputs" {...register("numeroUnique")} />
                <button class="btn btn-primary">Chercher</button>
                <div className="tableCandidatDiv">
                    {/* {data && !catchError? */}<table border={1}>
                        <thead>
                            <tr>
                                <th className="th">nom</th>
                                <th className="th">prenom</th>
                                <th className="th">Email</th>
                                <th className="th">Cin</th>
                                <th className="th">Accepté ou Refusé</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{data.Nom}</td>
                                <td>{data.Prenom}</td>
                                <td>{data.Email}</td>
                                <td>{data.Cin}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>{/* :<p>{catchError}</p>} */}

                </div>
            </form>
            <div className="container mx-auto py-10">
                <CandidatTable data={[{nom:"testN", prenom:"testP", email:"test@gmail.com", cin:"AD323281", status:true}]} />
            </div>
                
        </>
    )
}