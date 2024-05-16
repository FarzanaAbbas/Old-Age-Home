import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Homepage from './pages/Homepage/Homepage'
import PatientDashboard from './components/dashboard/Patient/PatientDashboard'
import VisitorDashboard from './components/dashboard/Visitor/VisitorDashboard'
import DoctorDashboard from './components/dashboard/Doctor/DoctorDashboard'
import MedicineDashboard from './components/dashboard/Medicine/MedicineDashboard'
import './App.css'

export default function App() {
  return (
    //fragments
    <>
      {/* grouping all the routes */}
      <Routes>
        <Route path='/' element={< Register />} />
        <Route path='/login' element={< Login />} />
        <Route path='/home' element={< Homepage />} />
        <Route path='/patients' element={< PatientDashboard />} />
        <Route path='/doctors' element={< DoctorDashboard />} />
        <Route path='/medicines' element={< MedicineDashboard />} />
        <Route path='/visitors' element={< VisitorDashboard />} />

      </Routes>
    </>
  )
}
