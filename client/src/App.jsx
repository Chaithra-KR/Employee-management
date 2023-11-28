import React,{Fragment} from 'react';
import {BrowserRouter as Router , Route , Routes} from 'react-router-dom';
import Admin from './Router/Admin'
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <Fragment>
      <Toaster/>
      <Router>
        
        <Routes>
          <Route path='/*' element={<Admin/>}/>
        </Routes>

      </Router>
      
    </Fragment>
  );
}

export default App;
