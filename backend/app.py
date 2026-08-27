from flask import Flask, jsonify, send_from_directory
from bridge import CEngineBridge
import os

app = Flask(__name__, static_folder="../frontend")
bridge = CEngineBridge()

@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

@app.route("/<path:path>")
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route("/api/metrics", methods=["GET"])
def get_metrics():
    data = bridge.read_all_metrics()
    return jsonify(data)

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)