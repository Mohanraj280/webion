import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import './learningHub.css';

import AdminForm from './Adminform.jsx';
import Landing from './landingpage.jsx';

const LearnHubLanding = () => {
  return (

        <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/admin" element={<AdminForm />} />
      </Routes>
    </Router>
      
  );
};

export default LearnHubLanding;
