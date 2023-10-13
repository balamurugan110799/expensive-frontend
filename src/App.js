import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Pages/DashBoard';
import Importance from './Pages/Importance';
import "./Components/CSS/style.css"
import ExtraExpensive from './Pages/ExtraExpensive';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import Gold from './Pages/Gold/Gold';
import CreateYear from './Pages/Expensive/CreateYear';
import EsitmatePayment from './Pages/House/esitmatePayment';
import Estimate from './Pages/House/Estimate';
import AmountEntry from './Pages/Expensive/AmountEntry';
import Income from './Pages/House/Admin/Income';
import Expensive from './Pages/Expensive/Expensive';

function App() {

  const auth = sessionStorage.getItem("auth")
  const user = sessionStorage.getItem("role")
  const admin = sessionStorage.getItem("role")
  const superadmin = sessionStorage.getItem("role")


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          {sessionStorage.auth !== null && sessionStorage.auth !== undefined && user === "user" ?
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/importance" element={<Importance />} />
              <Route path="/extra-expensive" element={<ExtraExpensive />} />
              <Route path="/create-year" element={<CreateYear />} />
              <Route path="/amount-entry" element={<AmountEntry />} />

            </>
            :
            <>
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          }


          {sessionStorage.auth !== null && sessionStorage.auth !== undefined && admin === "admin" ?
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/extra-expensive" element={<ExtraExpensive />} />
              <Route path="/importance" element={<Importance />} />
              <Route path="/esitmate-payment" element={<EsitmatePayment />} />
              <Route path="/esitmate" element={<Estimate />} />



              <Route path="/create-year" element={<CreateYear />} />
            </>
            :
            <>
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          }



          {sessionStorage.auth !== null && sessionStorage.auth !== undefined && superadmin === "super-admin" ?
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/extra-expensive" element={<ExtraExpensive />} />
              <Route path="/importance" element={<Importance />} />
              <Route path="/gold" element={<Gold />} />
              <Route path="/amount-entry" element={<AmountEntry />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expensive" element={<Expensive />} />



            </>
            :
            <>
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          }

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;