import { writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

async function uploadGpxFile(gpxFile, handleGpxFilenameStateChange) {
  console.log("uploadGpxFile");
   await writeTextFile(gpxFile.name, await gpxFile.text(), { baseDir: BaseDirectory.Download })
   .then((resp) => {
    handleGpxFilenameStateChange(gpxFile.name)
   }).catch((err) => {
    console.log(err);
    console.log(gpxFile.name);
    handleGpxFilenameStateChange(null)
   }
  )
  }

export default uploadGpxFile;
