import React, { useState } from "react";
//import { useState } from "react";
import axios from "axios";

function Home() {

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [data, setData] = useState("");

  function handleUpload() {
    if (!file) {
      setMsg("No file selected");
      return;
    }
    const fd = new FormData();
    fd.append('pdf_file', file);

    setMsg("Uploading...");
    setProgress(prevState => {
      return { ...prevState, started: true }
    });
    axios.post('http://127.0.0.1:8000/file-upload/', fd, {
      onUploadProgress: (ProgressEvent) => {
        setProgress(prevState => {
          return { ...prevState, pc: ProgressEvent.progress * 100 }

        })
      },
      headers: {
        "customheader": "value",
        "Content-Type": "multipart/form-data",
      },
    })
      .then(res => {
        setMsg("Upload successful");
        setData(JSON.parse(JSON.stringify(res.data)))
        console.log(res.data)
      })


      .catch(err => {
        setMsg("Upload Failed");
        console.error(err)
      })
  }


  return (

    <div className="App">

      <h1> Upload </h1>


      <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" />
      <button onClick={handleUpload}>Upload</button>

      <br />

      {progress.started && <progress max='100' value={progress.pc} ></progress>}
      <br />
      {msg && <span>{msg}</span>}

      <div>
        <p>
          {data["Text"]}
        </p>
      </div>

    </div>

  );
}

export default Home;