import os
from flask import Flask, render_template, request, redirect,session
from flask_mysqldb import MySQL



app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'users'
app.secret_key=os.urandom(24)

mysql = MySQL(app)


@app.route('/')
def login():
    return render_template('login.html')

@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/home')
def home():
    if 'user_id' in session:
        return render_template('home.html')
    else:
        return redirect('/')

@app.route('/login_validation', methods=['POST'])
def login_validation():
    email = request.form.get('email')
    password = request.form.get('password')
    cursor = mysql.connection.cursor()
    cursor.execute("""SELECT * FROM `users` WHERE `email` LIKE '{}' AND `password` LIKE '{}'""".format(email,password))
    users = cursor.fetchall()
    if len(users)>0:
        session['user_id'] = users[0][0]
        return redirect('home')
    else:
        return redirect('/')

@app.route('/add_user', methods=['POST'])
def add_user():
    name = request.form.get('uname')
    email = request.form.get('uemail')
    password = request.form.get('upassword')
    cursor = mysql.connection.cursor()
    cursor.execute("""INSERT INTO `users` (`user_id`, `name`, `email`, `password`) VALUES (NULL, '{}', '{}', '{}') """.format(name,email,password))
    mysql.connection.commit()
    cursor.execute("""SELECT * FROM `users` WHERE `email` LIKE '{}'""".format(email))
    myuser = cursor.fetchall()
    session['user_id']=myuser[0][0]
    return redirect('/home')

@app.route('/logout')
def logout():
    session.pop('user_id')
    return redirect('/')

if __name__ == "__main__":
    app.run(debug=True, port=8000)