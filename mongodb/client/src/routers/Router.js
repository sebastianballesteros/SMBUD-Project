import React from 'react'
import {BrowserRouter, Routes , Route} from "react-router-dom";

import Home from "../pages/Home";
import Query1 from "../pages/Query1";

const Router = () => {

  return (
    <BrowserRouter>
      <React.Fragment>   
        <Routes >

          <Route exact path="/" element={<Home/>} />
          <Route exact path="/query1" element={<Query1/>}/>         
          <Route path="*" element={<Home/>}/>       
          
        </Routes >
      </React.Fragment>
    </BrowserRouter>
  );
}
  
export default Router;

