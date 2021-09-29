/*** search shows ***/
document.querySelector("#search_shows").onclick = function(){

    title = document.querySelector("#title").value
    exactly = document.querySelector("#exactly").checked
    
    
    url = `/search_shows?title=${title}&exactly=${exactly}`

    xhr = new XMLHttpRequest()

    xhr.responseType = "json"
    
    xhr.onload = function(){
        response = xhr.response
        shows = response['shows']

        document.querySelector("#search_result").innerHTML = ''
        for( show of shows ){
            title = show['title']
            year  = show['year']
            episodes  = show['episodes']
            rating = show['rating']
            row = `<row> <td>${title}</td> <td>${year}</td> <td>${episodes}</td> <td>${rating}</td> </row>` 
            
            document.querySelector("#search_result").innerHTML += row
            //~ document.querySelector("#search_result").value += row
            
        }
        
    }

    xhr.open('GET', url)
    xhr.send()

}


document.querySelector("#clear_shows").onclick = function(){
    document.querySelector("#title").value = ""
    document.querySelector("#title").focus()

}


