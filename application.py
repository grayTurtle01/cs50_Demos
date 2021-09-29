from flask import Flask, render_template, redirect
from flask import request, jsonify
from flask_sqlalchemy import SQLAlchemy

from flask import session
from flask_session import Session

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dbs/planificator.db'
db = SQLAlchemy(app)

#app.config["TEMPLATES_AUTO_RELOAD"] = True

app.config['SESSION_PERMANENT'] = False
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

@app.route('/')
def index():
  if session.get('username') is None:
      session['username'] = 'anonymus'
  return render_template("index.html")

@app.route("/week_0")
def scratch():
    return render_template("week_0.html")

@app.route("/week_1")
def week_1():
    return render_template("week_1.html")

@app.route("/week_2")
def week_2():
    return render_template("week_2.html")

@app.route("/week_3")
def week_3():
    return render_template("week_3.html")

''' WEEK-4'''
# Prevent Cache-Images
@app.after_request
def add_header(response):
    response.headers['Pragma'] = 'no-cache'
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Expires'] = '0'
    return response

@app.route("/week_4")
def week_4():
    return render_template("week_4.html")

@app.route("/change_volume", methods=['GET'])
def change_volume():
    factor_str = request.args['factor']
    factor = int(factor_str)
    change_sound_file(factor)

    return jsonify(factor)

import os
base_path = os.path.dirname(os.path.abspath(__file__))
def change_sound_file(factor):
    file_path_1 = os.path.join(base_path, './static/sounds/default.wav')
    file_path_2 = os.path.join(base_path, './static/sounds/output.wav')
    # only works with integers values
    f1 = open(file_path_1, "rb" )
    f2 = open(file_path_2, "wb")

    header = f1.read(44)
    f2.write(header)

    while True:
        sample = f1.read(2)
        if not sample:
            break

        sample_int = int.from_bytes(sample, 'big')

        sample_int *= factor;
        if sample_int >= 2**16:
            sample_int = sample_int % 2**16


        sample_bytes = sample_int.to_bytes(2, 'big')

        f2.write(sample_bytes)

from PIL import Image, ImageFilter
@app.route("/filter")
def filter():
    file_name_input = "scratch.jpg"
    file_path_input = os.path.join(base_path, f"./static/images/{file_name_input}")

    file_name_output = "output.png"
    file_path_output = os.path.join(base_path, f"./static/images/{file_name_output}")


    image = Image.open(file_path_input)
    flag = request.args['filter']

    image_f = Image.open(file_path_output)

    if flag == 'blur':
        image_f = image.filter(ImageFilter.BoxBlur(10))

    if flag == 'gray':
        image_f = image.convert('LA')

    if flag == 'contour':
        image_f = image.filter(ImageFilter.CONTOUR)

    if flag == 'emboss':
        image_f = image.filter(ImageFilter.EMBOSS)

    if flag == 'edges':
        image_f = image.filter(ImageFilter.FIND_EDGES)

    image_f.save(file_path_output)

    return redirect("/week_4")



''' WEEK-5 '''
@app.route("/week_5")
def week_5():
    return render_template("week_5.html")

from helpers.Week5Module import load_dic, get_wrong_words
@app.route("/check_text")
def check_text():
  file_name = request.args['file_name']
  input_text = request.args['input_text']

  file_path = f"./static/dictionaries/{file_name}"
  dictionary_path = os.path.join(base_path, file_path)

  dic = load_dic(dictionary_path)

  words = input_text.split()

  wrong_words = get_wrong_words(words, dic)

  return jsonify(wrong_words)


''' WEEK-6'''
@app.route("/week_6")
def week_6():
    return render_template("week_6.html")

#pip install pyttsx3
import pyttsx3
@app.route("/get_voice")
def get_voice():
    text_input = request.args['text']

    engine = pyttsx3.init()
    voices = engine.getProperty('voices')
    engine.setProperty('voice', voices[10].id)

    file_path_voice = os.path.join(base_path, "./static/sounds/voice.mp3")
    engine.save_to_file(text_input, file_path_voice)
    engine.runAndWait()

    return redirect("/week_6")

import qrcode
@app.route("/get_qr")
def get_qr():
    url = request.args['url']
    img = qrcode.make(url)

    path_qr_file = os.path.join(base_path, './static/images/qr.png')

    img.save(path_qr_file, 'PNG')

    return redirect("/week_6")

from helpers.myModule import get_probabilities_world_cup
@app.route("/get_probabilities")
def get_probabilities():
    N_simulations = request.args['N_simulations']
    file_name = request.args['file_name']

    if file_name != "World Cup":

      path = os.path.join(base_path, f"static/csv/{file_name}")

      probabilities = get_probabilities_world_cup(path, N_simulations)

      dic = { 'probabilities': probabilities }

      return dic

    else:
      return {}


''' WEEK-7 '''
@app.route("/week_7")
def week_7():
    return render_template("week_7.html")

import cs50
@app.route("/search_shows")
def search_shows():
    title = request.args['title']
    exactly = request.args['exactly']

    path = os.path.join(base_path, "dbs/shows.db" )

    db = cs50.SQL(f"sqlite:///{path}")

    if exactly == "true":
        query = f"SELECT title, year, episodes, rating FROM shows \
                  JOIN ratings ON show_id = id \
                  WHERE title = '{title}' "
    else:
        query = f"SELECT title, year, episodes, rating FROM shows \
                  JOIN ratings ON show_id = id \
                  WHERE title LIKE '%{title}%' "

    shows = db.execute( query )

    dic = {'shows': shows }

    return dic


''' WEEK-8 '''
@app.route("/week_8")
def week_8():
    return render_template("week_8.html")


''' WEEK-9 '''
db2_path = os.path.join(base_path, "dbs/week_9.db" )
db2 = cs50.SQL(f"sqlite:///{db2_path}")

@app.route("/week_9", methods=['GET', 'POST'])
def week_9():
    if request.method == 'GET':
      months = ["January", "Febraury", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December" ]

      birthdays = db2.execute("SELECT * FROM birthdays")
      print(birthdays)

      return render_template("week_9.html", months=months, birthdays=birthdays)

    if request.method == 'POST':


      name = request.form['person_name']

      try:
        month = request.form['month']
      except:
        return "Month must be selected"

      try:
        day = request.form['day']
      except:
        return "Day must be selected"

      birthday = day+"/"+month

      db2.execute("INSERT INTO birthdays(name, day, month, birth) VALUES(?, ?, ?, ?)",name, day, month, birthday)

      return redirect("/week_9")


@app.route("/delete_birthday/<ID>")
def delete_id(ID):
  db2.execute("DELETE FROM birthdays WHERE id = ?", ID)

  return redirect("/week_9")


''' PLANIFICATOR   '''
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text)
    done = db.Column(db.Boolean)
    day = db.Column(db.Text)
    value = db.Column(db.Integer)
    week = db.Column(db.Text)
    username = db.Column(db.Text)

from sqlalchemy import or_

@app.route("/planificator", methods=['GET', 'POST'])
def planner():
    weeks = ['Week-1', 'Week-2', 'Week-3']
    if request.method == 'GET':

        # ~ tasks = Task.query.filter_by(day="Today").order_by(Task.value.desc())
        tasks = Task.query.filter(or_(Task.day=="Today",  Task.day=="Food")).order_by(Task.value.desc())
        return render_template("planificator.html", tasks=tasks, weeks=weeks)

    if request.method == 'POST':
        new_task = request.form['new_task']
        day = request.form['day']
        task = Task(content=new_task, done=False, day=day, value=0, week='Week-0', username=session['username'])
        db.session.add(task)
        db.session.commit()
        return redirect("/planificator")

@app.route("/planificator/<week>", methods=['GET', 'POST'])
def show_week(week):
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thrusday', 'Friday', 'Saturday', 'Sunday']
    if request.method == 'GET':
        # ~ tasks = Task.query.order_by(Task.value.desc())
        tasks = Task.query.filter_by(week=week).order_by(Task.value.desc())

        if week == 'Week-0':
          return redirect("/planificator")

        return render_template("week.html", tasks=tasks, days=days, week=week)

    if request.method == 'POST':
        new_task = request.form['new_task']
        day = request.form['day']
        task = Task(content=new_task, done=False, day=day, value=0, week=week, username=session['username'])
        db.session.add(task)
        db.session.commit()
        return redirect(f"/planificator/{week}")

@app.route("/delete_task/<ID>")
def delete_task(ID):
    task = Task.query.filter_by(id=int(ID)).first()
    week = task.week

    task = Task.query.filter_by(id=int(ID)).delete()

    db.session.commit()

    return redirect(f"/planificator/{week}")


@app.route("/delete_day")
def delete_all_day():
    week = request.args['week']
    day = request.args['day']

    tasks = Task.query.filter_by(day=day).filter_by(week=week).delete()

    db.session.commit()

    return redirect(f"/planificator/{week}")

@app.route("/delete_week")
def delete_week():
    week = request.args['week']

    tasks = Task.query.filter_by(week=week).delete()

    db.session.commit()

    return redirect(f"/planificator/{week}")




@app.route("/change_state/<ID>")
def change_state(ID):
    task = Task.query.filter_by(id=int(ID)).first()
    week = task.week

    task.done = not(task.done)
    db.session.commit()

    return redirect(f"/planificator/{week}")

@app.route("/change_priority/<ID>")
def change_priority(ID):
    task = Task.query.filter_by(id=int(ID)).first()
    week = task.week

    task.value += 1
    db.session.commit()

    return redirect(f"/planificator/{week}")

@app.route("/downvote/<ID>")
def downvote(ID):
    task = Task.query.filter_by(id=int(ID)).first()
    week = task.week

    task.value -= 1
    db.session.commit()

    return redirect(f"/planificator/{week}")

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String)
  hash = db.Column(db.String)
  password = db.Column(db.String)

@app.route("/login", methods=['GET', 'POST'])
def login():
  if request.method == 'GET':
    return render_template("login.html")
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']

    user = User.query.filter_by(username=username).first()
    if user == None:
      return render_template('login.html', message="wrong username")

    if password != user.password:
      return render_template('login.html', message="wrong password")

    else:
      session['username'] = username
      return redirect("/planificator")

@app.route("/logout")
def logout():
  session['username'] = "anonymus"
  return redirect("/planificator")

@app.route("/register", methods=['GET', 'POST'])
def register():
  if request.method == 'GET':
    return render_template("register.html")
  if request.method == 'POST':
    username = request.form['username']
    password = request.form['password']
    confirm  = request.form['confirmation']

    if password != confirm:
       return render_template('register.html', message="wrong passwords")

    user = User.query.filter_by(username=username).first()
    if user != None:
       return render_template('register.html', message="User Already Exist")


    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()

    session['username'] = username

    return redirect("/planificator")

