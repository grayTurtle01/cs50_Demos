/** Print Hello Name ***/
document.querySelector("#greets").onclick = function(){
    input = document.querySelector("#name")
    name = input.value

    if( name != ""){
      response = document.querySelector("#response")
      response.value = `Hello ${name}!`
    }
}
// Clear Name
document.querySelector("#clear_name").onclick = function(){
    input.value = ""
    response.value = ""
    input.focus()
}


/*** Population ***/
b = document.querySelector("#get_years")
b.onclick = function(){
    initial_population = document.querySelector("#initial_population").value
    final_population = document.querySelector("#final_population").value
    years = document.querySelector("#years")

    initial_population = parseInt(initial_population)
    final_population = parseInt(final_population)

    if( initial_population < 9 ){
        alert("Initial population must be greater than 8")
        document.querySelector("#initial_population").value = ""
        years.value = ""
        document.querySelector("#initial_population").focus()
    }
    else if ( final_population < initial_population ){
        alert("Final population must be greater than Initial Population")
        document.querySelector("#final_population").value = ""
        years.value = ""
        document.querySelector("#final_population").focus()

    }
    else{
        current_population = initial_population;
        years = 0;
        growth = 0;

        while( current_population < final_population ){
          years++;
          growth = growth_per_year(current_population);
          current_population += growth;
        }

        document.querySelector("#years").value = years
   }
}

function growth_per_year(population){
  increment = parseInt(population/3);
  decrement = parseInt(population/4);
  
  dx = increment - decrement; 
  
  return dx;
}

