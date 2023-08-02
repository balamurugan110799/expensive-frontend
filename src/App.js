import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/DashBoard';
import Importance from './Pages/Importance';
import "./Components/CSS/style.css"
import ExtraExpensive from './Pages/ExtraExpensive';
import Admin from './Pages/Admin';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/admin" element={<Admin/>} />
        <Route path="/importance" element={<Importance/>} />
        <Route path="/extra-expensive" element={<ExtraExpensive/>} />
        </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;