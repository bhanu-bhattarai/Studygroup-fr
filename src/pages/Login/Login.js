import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '../../Components/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Typography, Link } from '@material-ui/core';
import * as Yup from 'yup';
import PwdField from '../../Components/PwdField';
import logo from '../../Icons/icon.png';
import axios from 'axios';
import { APP_BASE_URL } from '../../url';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(''); // State to store error message

    async function handleSubmit(values, { setErrors }) {
        try {
            const response = await axios.post(`${APP_BASE_URL}/users/login`, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const { userId, token } = response.data;

            // Store userId and token in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);

            // Clear error message (if any)
            setErrorMessage('');

            // Redirect to dashboard or another page
            navigate('/projects', { replace: true });
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors({
                    email: error.response.data.email || '',
                    password: error.response.data.password || ''
                });

                // Set error message to display
                setErrorMessage(error.response.data.message || 'Invalid credentials. Please try again.');
            } else {
                console.error('Error during login:', error);
                setErrorMessage('Login failed. Please check your internet connection and try again.');
            }
        }
    }

    return (
        <Box>
            <Grid
                style={{ height: '80vh' }}
                container
                justifyContent="center"
                alignItems="center">
                <Grid item xs={12} sm={6} lg={4}>
                    <Paper>
                        <Box padding={5}>
                            <Box textAlign="center">
                                <img src={logo} width="25%" alt="Logo" />
                                <Typography variant="h6" color="textSecondary">
                                    Sign In
                                </Typography>
                            </Box>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string().email('Invalid email').required('This field is Required'),
                                    password: Yup.string().required('This field is Required')
                                })}
                                onSubmit={handleSubmit}>
                                {() => (
                                    <Form>
                                        <Box mt={2}>
                                            <TextField
                                                name="email"
                                                type="email"
                                                label="Email"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box mt={2}>
                                            <PwdField
                                                name="password"
                                                label="Password" />
                                        </Box>
                                        {errorMessage && (
                                            <Box mt={2} color="error.main">
                                                <Typography variant="body2" color="error">
                                                    {errorMessage}
                                                </Typography>
                                            </Box>
                                        )}
                                        <Box mt={2}>
                                            <Button
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                color="primary"
                                                variant="contained">
                                                Login
                                            </Button>
                                        </Box>
                                        <Box mt={2} textAlign="center">
                                            <Link href="/forgot-password" variant="body2">
                                                Forgot Password?
                                            </Link>
                                        </Box>
                                        <Box mt={2} textAlign="center">
                                            <Typography variant="body2" color="textSecondary">
                                                Don't have an account?
                                            </Typography>
                                            <Link href="/signup" variant="body2">
                                                Sign Up
                                            </Link>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;
