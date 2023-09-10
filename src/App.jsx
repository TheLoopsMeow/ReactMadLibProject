import { useState, useEffect, useContext, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Router, Routes, Route, Link } from "react-router-dom"
import Header from "./Header"
import MadLib from "./MadLib"

export const MadLibContext = createContext()

function App() {
  const [currentBioArray, setMadLibArray] = useState([])
  
//Save JSON hero data to array "currentBioArray"
useEffect(()=>{
  fetch(`http://localhost:3000/heros`)
  .then((r)=> r.json())
      .then((heros) => {
      setMadLibArray(heros) 
})

}, [])


  return (
    <>
      {/* Will use router after starting the program to save mad libs */}
      <MadLibContext.Provider value={currentBioArray}>
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
