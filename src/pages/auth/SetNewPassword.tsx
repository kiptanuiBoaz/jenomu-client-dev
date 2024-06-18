import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, FormLabel } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { basePost } from '../../utils/apiClient';
import { LoadingButton } from '@mui/lab';

const SetNewPassword = () => {

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [token, setToken] = useState<string>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const params = Object.fromEntries([...searchParams]);
    console.log('Mounted:', params);

    useEffect(() => {
        const currentParams = Object.fromEntries([...searchParams]);
        console.log('useEffect:', currentParams);
        if (!currentParams.token) {
            navigate("/reset-password");
        } else {
            setToken(currentParams.token)
        }

    }, [searchParams, setSearchParams]);

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'),], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
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
        const { confirmPassword, ...newValues } = values;
        try {
            const res = await basePost("/auth/password_reset/confirm/", { ...newValues, token });
            console.log(res);
            navigate("/login")
        } catch (error: any) {
            console.log("error:", error);
            setErrorMsg(error.message);
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
                    Set New Password
                </Typography>
                <FormLabel error={error}>{errorMsg ?? ""}</FormLabel>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>

                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                        Set Password
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
};

export default SetNewPassword;
