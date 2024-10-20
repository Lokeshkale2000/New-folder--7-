import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Registration from './pages/registration/Registration'
import Workpages from './pages/workpages/Workpages';
import Board from './components/board/Board'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Registration />}/>
        <Route path="/workpage" element={<Workpages />}/>
        <Route path="/board/:_id" element={<Board />} />
      </Routes>
    </Router>
  );
};

export default App;