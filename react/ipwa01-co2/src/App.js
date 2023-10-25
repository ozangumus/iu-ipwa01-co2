import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBarComp from "./components/NavBarComp";
import Content from './components/Content';
import Footer from "./components/Footer";
import { Nav } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Laender from "./components/Laender";
import Unternehmen from "./components/Unternehmen";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <NavBarComp />
                <Routes>
                    <Route path="/" element={<Content />} />
                    <Route path="/länder" element={<Laender />} />
                    <Route path="/unternehmen" element={<Unternehmen />} />
                </Routes>
            </div>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;