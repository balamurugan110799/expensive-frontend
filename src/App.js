import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Pages/DashBoard';
import Importance from './Pages/Importance';
import "./Components/CSS/style.css"
import ExtraExpensive from './Pages/ExtraExpensive';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';

function App() {
  console.log(sessionStorage.getItem("role"))
  const auth = sessionStorage.getItem("auth")
  const user = sessionStorage.getItem("role")
  const admin = sessionStorage.getItem("role")
  const superadmin = sessionStorage.getItem("role")

  console.log(auth !== undefined || auth !== null, "yeyydgy")
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