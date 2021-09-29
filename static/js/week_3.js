
/*** Plurality ***/
document.querySelector("#make_pool").onclick = function(){
    candidates_str = document.querySelector("#candidates").value
    number_votes = document.querySelector("#number_votes").value
    number_votes = parseInt(number_votes)

    if( isNaN(number_votes) == false ){

      // get candidates
      candidates_names = candidates_str.split(" ")
      candidates = []
      for( name of candidates_names ){
          candidate = {'name': name, 'votes': 0}
          candidates.push(candidate)
      }


      alert("Candidates: "+candidates_names)

      // make pool
      for (i = 0; i < number_votes; i++){
          vote_name = prompt(`Vote ${i+1} goes for: `)
          if( candidates_names.indexOf( vote_name) == -1 ){
              console.log("Invalid Vote")
              alert("Invalid Vote !!")
          }
          else{
              for( candidate of candidates){
                  if( candidate['name'] == vote_name ){
                      candidate['votes']++
                  }
              }
          }
          
      }

      // get winner
      winner = candidates[0];
      for( candidate of candidates){
          if( candidate['votes'] > winner['votes'] ){
              winner = candidate
          }
      }
      
      alert(winner['name'] + " won !!")
      document.querySelector("#winner").value = winner['name']

    }
}

document.querySelector("#clear_plurality").onclick = function(){
    document.querySelector("#candidates").value = ""
    document.querySelector("#number_votes").value = ""
    document.querySelector("#winner").value = ""
}

