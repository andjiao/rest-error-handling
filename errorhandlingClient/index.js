
import { renderTemplate, setActive, showPage } from "./utils.js"
import { loadAllQuotes } from "./js-for-pages/page2.js"
import { setUpAddButtonHandler } from "./js-for-pages/page3.js"
import {findQuote, editQuote, deleteQuote } from "./js-for-pages/page4.js"

function renderMenuItems(evt) {
  const element = evt.target
  setActive(element)
  const id = element.id;
  renderTemplate(id)  //This setups the HTML for the page
  switch (id) {
    //Here you can execute JavaScript for the selected page
    case "page-1": {
      break
    }
    case "page-2": {
      loadAllQuotes()
      break
    }
    case "page-3": {
      setUpAddButtonHandler()
      break
    }
    case "page-4": {
      findQuote()
      editQuote()
      deleteQuote()
      break
    }
  }
}

document.getElementById("menu").onclick = renderMenuItems;
showPage("page-1") //Set the default page to render




