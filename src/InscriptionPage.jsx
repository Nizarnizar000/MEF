import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import useBase64 from "./hooks/useBase64";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function InscriptionPage({ ConcoursName }) {
  const MAX_FILE_SIZE = 3 * 1024 * 1024;
  const formValidation = z.object({
    nom: z.string().min(3).max(10),
    prenom: z.string().min(3).max(10),
    cin: z.string().regex(/^[A-Z]{1,2}\d{5,7}$/, "CIN Invalide"),
    date: z.preprocess(
      // This converts the string input to a Date object
      (arg) => arg ? new Date(arg) : undefined,
      // Then validates it as a date
      z.date({
        required_error: "Date is required",
        invalid_type_error: "Invalid date format",
      })
    ),
    adresse: z.string().min(3),
    niveau_etude: z.enum([
      "Bac",
      "Bac+1",
      "Bac+2",
      "Bac+3",
      "Bac+4",
      "Bac+5",
      "PHD",
    ],{message:"choisir ton niveau d'etude"}),
    email: z.string().email(),
    tel: z.string().regex(/^0(5|6|7)\d{8}$/,"Invalide Numero de telephone"),
    specialite: z.enum(["Informatique", "juridique", "RH", "Marketing"],{message:"choisir ta specialite"}),
    experience: z.string().min(10),
    cv: z
      .any()
      .refine((files) => files?.length > 0, "CV est obligatoire")
      .refine(
        (files) => files[0]?.size <= MAX_FILE_SIZE,
        "Taille maximale ne doit pas depasser 3MB"
      ),
    diplome: z
      .any()
      .refine((files) => files?.length > 0, "Diplome est obligatoire")
      .refine(
        (files) => files[0]?.size <= MAX_FILE_SIZE,
        "Taille maximale ne doit pas depasser 3MB"
      ),
    checkbox:z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions",
    }),
    
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formValidation),
  });

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [candidatExist,setcandidatExist]=useState('')

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);
  
  useEffect(() => {
    if(!ConcoursName){
      navigate('/')
    }
  }, []);

  const { convertFile, error, loading } = useBase64();

  const submit = async (data) => {
    console.log(data);
    
    const baseCV = await convertFile(data.cv[0]);
    const baseDiplome = await convertFile(data.diplome[0]);
    if (!loading && !error) {
      axios
        .post("/api/Candidats", {
          nom: data.nom,
          prenom: data.prenom,
          cin: data.cin,
          date: data.date.toISOString().split("T")[0],
          adresse: data.adresse,
          niveau_etude: data.niveau_etude,
          email: data.email,
          tel: data.tel,
          specialite: data.specialite,
          experience: data.experience,
          cv: baseCV,
          diplome: baseDiplome,
          ConcoursName:ConcoursName
        })
        .then((Response) => navigate("/VoirCandidature"))
        .catch((error)=> navigate("/CandidatureExistante"));
    } 
  };

  return (
    <div className="InscriptionPage">
      <h1>{ConcoursName}</h1>
      <form className="Form" onSubmit={handleSubmit(submit)}>
        <div className="Div">
          <div className="InputsContainer">
            <div>
              <input type="text" placeholder="Nom" {...register("nom")} />
              {errors.nom ? <p className="ValidationParagraph">{errors.nom.message}</p> : ""}
            </div>

            <div>
              <input type="text" placeholder="Prenom" {...register("prenom")} />
              {errors.prenom ? <p className="ValidationParagraph">{errors.prenom.message}</p> : ""}
            </div>
            <div>
              
              <input type="text" placeholder="Cin" {...register("cin")} />
              {errors.cin ? <p className="ValidationParagraph">{errors.cin.message}</p> : ""}
            </div>
          </div>
          <div className="InputsContainer">
            <div>
              <input
                type="date"
                placeholder="Date de naissance"
                className="date"
                name="Date_de_naissance"
                {...register("date")}
              />
              {errors.date ? <p className="ValidationParagraph">{errors.date.message}</p> : ""}
            </div>
            <div>
              <input type="text" placeholder="Adresse" {...register("adresse")} />
              {errors.adresse? <p className="ValidationParagraph">{errors.adresse.message}</p> : ""}
            </div>
            <select {...register("niveau_etude")}>
              <option value="">Niveau d'etudes</option>
              <option value="Bac">Bac</option>
              <option value="Bac+1">Bac+1</option>
              <option value="Bac+2">Bac+2</option>
              <option value="Bac+3">Bac+3</option>
              <option value="Bac+4">Bac+4</option>
              <option value="Bac+5">Bac+5</option>
              <option value="PHD">PHD</option>
            </select>
            {errors.niveau_etude ? <p className="ValidationParagraph">{errors.niveau_etude.message}</p> : ""}
          </div>
          <div className="InputsContainer">
            <div>
              <input type="text" placeholder="Email" {...register("email")} />
              {errors.email ? <p className="ValidationParagraph">{errors.email.message}</p> : ""}
            </div>
            <div>
              <input
                type="tel"
                placeholder="Numero de telephone"
                {...register("tel")}
              />
              {errors.tel ? <p className="ValidationParagraph">{errors.tel.message}</p> : ""}
            </div>
            <div>
              <select {...register("specialite")}>
                <option value="">Specialite du diplome</option>
                <option value="Informatique">Informatique</option>
                <option value="juridique">juridique</option>
                <option value="RH">RH</option>
                <option value="Marketing">Marketing</option>
              </select>
              {errors.specialite ? <p className="ValidationParagraph">{errors.specialite.message}</p> : ""}
            </div>
          </div>
        </div>
        <div>
          <textarea
            id=""
            className="textarea"
            placeholder="Experience Professionnelle"
            {...register("experience")}
          ></textarea>
          {errors.experience ? <p className="ValidationParagraph">{errors.experience.message}</p> : ""}
        </div>
        <div className="FilesContainer">
          <div className="TelechargementContainer">
            <label className="Telechargement">Téléchargement CV</label>
            <input type="file" className="inputFile" onChange={(e)=>{console.log("dssfgdsf",e);
            }} {...register("cv")} /><br/>
            {errors.cv ? <p className="ValidationParagraph">{errors.cv.message}</p> : ""}
          </div>
          

          <div className="TelechargementContainer">
            <label className="Telechargement">Téléchargement Diplome</label>
            <input type="file" className="inputFile" {...register("diplome")} /><br/>
            {errors.diplome ? <p className="ValidationParagraph">{errors.diplome.message}</p> : ""}
          </div>
          

        </div>
        <div>
          <input type="checkbox" {...register("checkbox")} />
          <label htmlFor="">J'ai lu et accepte les conditions generales</label><br />
          {errors.checkbox ? <p className="ValidationParagraph">{errors.checkbox.message}</p> : ""}
        </div>
        <button type="submit" class="btn btn-primary">Postuler</button>

      </form>
    </div>
  );
}
