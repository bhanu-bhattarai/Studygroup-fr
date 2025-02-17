import React, { useState, useEffect } from 'react';
import handleDownload from '../../Components/Download';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Button,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { APP_BASE_URL, VIEW_PROJECT } from '../../url';

const ProjectDisplay = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const [project, setProjectData] = useState([]);
    useEffect(() => {
        axios.get(`${APP_BASE_URL}${VIEW_PROJECT}?id=${id}`, {
            headers: {
                "Content-Type": "application/json",
            },
            responseType: 'json',
        })
            .then(res => {
                console.log(res.data)
                setProjectData(res.data.data)
            })
            .catch(err => {
                console.error(err)
            })
    }, [id]);
    const { title, description, status, project_lead, client_name, builds } = project;

    return (
        <Container>
            <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h5" gutterBottom>
                    Project Details
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            Project Title: <strong>{title}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            Project Description: {description}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            Project Status: <strong>{status}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            Project Lead: <strong>{project_lead}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            Client Name: <strong>{client_name}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {(Array.isArray(builds) ? builds : []).map((build, index) => (
                            <Typography variant="subtitle1" key={index}>
                                <strong>{JSON.stringify(build)}</strong>
                                <hr />  { }
                            </Typography>
                        ))}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleDownload(project._id)}>
                            Download Project Template
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ProjectDisplay;
