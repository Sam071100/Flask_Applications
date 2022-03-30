from flask import Flask, render_template, request, redirect,url_for

app = Flask(__name__)



# Endpoints:
@app.route("/")
def hello_world():
    return render_template('index.html')

@app.route("/bar_chart")
def bar_chart():
    return render_template('bar_chart.html')

@app.route("/line_chart")
def line_chart():
    return render_template('line_chart.html')

@app.route("/donut_chart")
def donut_chart():
    return render_template('donut_chart.html')

@app.route("/bar_line")
def bar_line():
    return render_template('bar_line.html')

@app.route("/home")
def home():
    return render_template("home.html")


@app.route("/<name>")
def user(name):
    return f"Hello-- {name}!"


@app.route("/admin")
def admin():
    return redirect(url_for("home"))



if __name__ == "__main__":
    app.run(debug=True, port=8000)