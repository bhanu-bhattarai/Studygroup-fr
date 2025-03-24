import React from 'react';
import { Form, Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '../../Components/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import * as Yup from 'yup';
import PwdField from '../../Components/PwdField';
import logo from '../../Icons/icon.png';
import { APP_BASE_URL } from '../../url';
import { useNavigate } from 'react-router-dom';


function Signup(props) {
    const navigate = useNavigate();
    function handleSubmit(values, { setErrors }) {
        const { firstName, lastName, email, password, confirmPassword } = values;

        // Check if passwords match
        if (password !== confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }

        // Call signup API
        fetch(`${APP_BASE_URL}/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ firstname: firstName, lastname: lastName, email, password }),
        })
            .then(async (response) => {
                const data = await response.json();

                if (!response.status == 201) {
                    // Handle API errors
                    throw new Error(data.message || 'Error occurred during signup');
                }

                // Redirect to login page
                navigate('/login');
            })
            .catch((error) => {
                // Handle errors, e.g., invalid input or server issues
                setErrors({ email: error.message });
            });
    }

    return (
        <Box>
            <Grid
                style={{ height: '80vh' }}
                container
                justifyContent="center"
                alignItems="center"
            >
                <Grid item xs={12} sm={6} lg={4}>
                    <Paper>
                        <Box padding={5}>
                            <Box textAlign="center">
                                <img src={logo} width="25%" alt="" />
                                <Typography variant="h6" color="textSecondary">
                                    Sign Up
                                </Typography>
                            </Box>
                            <Formik
                                initialValues={{
                                    firstName: '',
                                    lastName: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: ''
                                }}
                                validationSchema={Yup.object({
                                    firstName: Yup.string().required('This field is Required'),
                                    lastName: Yup.string().required('This field is Required'),
                                    email: Yup.string().email('Invalid email').required('This field is Required'),
                                    password: Yup.string().required('This field is Required'),
                                    confirmPassword: Yup.string()
                                        .required('This field is Required')
                                        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
                                })}
                                onSubmit={handleSubmit}
                            >
                                {() => (
                                    <Form>
                                        <Box mt={2}>
                                            <TextField
                                                name="firstName"
                                                type="text"
                                                label="First Name"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box mt={2}>
                                            <TextField
                                                name="lastName"
                                                type="text"
                                                label="Last Name"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Box>
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
                                                label="Password"
                                            />
                                        </Box>
                                        <Box mt={2}>
                                            <PwdField
                                                name="confirmPassword"
                                                label="Confirm Password"
                                            />
                                        </Box>
                                        <Box mt={2}>
                                            <Button
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                color="primary"
                                                variant="contained"
                                            >
                                                Sign Up
                                            </Button>
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

export default Signup;
