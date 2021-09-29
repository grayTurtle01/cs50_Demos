/*** get Voice ***/
document.querySelector("#get_voice").onclick = function(){

    text = document.querySelector("#text").value
    console.log(text)

    xhr = new XMLHttpRequest()
    url = `/get_voice?text=${text}`

    xhr.onload = function(){
        response = xhr.response
        //console.log(response)
        audio = document.querySelector("audio")
        audio.load()
        audio.play()
    }

    xhr.open('GET', url)
    xhr.send()

}


document.querySelector("#clear_text").onclick = function(){
    document.querySelector("#text").value = ""
    document.querySelector("#text").focus()

}


/*** get QR image ***/
document.querySelector("#get_qr").onclick = function(){

    url = document.querySelector("#url").value

    xhr = new XMLHttpRequest()
    endpoint = `/get_qr?url=${url}`

    xhr.onload = function(){
        response = xhr.response
        location.reload()
    }

    xhr.open('GET', endpoint )
    xhr.send()

}

document.querySelector("#clear_url").onclick = function(){
    document.querySelector("#url").value = ""
    document.querySelector("#url").focus()

}


/*** get Probabilities ***/
document.querySelector("#get_probabilities").onclick = function(){

    file_name = document.querySelector("#file_name").value
    N_simulations = document.querySelector("#N_simulations").value

    //~ console.log(file_name, N_simulations)
    endpoint = `/get_probabilities?file_name=${file_name}&N_simulations=${N_simulations}`

    xhr = new XMLHttpRequest()
    xhr.responseType = 'json'

    xhr.onload = function(){
        response = xhr.response
        
        probabilities = response['probabilities']
        render_probabilities( probabilities )
    }

    xhr.open('GET', endpoint )
    xhr.send()

}

function render_probabilities(probabilities){
    content = ""
    for( row of probabilities )
        content += row + "<br>"
    
    document.querySelector("#probabilities_result").innerHTML = content

}

document.querySelector("#clear_url").onclick = function(){
    document.querySelector("#url").value = ""
    document.querySelector("#url").focus()

}

