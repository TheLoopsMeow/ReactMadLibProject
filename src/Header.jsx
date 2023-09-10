import React from "react"
import {useContext, createContext, useState} from "react"
//Part 1 of importing the Context
import {MadLibContext } from "./App"



function Header () {
    //Part 2 of importing the Context
    const currentHero = useContext(MadLibContext)
   
    

return(

<>

</>
)

}

export default Header