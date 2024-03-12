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

function Login(props) {
    function handleSubmit(values, { setErrors }) {

    }

    return (
        <Box>
            <Grid
                style={{ height: '80vh' }}
                container
                justify='center'
                alignItems='center'>
                <Grid item xs={12} sm={6} lg={4}>
                    <Paper>
                        <Box padding={5}>
                            <Box textAlign='center'>
                                <img src={logo} width='25%' alt='' />
                                <Typography variant='h6' color='textSecondary'>
                                    Sign In
                                </Typography>
                            </Box>
                            <Formik
                                initialValues={{
                                    email: '',
                                    password: ''
                                }}
                                validationSchema={Yup.object({
                                    email: Yup.string().required('This field is Required'),
                                    password: Yup.string().required('This field is Required')
                                })}
                                onSubmit={handleSubmit}>
                                {({ values }) => (
                                    <Form>
                                        <Box mt={2}>
                                            <TextField
                                                name='email'
                                                type='email'
                                                label='Email'
                                                variant='outlined'
                                                fullWidth
                                            />
                                        </Box>
                                        <Box mt={2}>
                                            <PwdField
                                                name='password'
                                                label='Password' />
                                        </Box>
                                        <Box mt={2}>
                                            <Button
                                                fullWidth
                                                width='100%'
                                                size='large'
                                                type='submit'
                                                color='primary'
                                                variant='contained'>
                                                Login
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

export default Login;