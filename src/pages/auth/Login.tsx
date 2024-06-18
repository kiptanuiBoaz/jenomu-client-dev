import { Avatar, Box, Checkbox, Container, CssBaseline, FormControlLabel, FormLabel, Grid, Link, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { basePost } from '../../utils/apiClient';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();


    // Yup validation schema
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Add form submission logic here
            console.log(values);
        },
    });

    const handleSubmit = async () => {
        const values = formik.values;
        setLoading(true);
        try {
            const res = await basePost("/auth/login/", values);
            console.log(res);
            dispatch(login(res))
            navigate("/")
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
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <FormLabel error={error}>{errorMsg ?? ""}</FormLabel>
                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
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
                        Sign In
                    </LoadingButton>

                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2" href="/reset-password" >
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item> Don't have an account?
                            <Link variant="body2" href="/create-account" >
                                {" Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    );
};

export default Login;
