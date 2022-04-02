import { SERVER } from "../settings.js"
import {handleHttpErrors,makeOptions} from "../fetchUtils.js"
 
const API_URL = SERVER + "/api/quotes"
 
export function setUpAddButtonHandler() {
  document.getElementById("btn-add").onclick = addNewQuote;
}
 
 async function addNewQuote() {
  document.getElementById("error").innerText = ""
  const newQuote = {};
  newQuote.quote = document.getElementById("quote").value
  newQuote.ref = document.getElementById("author").value
  
  try {
  const options = makeOptions("POST",newQuote)
  const addedQuote = await fetch(API_URL,options)
    .then(res => handleHttpErrors(res))
    document.getElementById("addedQuote").innerText =
         JSON.stringify(addedQuote)
  } catch(err){
    document.getElementById("error").innerText = err.message
  }
  }



    /*
    .then(addedQuote => document.getElementById("addedQuote").innerText = JSON.stringify(addedQuote))
    .catch(e => alert(e.message + " (NEVER use alerts for real)" ))
    */
