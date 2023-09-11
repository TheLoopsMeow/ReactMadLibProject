import React from "react"
import './App.css'
import {useState, useEffect, useContext, createContext } from "react"
import {MadLibContext } from "./App"


function MadLib () {

    let biographyArray = []
    let biographyString = ""

    function determinePartOfSpeech(partOfSpeechArray, setDeterminePartOfSpeechLoading) {
        let tempArray = []
        for(let i = 0; i < partOfSpeechArray.length; i++ ) {
            //Using setTimeout to prevent the dictionary API from stopping responses due to too many calls.
          
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${partOfSpeechArray[i]}`)
            .then((r)=>r.json())
            .then((data)=>{
                tempArray.push(data[0].meanings[0].partOfSpeech)
            
                setPartOfSpeechArray([...tempArray])
            }
            )
            .catch((error)=>{return console.log("Error fetching dictionary API: " + error)})
          
            }
    }
    const {randomHero, madLibString} = useContext(MadLibContext)

    //First, this will be set to have the same elements as the words in the hero biography, then it will be changed to contain the corresponding part of speech of each word instead.
    const [partOfSpeechArray, setPartOfSpeechArray] = useState([])   

        //Removes a word at random, inserts user input field.
        function createMadLib (tempString) {
            let newArray = tempString.split(" ")
            const keyWord = "keyWord"
            const subBody = document.createElement("div")
                subBody.id = "subMadLibElement"
            const headerBody = document.getElementById("madLibElement")
            headerBody.appendChild(subBody)
            let finalArray = []

            //Randomly replace a word in the hero bio with "keyWord," if the word is a noun, verb, adverb, or adjective.
            for(let i = 0; i < (newArray.length) / 15; i++){

                //set random index for newArray
                let randomI = Math.floor(Math.random() * newArray.length)

                //If the part of speech is a noun, verb, adverb, or adjective, it may randomly be replaced with an input field.  Or, because the dictionary API may stop accepting requests, if the word is longer than 3 letters, it may be replaced with an input field as well.
                if(partOfSpeechArray[i] === "noun" || partOfSpeechArray[i] === "verb" || partOfSpeechArray[i] === "adverb" || partOfSpeechArray[i] === "adjective") {
                    newArray.splice(randomI, 1, keyWord)

                }
                //if the word length is longer than 3 letters, it can be replaced.
                else if(newArray[i].length > 3){
                    newArray.splice(randomI, 1, keyWord)
                }

                //Reset random index.
                randomI = 0
            }

            let newString = newArray.join(" ")
           
            for(let i = 0; i < newArray.length; i++) {

                if(newArray[i] === "keyWord") {
                    const newInput = document.createElement("input")
                    newInput.type = "text"
                    newInput.name = "input"
                    const inputSpan = document.createElement("span")
                    
                    subBody.appendChild(inputSpan)
                    inputSpan.appendChild(newInput)
                }
                else {     
                    const newInput = document.createElement("span")
                    newInput.innerText = newArray[i] + " "
                    subBody.appendChild(newInput)
                    }
               
            }
 
            finalArray = newArray.slice()
        }

//Copy the current hero bio array for use to determine what part of speech each element in the array is.
    useEffect(()=>{
        if(randomHero) {
            biographyString = randomHero.bio
            biographyArray = biographyString.split(" ")
        }
    })

//Call the create MadLib function to initialize the Mad Lib String.  Log current Hero loaded.
    useEffect (()=>{
        randomHero ? createMadLib(randomHero.bio) : null
    }, [randomHero])

    useEffect(()=>{
        determinePartOfSpeech(biographyArray)
    },[randomHero])

return(
    <>
    <div id="madLibElement">
    </div>
    </>
)
}

export default MadLib