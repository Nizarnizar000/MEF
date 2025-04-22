import axios from "axios"
import { set, useForm } from "react-hook-form"
import { Link, Navigate, useNavigate } from "react-router-dom"
export default function Log_In_Page({setBoolean}){

    const {
        register,
        formState:{errors},
        handleSubmit
    }=useForm()
    const navigate=useNavigate()

    const submit=(data)=>{
        axios.post('/api/Log_in',
            {
                email:data.email,
                password:data.password
            }
        )
        .then(Response=>{
            localStorage.setItem('user_id', Response.data.user_id);
            setBoolean(false)
            navigate('/AdminPageCandidature') 
        })
        .catch(error=>console.log(error))
    }

    return(
            <div className="Auth_Page" >
                <form className="Auth_Div" onSubmit={handleSubmit(submit)}>
                    <input type="text" placeholder="Enter Your Email" className="Auth_Input" {...register('email')}/><br />
                    <input type="text" placeholder="Enter Your Password" className="Auth_Input" {...register('password')}/><br />
                    <button className="Auth_button">Se connecter</button>
                    <Link to={'/'}>retourner a la page des concours</Link>
                </form>
            </div>   
        
    )
}