import json
import os.path
from flask import Flask
app = Flask(__name__)

# TODO: 'random', 'menu' commands.  possibly making sure startup
# doesn't do bad things if it's already running.

def load_data():
    filename = 'cmd.json'
    paths = ['/home/chigby/webapps/cmd/', './']
    for p in paths:
        try:
            f = open(os.path.join(p, filename))
            if f: break
        except IOError:
            continue
    return json.load(f)

@app.route("/")
def nothing():
    return "Please type a command.  For help, type 'help'."

@app.route("/<cmd>")
def cmd(cmd):
    try:
        cmds = load_data()
    except ValueError:
        return 'Bad command or file name, but there might be a problem.'
    return cmds.get(cmd, 'Bad command or file name.')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=48600)
