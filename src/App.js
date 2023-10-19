import "./App.css";
import React, { useState } from "react";
import NavBar from "./Components/NavBar";
import News from "./Components/News";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const [progress,setProgress] = useState(0)
  
    return (
      <div>
        <BrowserRouter>
          <NavBar />
          <LoadingBar
            color='#f11946'
            progress={progress}
          />
          <Routes>
            {/* Below we need to use unique for every element in order to mount/render the component after clicking on that category */}
            <Route path="/general" element={<News setProgress={setProgress} key="general" pageSize={8} country="in" category="general" />}></Route>
            <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={8} country="in" category="entertainment" />}></Route>
            <Route path="/business" element={<News setProgress={setProgress} key="business" pageSize={8} country="in" category="business" />}></Route>
            <Route path="/" element={<News setProgress={setProgress} key="general" pageSize={8} country="in" category="general" />}></Route>
            <Route path="/health" element={<News setProgress={setProgress} key="health" pageSize={8} country="in" category="health" />}></Route>
            <Route path="/science" element={<News setProgress={setProgress} key="science" pageSize={8} country="in" category="science" />}></Route>
            <Route path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={8} country="in" category="sports" />}></Route>
            <Route path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={8} country="in" category="technology" />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App
