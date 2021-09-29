/// Print Hello world
document.querySelector("button").onclick = function(){
    hello_response = document.querySelector("#hello_response")
    hello_response.value =  "Hello World!"
}
// Clear
document.querySelector("#clear").onclick = function(){
    hello_response.value = ""
}

/// Calculate bottles of water
document.querySelector("#calculate").onclick = function(){
    input_minutes = document.querySelector("#minutes")
    minutes_str = input_minutes.value
    minutes = Number(minutes_str)

    
    if( isNaN(minutes) ){
        alert("Minutes must be a number")
        input_minutes.value = ""
        input_minutes.focus()
    }

    else if( minutes < 0){
        alert("Minutes must be a positive number")
        input_minutes.value = ""
        document.querySelector("#bottles").value = ""
    }
    else{
        bottles = document.querySelector("#bottles")
        bottles.value = minutes * 12;
    }
}

/// Print Pyramid
document.querySelector("#print_pyramid").onclick = function(){
    input_height = document.querySelector("#height")
    height_str = input_height.value
    height = parseInt(height_str)
   
    if( Number.isNaN(height) ){
        alert("height must be a number")
        input_height.value = ""
        input_height.focus()
    }

    else if( height <= 0 || height > 8){
        alert("Height must be a positive number between 1 and 8")
        input_height.value = ""
        input_height.focus()
        
    }
    else{
        width = height + 1
        blocks = 2;

        console.clear()
        for(i = 1; i <= height; i++)
        {
            spaces = width - blocks;
            row = ""
            for(j = spaces; j > 0; j--){
                row += " "
            }
            
            for(k = 1; k <= blocks; k++){
                row += "#"
            }

            console.log(row)
            blocks++;
        }   

    }
}

/// Print Pyramid II
document.querySelector("#print_pyramid_2").onclick = function(){
    input_height = document.querySelector("#height")
    height_str = input_height.value
    height = parseInt(height_str)
   
    if( Number.isNaN(height) ){
        alert("height must be a number")
        input_height.value = ""
        input_height.focus()
    }

    else if( height <= 0 || height > 8){
        alert("Height must be a positive number between 1 and 8")
        input_height.value = ""
        input_height.focus()
        
    }
    else{
    
        width = height; 
        blocks = 1;

        console.clear()
        for(i = 1; i <= height; i++)
        {
            spaces = width - blocks;
            row = ""
            for(j = spaces; j > 0; j--){
                row += " "
            }
            
            for(k = 1; k <= blocks; k++){
                row += "#"
            }

            row += "  "

            for(k = 1; k <= blocks; k++){
                row += "#"
            }
            

            console.log(row)
            blocks++;
        }   

    }
}


/// get Coins
document.querySelector("#get_coins").onclick = function(){
    cash_str = document.querySelector("#cash").value
    cash = Number(cash_str)

    if( Number.isNaN(cash) ){
        alert("cash must be a number")
        document.querySelector("#cash").value = ""
        document.querySelector("#cash").focus()
    }

    dollars = parseInt(cash);
        
        
    //~ // calculate all money in cents
    cents_f = cash * 100;
    
    cents = parseInt(cents_f);
   
    //calculate only cents
    cents = cents - dollars * 100;
   
    // calculate quarters
    quarters = 4 * dollars;
    
    quarters = quarters + parseInt(cents/25);
    cents = cents % 25;
    
    //calculate dimes
    dimes = parseInt(cents/10);
    cents = cents % 10;
    
    //calculate nickels
     nickels = parseInt(cents/5);
    cents = cents % 5;
    
    //calculate pennys
     pennys = cents;
    
    //calculate numbers of coins
     coins = quarters + dimes + nickels + pennys;
    
    document.querySelector("#coins").value = coins
    
}

/// Validate Number
document.querySelector("#validate").onclick = function(){
    number_str = document.querySelector("#number").value
    number = Number(number_str)

    if( Number.isNaN(number) ){
        alert("Number must be a number")
        document.querySelector("#number").value = ""
        document.querySelector("#number").focus()
    }

       n = number_str.length;
       flag = 0;
       total = 0;
      
       for(i = n-1; i >= 0; i-- ){
            digit = parseInt(number_str[i]);

            if( flag == 1){
                doble = digit * 2;

                if( doble > 9 ){
                    d1 = 1;
                    d2 = doble - 10;

                    doble = d1 + d2;
                }
                total += doble;
            }
            else{
             total += digit;
            }

            if( flag == 1){
                flag = 0;
            }else{
              flag = 1;
            }
       }
       console.log(total)

              
        if( number_str.length < 13 ){
            document.querySelector("#result").value = "INVALID\n";
        }
       
       // Print Result
       else if( total % 10 == 0){
            firm = number_str.slice(0,2);
           
            if( firm == "34" || firm == "37"){
                document.querySelector("#result").value ="AMEX\n";
            }
            else if( firm == "51" || firm == "52" || firm =="53" ||
                firm == "54" || firm == "55"){
                document.querySelector("#result").value ="MASTERCARD\n";
            }
            else if( firm[0] == '4'){
                document.querySelector("#result").value ="VISA\n";
            }
            else{
                document.querySelector("#result").value ="INVALID\n";
            }
          
       }
       else{
            document.querySelector("#result").value ="INVALID\n";
        }


               
}


