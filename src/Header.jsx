import React from "react"
import {useContext, createContext, useState} from "react"
//Part 1 of importing the Context
import { MadLibContext } from "./App"



function Header () {
    //Part 2 of importing the Context
    const randomHero = useContext(MadLibContext)
    // console.log(randomHero.name)
    // console.log(randomHero.image)
   
    

return(

<>
{randomHero ? (
    <>
    <h1>{randomHero.name}</h1>
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