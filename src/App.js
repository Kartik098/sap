import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from './Pages/signup';
import Home from './Pages/Home';
import './home.css'

import IntakeModal from './components/Modals/IntakeModal';


const App = () => {
  return (
    <>
    <Router>
    <img className='logo' src="/images/gshlogo.jpg" />
   <Routes>

    <Route path="/signup" exact element={<Signup />}  />
    <Route path="/add-new-site" exact element={<IntakeModal />}  />
    <Route path="/" exact element={<Home />}  />
    
   </Routes>
      
    
  </Router></>
  )
};


export default App;
