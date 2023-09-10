import React from "react"
import {useContext, createContext, useState} from "react"
import {MadLibContext } from "./App"


function MadLib () {
    const {randomHero, madLibString} = useContext(MadLibContext)

return(
    <>
    <div id="madLibElement">
    {madLibString ? (
        <>
        {madLibString}
        </>

    ) : (
        <>
        <p>Loading...</p>
        </>
    )
    }
    </div>
    </>
)
}

export default MadLib