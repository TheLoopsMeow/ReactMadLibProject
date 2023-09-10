import { useState, useEffect, useContext, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Router, Routes, Route, Link } from "react-router-dom"
import Header from "./Header"
import MadLib from "./MadLib"

export const MadLibContext = createContext()

  //This function chooses a random hero.
  function rando (array){
    let randomNumber = Math.floor(Math.random() * 9)
    return array[randomNumber]
  }

  let finishedLoading = false

function App() {
  //json data, each hero, is assigned to loadedHeros
  const [loadedHeros, setHero] = useState([])
  //One of the heros is picked at random and set to randomHero
  const [randomHero, setRandomHero] = useState()
  //The random her's randomHero.bio is parsed to a mad lib string.
  const [madLibString, setMadLibString] = useState()
  
  
//Save JSON hero data to array "currentBioArray"
useEffect(()=>{
  fetch(`http://localhost:3000/heros`)
  .then((r)=> r.json())
      .then((heros) => {
      setHero(heros) 
      finishedLoading = true
})
        .catch((error)=>{
          console.error("Error while fetching data: " + error)
        })

}, [])

//initial shuffle function must be called in useEffect
  useEffect(()=>{
    if (finishedLoading) {
      shuffle()
    }
  }, [finishedLoading, randomHero])

//Set the Random Hero to work with.
function shuffle() {
  let pickRandomHero = rando(loadedHeros)
  setRandomHero(pickRandomHero)
  finishedLoading = false
}

  //Calculate random true or false based on length of string
  function  calculateRandom(){
  //The chances of a word being replaced should be 1 in 15 for an aimicable user experience.
      let randomNumber = Math.floor(Math.random() * 11)
      if(randomNumber === 1){
      return true
      }
      else {
      return false
      }
  }

  //Removes a word at random, inserts user input field.
  function createMadLib (tempString) {
    let newArray = tempString.split(" ")
    const keyWord = "keyWord"
    const subBody = document.createElement("div")
    // body.appendChild(subBody)
    
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

    setMadLibString(newArray.slice())

    for(let i = 0; i < newArray.length; i++){
        newArray[i] = ""
    }
}

//Log current Hero loaded.
useEffect (()=>{
if(randomHero){
  console.log(randomHero.name)
  console.log(randomHero.image)
  console.log(randomHero.bio)
  createMadLib(randomHero.bio)

}
}, [randomHero])
console.log(madLibString)


  return (
    <>
      {/* Will use router for code to save user generated mad lib */}
      <MadLibContext.Provider value={{randomHero, madLibString}}>
        <Header />
        <br></br>
        <MadLib />
        <br></br>
        <button onClick={()=>{shuffle()}}>Try another!</button>
        
      </MadLibContext.Provider>
    </>
  )
}

export default App
