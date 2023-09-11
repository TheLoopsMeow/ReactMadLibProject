import React from "react"
import './App.css'
import {useContext, createContext, useState} from "react"
//Part 1 of importing the Context
import { MadLibContext } from "./App"



function Header () {
    //Part 2 of importing the Context
    const {randomHero, madLibString} = useContext(MadLibContext)
    const [flash, setFlash] = useState("title")

   setInterval(()=>{
    if(flash === "title"){
        setFlash("titleFlash")
    }
    else {
        setFlash("title")
    }
   }, 2000)
return(

<>
{randomHero ? (
    <>
    <span id="title">S</span><span id={flash}>u</span><span id="title">pe</span><span id={flash}>r</span><span id="title">hero</span><span id={flash}>Mad</span><span id="title"> Libs</span>
    <h1 id="name">{randomHero.name}</h1>
    <img src={randomHero.image}></img>
    </>

) : (
    <p>Loading...</p>
)
}
</>
)

}

export default Header