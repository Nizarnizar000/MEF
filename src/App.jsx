import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState } from 'react'
import NavBar from './NavBar'
import ConcoursPage from './ConcoursPage'
import { Route,Routes,Router, BrowserRouter } from 'react-router-dom'
import InscriptionPage from './InscriptionPage'
/* import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; */
import VoirCandidature from './VoirCandidature'
import VoirCandidat from './VoirCandidat'
import CandidatureExistante from './CandidatureExistante'
import Log_In_Page from './Log_In_Page'
import PrivateRoute from './Private_route'
import AdminPageConcours from './AdminPageConcours'
import AdminPageCandidature from './AdminPageCandidature'
import AdminPageCentre from './AdminPageCentre'
import Login from './pages/Login'
export default function App() {
  const [ConcoursName,SetConcoursName]=useState(null)
  const [Boolean,setBoolean]=useState(true)
  const [AccepterouRefuser,setAccepterouRefuser]=useState(null)
  return (
    <>
      <BrowserRouter>
        {/* <NavBar Boolean={Boolean} setBoolean={setBoolean}/> */}
        <Routes>
          <Route path="/" element={<ConcoursPage SetConcoursName={SetConcoursName}/>}/>
          <Route path="/Inscription" element={<InscriptionPage ConcoursName={ConcoursName}/>}/>
          <Route path="/VoirCandidature" element={<VoirCandidature/>}/>
          <Route path="/VoirCandidat" element={<VoirCandidat/>}/>
          <Route path='/CandidatureExistante' element={<CandidatureExistante/>}/>
          <Route path='/Log_In' element={<Log_In_Page setBoolean={setBoolean}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path='/AdminPageCandidature' element={
            <PrivateRoute><AdminPageCandidature setAccepterouRefuser={setAccepterouRefuser}/></PrivateRoute>
            }/>
          <Route path='/AdminPageConcours' element={
            <PrivateRoute><AdminPageConcours /></PrivateRoute>
            }/>
          <Route path='/AdminPageCentre' element={
            <PrivateRoute><AdminPageCentre/></PrivateRoute>
            }/>
        </Routes>

      </BrowserRouter>
      
    </>
  )
}


