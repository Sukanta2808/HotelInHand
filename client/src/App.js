import './App.css';
import React from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Adminscreen from './screens/Adminscreen';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';
import LandingPage from './screens/LandingPage';

function App() {
  return (
    <div className="App">
       <Navbar />
       <React.StrictMode>  
       <BrowserRouter>
       <Routes>
       <Route path='/' exact Component={LandingPage} />
       <Route path='/home' exact Component={Homescreen} />
       <Route path='/book/:roomid/:fromdate/:todate' exact Component={Bookingscreen} />
       <Route path='/login' exact Component={Loginscreen} />
       <Route path='/register' exact Component={Registerscreen} />
       <Route path='/admin' exact Component={Adminscreen} />
       <Route path='/profile' exact Component={Profilescreen} />
       </Routes>
       </BrowserRouter>
       </React.StrictMode>  
    </div>
  );
}

export default App;
