/*** onload ***/
document.addEventListener('DOMContentLoaded', function(){
    ta = document.querySelector("textarea")
    ta.value = ""
    
})

/*** Speller ***/
document.querySelector("#check_text").onclick = function(){
  file_name = document.querySelector("#dictionary").value
  input_text = document.querySelector("#input_text").value

  input_text = input_text.split("\n").join(" ")

  console.log(input_text)
  document.querySelector("#wrong_words_field").value = ""

  endpoint = "/check_text"
  url = `/check_text?file_name=${file_name}&input_text=${input_text}`

  fetch( url )
    .then( res => res.json() )
    //~ .then( data => console.log(data))
    .then( wrong_words => render_wrong_words(wrong_words) )
    //~ .then( wrong_words => console.log(wrong_words) )

}

function render_wrong_words(wrong_words){
  console.log(wrong_words)
  field = document.querySelector("#wrong_words_field")
  for( word of wrong_words ){
    field.value += word + " "
  }
}

// Clear Speller
document.querySelector("#clear_speller").onclick = function(){
  document.querySelector("#input_text").value = ""
  document.querySelector("#wrong_words_field").value = ""
  document.querySelector("#input_text").focus()
}
