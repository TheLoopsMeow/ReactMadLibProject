import React from "react"
import './App.css'
import {useContext, createContext, useState} from "react"
//Part 1 of importing the Context
import { MadLibContext } from "./App"



function Header () {
    //Part 2 of importing the Context
    const {randomHero, madLibString} = useContext(MadLibContext)
  
   
return(

<>
{randomHero ? (
    <>
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