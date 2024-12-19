import React from 'react'
import {BrowserRouter, Routes , Route, Navigate} from "react-router-dom";

import Home from "../pages/Home";
import Query from "../pages/Query";

const Router = () => {

  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes >

          <Route exact path="/" element={<Home/>} />
          <Route exact path="/query/:queryNumber" element={<Query/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes >
      </React.Fragment>
    </BrowserRouter>
  );
}

export default Router;
