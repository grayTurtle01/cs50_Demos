function render_nigh_mode(){
  night_mode = localStorage.getItem('night_mode')
  
  body = document.querySelector("body")

  if(night_mode == "true"){
    body.style.background = "black"
    body.style.color = 'white'
    cards = document.querySelectorAll(".card")

    for(card of cards)
      card.style.border = "1px solid white"


  }
  else{
    body.style.background = "white"
    body.style.color = 'black'

    cards = document.querySelectorAll(".card")

    for(card of cards)
      card.style.border = "1px solid black"

  }

}

window.onload = function(){
  render_nigh_mode()
}
