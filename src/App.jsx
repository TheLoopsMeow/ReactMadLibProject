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

//Set the Random Hero to work with.  Both the button, and the intitial useEffect calls this function to "shuffle" and get a new hero.
function shuffle() {
  let pickRandomHero = rando(loadedHeros)
  setRandomHero(pickRandomHero)
  finishedLoading = false

  //This part of the function gets the subMadLibElement that is established later, in the MadLib component, if it has been created, and deletes it when the button is pressed.  
  const deleteMadLib = document.getElementById("subMadLibElement")
  if (deleteMadLib) {
    deleteMadLib.remove()
  }
}

  return (
    <>
      {/* Will use router for code to save user generated mad lib later*/}
      <MadLibContext.Provider value={{randomHero, madLibString}}>
        <Header />
        <br></br>
        <MadLib value={{randomHero, madLibString }}/>
        <br></br>
        <button onClick={()=>{shuffle()}}><span id="pow">POW!  </span><span id="try">Try another!</span></button>
        
      </MadLibContext.Provider>
    </>
  )
}

export default App
