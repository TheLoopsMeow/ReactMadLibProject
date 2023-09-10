import React from "react"
import {useContext, createContext, useState} from "react"
//Part 1 of importing the Context
import {MadLibContext } from "./App"

//This function chooses a random hero.
function rando (array){
    let randomNumber = Math.floor(Math.random() * 9)
    return array[randomNumber]
}

function Header () {
    //Part 2 of importing the Context
    const currentBioArray = useContext(MadLibContext)
    let randomHero = rando(currentBioArray)
    console.log(randomHero)
    // console.log(randomHero.name)
    // console.log(randomHero.image)

return(

<>
{/* <p>{randomHero.name}</p>
<img src={randomHero.image}></img> */}
</>
)

}

export default Header