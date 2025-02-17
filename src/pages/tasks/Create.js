import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "axios";
import { APP_BASE_URL, CREATE_TASK } from '../../url';
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    CircularProgress,
    Box
} from '@material-ui/core';

const CreateTask = () => {
    const query = new URLSearchParams(useLocation().search);
    const projectId = query.get('projectId'); // Get projectId from query parameter

    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskStatus, setTaskStatus] = useState(0); // Default status: To-Do
    const [timeToComplete, setTimeToComplete] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!projectId) {
            console.error("Project ID is required");
        }
    }, [projectId]);

    const handleCreateTask = async () => {
        setLoading(true);
        const data = {
            project_id: projectId,
            name: taskName,
            description: taskDescription,
            status: taskStatus,
            time_to_completed: timeToComplete,
            due_date: dueDate
        };
        try {
            await axios.post(`${APP_BASE_URL}${CREATE_TASK}`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            window.location.href = `/tasks/?projectId=${projectId}`;
        } catch (error) {
            console.error("Error creating task:", error);
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
                        Create a New Task
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="Project ID"
                                fullWidth
                                value={projectId}
                                InputProps={{ readOnly: true }} // Make Project ID non-editable
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Task Name"
                                fullWidth
                                value={taskName}
                                onChange={(e) => setTaskName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={4}
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Time to Complete (hours)"
                                fullWidth
                                value={timeToComplete}
                                onChange={(e) => setTimeToComplete(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Due Date"
                                type="date"
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateTask}
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

export default CreateTask;
