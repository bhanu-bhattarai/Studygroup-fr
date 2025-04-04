import React, { useState } from "react";
//import { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { APP_BASE_URL, FILE_UPLOAD, BUILD_DOC, DOWNLOAD_DOC } from '../url';

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
    axios.post(`${APP_BASE_URL}${FILE_UPLOAD}`, fd, {
      onUploadProgress: (ProgressEvent) => {
        setProgress(prevState => {
          return { ...prevState, pc: ProgressEvent.progress * 100 }

        })
      },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(async (res) => {
        await axios.get(`${APP_BASE_URL}${BUILD_DOC}`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        setMsg("Upload successful");
        setData(JSON.parse(JSON.stringify(res.data)))
      })
      .catch(err => {
        setMsg("Upload Failed");
        console.error(err)
      })
  }

  function handleDownload() {
    axios.get(`${APP_BASE_URL}${DOWNLOAD_DOC}`, {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: 'blob',
    })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'module.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(err => {
        setMsg("Download Failed");
        console.error(err)
      })
  }


  return (

    <div className="container mt-4">
      <div className="main">
        <div>
          <h1 className="mb-4"> <b> StudyGroup Inc. </b> </h1>
          <h5 className="mb-4">  Select File to upload  </h5>

          <div className="mb-3">

            <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" />

            <button onClick={handleUpload}>Upload</button>
          </div>
          <br />

          {progress.started && <progress max='100' value={progress.pc} ></progress>}
          <br />
          {msg && <span>{msg}</span>}
          <br />
          <br />
        </div>
        <div>
          {(msg && msg === "Upload successful") && <button className="btn btn-dark" onClick={handleDownload}>Download</button>}
        </div>
      </div>

      <div className="container mt-4">
        {
          data["text"] && <p>
            {data["text"]}
          </p>
        }
      </div>

    </div>

  );
}

export default Home;