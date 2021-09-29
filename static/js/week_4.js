//~ document.onload = function(){
document.addEventListener("DOMContentLoaded", function(){
  factor = 1
  change_sound(factor)
})


/*** Volume ***/
document.querySelector("#change_volume").onclick = function(){
    factor = document.querySelector("input[name='factor']").value
    url = `/change_volume?factor=${factor}`
    change_sound(factor)

}

async function change_sound(factor){
  url = `/change_volume?factor=${factor}`
  try{
    res = await fetch( url )
    data = await res.json()
    document.querySelector("#output").load()
    document.querySelector("#play_output").value = `Play V${factor}`
    console.log(data)
  }
  catch(error){
    console.log(error)
  }
}


document.querySelector("#play").onclick = function(){
    audio = document.querySelector("audio")
    audio.play()

}

document.querySelector("#play_output").onclick = function(){
    audio = document.querySelector("#output")
    audio.play()

}
