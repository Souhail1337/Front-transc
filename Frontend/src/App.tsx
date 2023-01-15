import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Addfriend from "./pages/Addfriend"
import SketchPong from "./components/My_sketch";
import Spectator from "./components/spectator_mod";
import Login from "./pages/login";

import './index'

function App() {
  return (
  <>
   
      <Routes>
        <Route path="/" element={<Dashboard />} >
        <Route index element={<Home />} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/settings' element={<Settings/>} />
        <Route path='/Addfriend' element={<Addfriend/>} />
        <Route path='/game' element={<SketchPong/>} />
        <Route path='/watch/*' element={<Spectator/>} />
        <Route path='/login' element={<Login/>} />
       </Route>
      </Routes>
    </>
  );  

}
  
 export default App;

