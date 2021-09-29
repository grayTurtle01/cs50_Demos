window.onload = function(){
  // Night Mode
  if ( localStorage.getItem('night_mode') == null ){
    localStorage.setItem('night_mode', false )
  }

  if( localStorage.getItem('night_mode')  ==  "true" ){
    document.querySelector("#switch").checked = true
    change_state()

  }

  // Users
  //~ if( localStorage.getItem('user') == null ){
    //~ localStorage.setItem('user', 'anonymus')
  //~ }
  
}

document.querySelector("#switch").onclick = function(){
  change_state()
}

night_background = "black"
night_color = "lightgray"

function change_state(){
  night_mode = document.querySelector("#switch").checked
  localStorage.setItem('night_mode', night_mode)

  body = document.querySelector("body")

  if(night_mode == true){
    body.style.background = night_background
    body.style.color = night_color
    cards = document.querySelectorAll(".card")

    for(card of cards)
      card.style.border = `1px solid white`


  }
  else{
    body.style.background = "white"
    body.style.color = 'black'

    cards = document.querySelectorAll(".card")

    for(card of cards)
      card.style.border = "1px solid black"

  }

}
