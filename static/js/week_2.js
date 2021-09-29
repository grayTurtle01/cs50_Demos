/*** Scrabble: get Winner ***/
document.querySelector("#get_winner").onclick = function(){
    word1 = document.querySelector("#word1").value
    word2 = document.querySelector("#word2").value

    // get words values
   score1 = compute_word(word1);
   score2 = compute_word(word2);

    result = ""
   // show results
   if( score1 > score2 )
     result = "Player 1 wins!";
   else if( score1 < score2)
     result = "Player 2 wins!";
   else
     result = "Tie!"
    
    document.querySelector("#winner").value = result
    
}

function get_letter_value(letter){
  points = [1,3,3,2,1,4,2,4,1,8,5,1,3,
            1,1,3,10,1,1,1,1,4,4,8,4,10]; 
  
  letter = letter.toUpperCase();
  value = 0;
  index = 0;
  
  if( letter >= 'A' && letter <= 'Z'){
    index = letter.charCodeAt() - 65;
    value = points[index];
    return value;
  }
  
  return value; 
}

function compute_word(word){
  word_value = 0;
  letter_value = 0;
  letter = "";
   
  for(i = 0; i < word.length; i++){
    letter = word[i];
    letter_value = get_letter_value(letter); 
    word_value += letter_value;
  }
  
  return word_value;
}

// Clear Scrabble
document.querySelector("#clear_scrabble").onclick = function(){
  document.querySelector("#word1").value = ""
  document.querySelector("#word2").value = ""
  document.querySelector("#winner").value = ""
}


/*** Readability ***/
document.querySelector("#get_index").onclick = function(){
    text = document.querySelector("#text").value

    letters = 0;
    words = 0;
    sentences = 0;

    c = ""; 

    for(i = 0; i < text.length; i++){
        c = text[i];

        // count letters
        if( /[a-zA-Z]/.test(c) ){
          letters++;
        }

        // count words
        if( c == ' '){
            words++;
        }

        // count sentences
        if( c == '.' || c== '!' || c== '?'){
            sentences++;
        }
    }
    // first word
    if(  /[a-zA-Z]/.test(text[0])  ){
        words++;
    } 

    //~ console.log(letters, words, sentences)

   L = 1.0*letters/words * 100;  
   S = 1.0*sentences/words * 100;  

   index_double = Math.round(0.0588 * L - 0.296 * S - 15.8); 
   index = parseInt(index_double) ;

   //~ printf("\nletters: %d, words: %d, sentences: %d  \n", letters, words, sentences);
   //~ printf("L: %d  S: %d \n", L, S);

    // Corner Cases
   grade = ""
   if( index >= 16 ){
    grade = "Grade 16+";
   }
   else if( index < 1){
    grade = "Before Grade 1\n";
   }
   else{
    grade = "Grade " + index;
   } 



    document.querySelector("#index").value = grade
}

document.querySelector("#clear_text").onclick = function(){
    document.querySelector("#text").value = ""
    document.querySelector("#index").value = ""
    document.querySelector("#text").focus();
}

/*** Caesar ***/
document.querySelector("#cipher").onclick = function(){
    plain_text = document.querySelector("#plain_text").value
    key_str = document.querySelector("#key_number").value
    key = parseInt(key_str)

    cipher_text = ""

    for( i = 0, n = plain_text.length;  i < n;  i++){
        
            letter = plain_text[i];

            // lower Case
            if( /[a-z]/.test(letter) )
            {
                c = rotate(letter, key);
                cipher_text += c;
            }
            // UPER Case
            else if ( /[A-Z]/.test(letter) )
            {
                letter = letter.toLowerCase();
                c = rotate(letter,key);
                c = c.toUpperCase();
                cipher_text += c;
            }
            // Not letter  
            else 
                cipher_text += letter;
        }
        
    document.querySelector("#cipher_text").value = cipher_text;

}

document.querySelector("#clear_caesar").onclick = function(){
    document.querySelector("#plain_text").value = ""
    document.querySelector("#key_number").value = ""
    document.querySelector("#cipher_text").value = ""
    document.querySelector("#plain_text").focus();
}

function rotate(l, k){
    c = 0;
    dx = 0;
    
    if ( k % 26 == 0 )
        return l;
    
    if ( l.charCodeAt() + k > 'z'.charCodeAt() )
    {
        dx = (l.charCodeAt() + k) -  'z'.charCodeAt();
        dx = (dx % 26);
        c = ('a'.charCodeAt()- 1 ) + dx ;
    }
    else
        c =  l.charCodeAt() + k;
        c = String.fromCharCode(c)
        
    return c;
}

/*** Substitution ***/
// KEY=JTREKYAVOGDXPSNCUIZLFBMWHQ
document.querySelector("#cipher_sub").onclick = function(){
    plain_text = document.querySelector("#plain_text_sub").value
    key = document.querySelector("#key_26").value

    if ( is_valid_key(key) ){
        cipher_text = ""

        letter = "";
        new_letter = "";

        for(i = 0; i < plain_text.length; i++){
            letter = plain_text[i];
            new_letter = map_letter(letter, key);
            cipher_text += new_letter; 
        }

        document.querySelector("#cipher_text_sub").value = cipher_text;
    }
    else{
        document.querySelector("#cipher_text_sub").value = "Invalid key"
    }
    

}

document.querySelector("#clear_substitution").onclick = function(){
    document.querySelector("#plain_text_sub").value = ""
    document.querySelector("#key_26").value = ""
    document.querySelector("#cipher_text_sub").value = ""
    document.querySelector("#plain_text_sub").focus();
}

function map_letter( letter, key ){

    // when the character isn't a letter
    if( /[a-zA-Z]/.test(letter) == false )
        return letter;

    alpha_index = 0;
    new_letter = "";

    // lower Case
    if( /[a-z]/.test(letter) ){
        alpha_index =  letter.charCodeAt() - 'a'.charCodeAt();
        new_letter = key[alpha_index];
        new_letter = new_letter.toLowerCase();
    }
    // Upper Case
    if( /[A-Z]/.test(letter) ){
        alpha_index =  letter.charCodeAt() - 'A'.charCodeAt();
        new_letter = key[alpha_index];
        new_letter = new_letter.toUpperCase();
    }
    
    return new_letter;    
}

function is_valid_key( key ){
    if( key.length != 26 )
        return false
    
   // normalize key
   key_norm = "";
   for(i = 0; i < 26; i++){
       key_norm  += key[i].toLowerCase();
   } 
    
   c = 97; 
   for(i = 0; i < 26; i++){
        letter = String.fromCharCode(97 + i)
        if( key_norm.indexOf(letter) == -1 )
            return false;

        c++;
    } 

    return true;
}
