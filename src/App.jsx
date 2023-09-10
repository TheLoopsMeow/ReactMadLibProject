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
  const [currentHero, setHero] = useState([])
  
  
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

if (finishedLoading) {
  let randomHero = rando(currentHero)
  console.log(randomHero.name)
  console.log(randomHero.image)
}

  return (
    <>
      {/* Will use router for code to save user generated mad lib */}
      <MadLibContext.Provider value={currentHero}>
        <Header />
        <br></br>
        <MadLib />
        <br></br>
        <button >Try another!</button>
      </MadLibContext.Provider>
    </>
  )
}

export default App
