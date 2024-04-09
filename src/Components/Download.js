//import { useState } from "react";
import axios from "axios";
function handleDownload(project_id) {
    axios.get(`http://127.0.0.1:8000/download-doc/${project_id}/`, {
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
            console.error(err)
        })
}
export default handleDownload