import Button from "react-bootstrap/Button";
import { save } from '@tauri-apps/plugin-dialog';
import { writeTextFile, BaseDirectory } from '@tauri-apps/plugin-fs';

function DownloadTemplateButton({ editor }) {
  const downloadTemplate = async () => {
    const path = await save(
    {
      filters: [
        {
          name: 'json_only',
          extensions: ['json'],
        },
      ],
    });
    const jsonString = JSON.stringify(editor.getValue(), null, 2);
    await writeTextFile(path, jsonString)
    .then((resp) => {
      console.log("saved custom template");
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <Button variant="secondary" onClick={downloadTemplate} className="m-1">
      Download Template
    </Button>
  );
}

export default DownloadTemplateButton;
