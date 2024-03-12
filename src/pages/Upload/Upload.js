import React from 'react';
import { Button } from '@material-ui/core';

const axios = require('axios');


class FileUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null
        };
    }

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "pdf_file",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        // Send formData object
        axios.post("http://127.0.0.1:8000/file-upload/", formData);
    };

    render() {
        return (
            <div>
                <input type="file" accept=".pdf" onChange={this.onFileChange} />
                <Button variant="contained" color="primary" onClick={this.onFileUpload}>
                    Upload!
                </Button>
            </div>
        );
    }
}

export default FileUpload;
