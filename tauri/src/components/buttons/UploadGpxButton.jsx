import React from "react";

import uploadGpxFile from "../../api/uploadGpxFile";

const gpxSchema = {
  extension: ".gpx",
  inputId: "file-upload-gpx",
};

function UploadGpxButton({ handleGpxFilenameStateChange }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // TOOD
    // see if we can enforce this file is of type gpx
    // I had a file type check here before, but some clients would read "" as file type and others would read "application/gpx+xml", so we could create a set of the 2, but that seems like a bad practice
    if (file) {
      uploadGpxFile(file, handleGpxFilenameStateChange);
    } else {
      console.log("Invalid file type. Please select a GPX file.");
    }
  };

  return (
    <>
      <input
        accept={gpxSchema.extension}
        type="file"
        id={gpxSchema.inputId}
        className="file-input"
        onChange={handleFileChange}
      />
      <label htmlFor={gpxSchema.inputId} className="btn btn-danger m-1">
        Upload GPX
      </label>
    </>
  );
}

export default UploadGpxButton;
