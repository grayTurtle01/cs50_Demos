def load_dic(file_name):
  
  f = open(file_name, "r")
  dic = []

  lines = f.readlines()
  for line in lines:
    word = line.strip()
    dic.append(word)

  return dic

def check_word(word, dic):
  if word in dic:
    return True
  else:
    return False

def get_wrong_words(words, dic):
  wrong_words = []

  for word in words:
    if check_word(word.lower(), dic) == False:
      if(word in wrong_words) == False:
        wrong_words.append(word)


  return wrong_words
