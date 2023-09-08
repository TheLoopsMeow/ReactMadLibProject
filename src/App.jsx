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
  
useEffect(()=>{
  fetch(`http://localhost:3000/heros`)
  .then((r)=> r.json())
      .then((heros) => {
          heros.forEach((eachHero)=>{
             let tempArray = []
             tempArray.push(eachHero)
             console.log(tempArray)
             console.log(tempArray.length)
        
      //End forEach for each hero
  })
  //End second .then
})

}, [])


  return (
    <>
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
