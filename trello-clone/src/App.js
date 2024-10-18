import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Workpages from './pages/workpages/Workpages';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Registration />}/>
        <Route path="/workpage" element={<Workpages />}/>
      </Routes>
    </Router>
  );
};

export default App;