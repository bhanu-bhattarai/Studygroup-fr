import React, { useState } from 'react';
import axios from "axios";
import projectData from "../projects/DummyProjects";
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Container,
    Typography,
    Grid,
} from '@material-ui/core';

const CreateProject = () => {
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectLead, setProjectLead] = useState('');
    const [clientName, setClientName] = useState('');
    const [file, setFile] = useState(null);

    const handleCreateProject = async () => {
        const fd = new FormData();
        fd.append('pdf_file', file);
        fd.append('description', projectDescription);
        fd.append('status', "Completed");
        fd.append('project_lead', projectLead);
        fd.append('title', projectTitle);
        fd.append('clientName', clientName);
        await axios.post('http://127.0.0.1:8000/create-project/', fd, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
        window.location.href = '/projects'
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Create a New Project
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        label="Project Title"
                        fullWidth
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Project Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Project Lead"
                        fullWidth
                        value={projectLead}
                        onChange={(e) => setProjectLead(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Client Name"
                        fullWidth
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <label htmlFor="project-template-upload">Upload Project Template&nbsp;</label>
                    <input onChange={(e) => { setFile(e.target.files[0]) }} type="file" accept=".pdf"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCreateProject}
                    >
                        Create Project
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreateProject;
