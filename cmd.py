import os
import json
from flask import Flask
app = Flask(__name__)

# TODO: 'random', 'menu' commands.  possibly making sure startup
# doesn't do bad things if it's already running.

def _open_cmds():
    paths = ['/home/chigby/webapps/cmd/', './']
    for path in paths:
        cmd_path = path + 'cmd.json'
        if os.path.exists(path):
            try:
                f = open(cmd_path)
            except IOError:
                f = None
    return f

@app.route("/")
def nothing():
    return "Please type a command.  For help, type 'help'."

@app.route("/<cmd>")
def cmd(cmd):
    try:
        cmds = json.load(_open_cmds())
    except ValueError:
        return 'Bad command or file name, but there might be a problem.'
    return cmds.get(cmd, 'Bad command or file name.')

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=48600, debug=True)
