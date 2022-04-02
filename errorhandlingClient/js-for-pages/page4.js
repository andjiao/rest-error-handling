import { SERVER } from "../settings.js"
import {handleHttpErrors,makeOptions} from "../fetchUtils.js"

const SERVER_URL = SERVER + "/api/quotes"

export function page4Handlers() {
  document.getElementById("btn-find").onclick = findQuote
  document.getElementById("btn-edit").onclick = editQuote
  document.getElementById("btn-delete").onclick = deleteQuote
}


async function findQuote() {
  document.getElementById("error").innerText=""

  const id = getIdFromInputField()

  id.quote = document.getElementById("quote").value
  id.ref = document.getElementById("author").value

  try{
    const options = makeOptions("GET", id)
    const findQuote = await fetch(`${SERVER_URL}/${id}`, options)
    .then(res => handleHttpErrors(res))
    document.getElementById("findQuote").innerText=
    JSON.stringify(findQuote)
  } catch(err){
    document.getElementById("error").innerText = err.message
  }
    
}

async function editQuote() {
  const id = getIdFromInputField()
  const quote = getIdFromInputField()
  const author = getIdFromInputField()

  const editedQuote = {
    id: id
    quote: quote
    
  }

  editedQuote.quote = document.getElementById("quote").value
  editedQuote.ref = document.getElementById("author").value

  const editQuote = await fetch(SERVER_URL + "/" + id, {
    method: "PUT",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify(editedQuote)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error("Error while editing the quote")
      }
      return res.json()
    })
    .then(result => clearFields())
    .catch(err => alert(err.message + " (NEVER USE ALERT FOR REAL)"))


}
async function deleteQuote() {
  const id = getIdFromInputField()
  await fetch(SERVER_URL + "/" + id, {
    method: "DELETE"
  }).then(res => {
    res.text()
  })
  clearFields()
}

function clearFields() {
  document.getElementById("quote-id").value = ""
  document.getElementById("quote").value = ""
  document.getElementById("author").value = ""
}

function getIdFromInputField() {
  const id = document.getElementById("quote-id").value
  if (id === "") {
    throw new Error("No ID Provided")
  }
  return id
}
