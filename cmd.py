import json
from flask import Flask
app = Flask(__name__)

# TODO: 'random', 'menu' commands.  possibly making sure startup
# doesn't do bad things if it's already running.

@app.route("/")
def nothing():
    return "Please type a command.  For help, type 'help'."

@app.route("/<cmd>")
def cmd(cmd):
    try:
        cmds = json.load(open('/home/chigby/webapps/cmd/cmd.json'))
    except ValueError:
        return 'Bad command or file name, but there might be a problem.'
    return cmds.get(cmd, 'Bad command or file name.')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=48600)
