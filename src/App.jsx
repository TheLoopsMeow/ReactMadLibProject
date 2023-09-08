import { useState, useEffect, useContext, createContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Router, Routes, Route, Link } from "react-router-dom"
import Header from "./Header"
import MadLib from "./MadLib"

function App() {
  const MadLibString = createContext([])
  const [currentBioArray, setMadLibArray] = useState([])
  
//Save JSON hero data to array "currentBioArray"
useEffect(()=>{
  fetch(`http://localhost:3000/heros`)
  .then((r)=> r.json())
      .then((heros) => {
        let tempArray = new Array()
             for(let i = 0; i < heros.length; i++) {
             tempArray.push(heros[i])
            }
      setMadLibArray(tempArray) 
})

}, [])


  return (
    <>
      {/* Will use router after starting the program to save mad libs */}
      <MadLibString.Provider value={{currentBioArray, setMadLibArray}}>
        <Header />
        <br></br>
        <MadLib />
        <br></br>
        <button >Try another!</button>
      </MadLibString.Provider>
    </>
  )
}

export default App
