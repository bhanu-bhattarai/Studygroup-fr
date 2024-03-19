import React from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Button,
} from '@material-ui/core';

const ProjectDisplay = () => {
    const project =
    {
        id: 1,
        title: 'Z Corp Digital Strategy Assessment',
        status: 'Ready',
        description: 'Development of Z Corp\'s strategy for the digital campaign',
        projectLead: 'Mimi Thompson'
    }
    const { title, description, status, projectLead, clientName, projectTemplate } = project;

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
                            Project Lead: <strong>{projectLead}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            Client Name: <strong>{clientName}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            Project Template: <strong>{projectTemplate}</strong>
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary">
                            Download Project Template
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ProjectDisplay;
