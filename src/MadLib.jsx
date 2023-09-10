import React from "react"
import {useEffect} from "react"
import {useContext, createContext, useState} from "react"
import {MadLibContext } from "./App"


function MadLib () {
    const {randomHero, madLibString} = useContext(MadLibContext)

  //Removes a word at random, inserts user input field.
  function createMadLib (tempString) {
    let newArray = tempString.split(" ")
    const keyWord = "keyWord"
    const subBody = document.createElement("div")
          subBody.id = "subMadLibElement"
    const headerBody = document.getElementById("madLibElement")
    headerBody.appendChild(subBody)
    // body.appendChild(subBody)
    let finalArray = []

    
    for(let i = 0; i < (newArray.length) / 15; i++){
        
        let randomI = Math.floor(Math.random() * newArray.length)
        newArray.splice(randomI, 1, keyWord)
        
        randomI = 0
    }

    let newString = newArray.join(" ")

    for(let i = 0; i < newArray.length; i++) {
        if(newArray[i] === "keyWord") {
            const test = document.createElement("input")
            test.type = "text"
            test.name = "input"
            const inputSpan = document.createElement("span")
            
            subBody.appendChild(inputSpan)
            inputSpan.appendChild(test)
        }
        else {     
            const test = document.createElement("span")
            test.innerText = newArray[i] + " "
            subBody.appendChild(test)
              }
    }

    // setMadLibString(newArray.slice())
    finalArray = newArray.slice()
}

//Call the create MadLib function to initialize the Mad Lib String.  Log current Hero loaded.
useEffect (()=>{
    if(randomHero){
    
      createMadLib(randomHero.bio)
    
    }
    }, [randomHero])

return(
    <>
    <div id="madLibElement">
    </div>
    </>
)
}

export default MadLib