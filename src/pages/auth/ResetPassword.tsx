import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormLabel, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { basePost } from '../../utils/apiClient';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [sent, setSent] = useState(false);

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Enter a valid email').required('Email is required'),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        },

    });

    const handleSubmit = async () => {
        const values = formik.values;
        setLoading(true);
        try {
            const res = await basePost("/auth/password_reset/", values);
            console.log(res);
            setSent(true);
        } catch (error: any) {
            console.log("error:", error);
            setErrorMsg(error.detail);
            setError(true);
        } finally {
            setLoading(false);

        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />

            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                {sent
                    ? <>
                        <Typography component="h1" variant="h5">
                            Password Sent!
                        </Typography>

                        <Typography variant='body2'>Check {formik.values.email} for a link and click on it to reset your password</Typography>
                        <Grid item>
                            <Link href="/reset-password" variant="body2">
                                I did not recieve the link? Resend
                            </Link>
                        </Grid>
                    </>
                    : <>

                        <Typography component="h1" variant="h5">
                            Reset Password
                        </Typography>
                        <FormLabel error={error}>{errorMsg ?? ""}</FormLabel>
                        <Typography variant='body2'>A 4-digit code will be sent to your email</Typography>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />

                            <LoadingButton
                                loadingPosition="end"
                                loading={loading}
                                onClick={
                                    async (e) => {
                                        handleSubmit();
                                        e.preventDefault()
                                        formik.submitForm()
                                    }}
                                // type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Reset Password
                            </LoadingButton>
                        </Box>
                    </>}
            </Box>
        </Container>
    );
};

export default ResetPassword;
