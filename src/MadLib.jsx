import React from "react"
import {useEffect} from "react"
import {useContext, createContext, useState} from "react"
import {MadLibContext } from "./App"


function MadLib () {

    function determinePartOfSpeech(word) {
        let part = []
        useEffect(()=>{
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then((r)=>r.json())
            .then((data)=>{
                setPartOfSpeech(data[0].meanings[0].partOfSpeech);
            }
            )
            .catch((error)=>{return console.log("Error fetching dictionary API: " + error)}
            ),[word]})
    
        
    }
    const {randomHero, madLibString} = useContext(MadLibContext)
    const [statePartOfSpeech, setPartOfSpeech] = useState("")       

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

                // determinePartOfSpeech(newArray[i])
                //     if (statePartOfSpeech === "noun" || statePartOfSpeech ===  "verb" || statePartOfSpeech === "adverb" || statePartOfSpeech === "adjective" ) {
                            newArray.splice(randomI, 1, keyWord)
                    // }


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