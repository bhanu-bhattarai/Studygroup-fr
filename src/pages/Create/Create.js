import React, { useState } from 'react';
import axios from "axios";
import { APP_BASE_URL, CREATE_PROJECT } from '../../url';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    CircularProgress,
    Box
} from '@material-ui/core';

const CreateProject = () => {
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateProject = async () => {
        setLoading(true);
        const data = {
            name: projectTitle,
            description: projectDescription
        };
        try {
            await axios.post(`${APP_BASE_URL}${CREATE_PROJECT}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            window.location.href = '/projects';
        } catch (error) {
            console.error("Error creating project:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            {loading && (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress color="inherit" />
                </Box>
            )}
            {!loading && (
                <>
                    <Typography variant="h4" gutterBottom>
                        Create a New Group
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Title"
                                fullWidth
                                value={projectTitle}
                                onChange={(e) => setProjectTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                value={projectDescription}
                                onChange={(e) => setProjectDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateProject}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    );
};

export default CreateProject;
