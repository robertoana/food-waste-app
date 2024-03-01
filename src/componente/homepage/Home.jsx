import React from "react";
import './Home.css';
import { SiJusteat } from "react-icons/si";
import Navbar from "../Navbar";


const Home=() =>{
   return (
  <>
    <Navbar/>
    <div className="home">
      <span className="icon"><SiJusteat size="100px" /></span>
        <h1 className="titlu">FOODWASTE</h1>
        <p>Bine ați venit în locul unde fiecare farfurie contează!</p>
        <p>Alăturați-vă FOODWASTE astăzi să transformăm surplusul alimentar în suport comunitar. </p>
    </div>
  </>
   )
}

export default Home;