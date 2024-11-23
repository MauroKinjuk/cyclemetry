import isEqual from "lodash/isEqual";
import { invoke } from "@tauri-apps/api/core";

import { initConfig } from "./../Editor.jsx";

    async function generateDemoFrameRust(configString, gpxFilename) {
      return await invoke('generate_demo_frame', {configString, gpxFilename})
    }

async function generateDemoFrame(
  editor,
  gpxFilename,
  handleGeneratingImageStateChange,
  handleImageFilenameStateChange
) {
  if (!gpxFilename) {
    console.log("missing gpx file");
    return;
  }
  if (editor) {
    const config = editor.getValue();
    if (isEqual(config, initConfig) && gpxFilename === ".demo.gpx") {
      // is this line below necessary? we default .demo.png already in App
      // handleImageFilenameStateChange(".demo.png");
      return;
    }
    // we should validate the config - maybe do this in editor, since it's a tigter jump
    // const errors = editor.validate(); -> not sure if this is sufficient - at minimum, should pass required checks of schema
    const configString = JSON.stringify(config);
    handleGeneratingImageStateChange(true);
    // need to better handle errors from this rust call
    const imageFilename = await generateDemoFrameRust(configString, gpxFilename);
    handleGeneratingImageStateChange(false);
    handleImageFilenameStateChange(imageFilename);
}
}

export default generateDemoFrame;
