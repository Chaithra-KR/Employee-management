import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Route,Routes} from 'react-router-dom';
import propTypes from 'prop-types';
import Welcome from '../Components/Welcome';
import AdminDashboard from '../Components/AdminDashboard';
import AddEmploy from '../Components/AddEmploy';
import EditDetails from '../Components/EditDetails';


function ErrorFallback({error, resetErrorBoundary}) {
    return(
      <div>
        <h2 className='text-black'>Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }
  ErrorFallback.propTypes = {
    error: propTypes.object.isRequired,
    resetErrorBoundary: propTypes.func.isRequired
  }


const admin = () => {
  return (
    <>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        
      <Routes>

        <Route path='/' element={<Welcome/>}/>

        <Route path='/dashboard' element={<AdminDashboard/>}/>

        <Route path='/add-employee' element={<AddEmploy/>}/>

        <Route path='/edit-employeeDetails' element={<EditDetails/>}/>

      </Routes>

    </ErrorBoundary>
  </>
  );
}

export default admin;
