import os
import time

from flask import (
    Flask,
    request,
    jsonify,
    make_response,
    send_from_directory,
)
from flask_cors import CORS
from werkzeug.utils import secure_filename

from designer import demo_frame


ALLOWED_EXTENSIONS = {"json", "gpx"}
UPLOAD_FOLDER = "./tmp"

app = Flask(__name__)
CORS(app)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.errorhandler(406)
def bad_request(error):
    return make_response(
        jsonify({"error": "Bad Request sowwy - " + error.description}), 406
    )


@app.route("/healthz")
def healthz():
    return "OK", 200


@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return make_response(jsonify({"error": "invalid request"}), 400)
    file = request.files["file"]
    if file.filename == "":
        return make_response(jsonify({"error": "no file selected"}), 400)
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
        file.save(path)
        return jsonify({"data": "file uploaded"})
    return make_response(jsonify({"error": "very bad"}), 400)


@app.route("/demo", methods=["POST"])
def demo():

    data = request.json

    if (
        data
        and "config_filename" in data
        and "gpx_filename" in data
        and data["config_filename"] is not None
        and data["gpx_filename"] is not None
    ):
        config_filename = data["config_filename"]
        gpx_filename = data["gpx_filename"]

        scene = demo_frame(
            gpx_filename, config_filename, 20, True
        )  # TODO replace with param for third value

        img_filepath = scene.frames[0].full_path()
        obf_filepath = f"./frames/{int(time.time())}.png"
        os.rename(img_filepath, obf_filepath)
        filename = os.path.basename(obf_filepath)
    return jsonify({"data": filename})


@app.route("/images/<filename>")
def serve_image(filename):
    return send_from_directory("frames", filename)


def bootboot():
    dir = "tmp"
    if not os.path.exists(dir):
        os.makedirs(dir)


with app.app_context():
    bootboot()
