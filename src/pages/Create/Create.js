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
    const [projectStatus, setProjectStatus] = useState('');
    const [projectLead, setProjectLead] = useState('');
    const [clientName, setClientName] = useState('');
    const [projectTemplate, setProjectTemplate] = useState('');
    const [file, setFile] = useState(null);

    const handleCreateProject = () => {
        const fd = new FormData();
        fd.append('pdf_file', file);
        fd.append('projectDescription', projectDescription);
        fd.append('projectStatus', projectStatus);
        fd.append('projectLead', projectLead);
        fd.append('projectTemplate', projectTemplate);
        fd.append('projectTitle', projectTitle);
        fd.append('clientName', clientName);
        fd.append('projectTitle', projectTitle);
        const project = {
            id: 3,
            title: projectTitle,
            status: projectStatus,
            description: projectDescription,
            projectLead: projectLead,
        }
        projectData.push(project);
        axios.post('http://127.0.0.1:8000/create-project/', fd, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
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
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={projectStatus}
                            onChange={(e) => setProjectStatus(e.target.value)}
                        >
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Completed">Completed</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel>Project Template</InputLabel>
                        <Select
                            value={projectTemplate}
                            onChange={(e) => setProjectTemplate(e.target.value)}
                        >
                            <MenuItem value="Template 1">Template 1</MenuItem>
                            <MenuItem value="Template 2">Template 2</MenuItem>
                        </Select>
                    </FormControl>
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
