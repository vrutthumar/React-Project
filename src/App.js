import logo from './logo.svg';
import './App.css';
import '../src/Components/Css/style.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createContext, useEffect, useState } from 'react';
import Dashboard from './Components/Pages/Dashboard';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import MyProfile from './Components/Pages/MyProfile';
import { useDispatch } from 'react-redux';
import RecentActivities from './Components/Pages/RecentActivities';
import AllProject from './Components/Pages/AllProject';
import AllProfiles from './Components/Pages/AllProfiles';
import { callApi } from './Components/Pages/redux/action/action';

export let loginContext = createContext()

function App() {
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("isLogin")))
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(callApi())
  }, [])
 
  return (

    <>
      <loginContext.Provider value={{ login, setLogin }}>
        <BrowserRouter>
          <Routes>

            {
              login == true
                ?
                <>
                  <Route path='/' element={<Navigate to="/dashboard" />} />
                  <Route path='/dashboard' element={<Dashboard />} />
                  <Route path='/myProfile' element={<MyProfile />} />
                  <Route path='/AllProject' element={<AllProject />} />
                  <Route path='/AllProfiles' element={<AllProfiles />} />
                  <Route path='/RecentActivities' element={<RecentActivities />} />
                
                </>
                :
                <>
                  <Route path='/' element={<Navigate to="/login" />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />

                </>
            }
            <Route path='*' element={<Navigate to="/" />} />

          </Routes>
        </BrowserRouter>
      </loginContext.Provider>
    </>
  );
}

export default App;
