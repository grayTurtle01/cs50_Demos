/*** Greets ***/
document.querySelector("#greets").onclick = function(){

    name = document.querySelector("#name").value
    alert("Hello " + name)
}


document.querySelector("#clear_greets").onclick = function(){
    document.querySelector("#name").value = ""
    document.querySelector("#name").focus()

}


/*** Search.js ***/
input_tag = document.querySelector("#input_text")

boton = document.querySelector("#search")
boton.onclick = change_url

a = document.querySelector("#link")

selector = document.querySelector("select")

function change_url(){
    input_query = input_tag.value
  
    index = selector.selectedIndex
    company = selector[index].value

    if(company == "Google")
        a.href = "https://www.google.com/search?q=" + input_query

    else if(company == "Youtube")
        a.href = "https://www.youtube.com/search?search_query=" + input_query

    else if(company == "Twitter")
        //~ a.href = "https://www.twitter.com/search?q=" + input_query + "&src=typed_query"
        a.href = "https://www.twitter.com/search?q=" + input_query
        
    else if( company == "Wikipedia")
         a.href = "https://www.wikipedia.org/w/index.php?search=" + input_query
    
}


document.querySelector("#clear_search").onclick = function(){
    document.querySelector("#input_text").value = ""
    document.querySelector("#input_text").focus()

}

/*** Blinker.js ***/
color = "black"
state = "stop"
interval = ""

document.querySelector("#blinker").onclick = function(){
  if (state == "stop"){
    interval = setInterval( changeColor, 300);
    state = "play"
    this.innerText = "Stop"  
  }

  else if (state == "play"){
    clearInterval(interval)
    state = "stop"
    this.innerText = "Start"  
  }

} 

function changeColor(){
  h1 = document.querySelector("#blinker_text")

  if( color == "black"){
    h1.style.color = "red";
    color = "red"
  }
  else if( color == "red"){
    h1.style.color = "black";
    color = "black"
  }

}


/**** copy.js ***/
document.querySelector("#input_text2").onkeyup = function(){
  text = this.value
  document.querySelector("#output_text").value  = text
}

document.querySelector("#clear_copy").onclick = function(){
    document.querySelector("#input_text2").value = ""
    document.querySelector("#output_text").value = ""
    document.querySelector("#input_text2").focus()

}
