import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ChatInterface from '../components/ChatInterface';
import LoginPage from '../components/Pages/LoginPage';
import HomePage from '../components/Pages/HomePage';
import SignupPage from '../components/Pages/SignupPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/Login' element={<LoginPage/>} />
        <Route path='/Signup' element={<SignupPage/>} />
        <Route path='/Chat' element={<ChatInterface/>} />
      </Routes>
    </Router>
  );
}
