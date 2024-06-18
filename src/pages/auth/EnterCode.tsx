import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, FormLabel } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { basePost } from '../../utils/apiClient';

const EnterCode = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const validationSchema = Yup.object({
        code: Yup.string()
            .length(4, 'Code must be exactly 4 digits')
            .required('Code is required'),
    });

    const formik = useFormik({
        initialValues: {
            token: '',
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
            const res = await basePost("/auth/password_reset/validate_token/", values);
            console.log(res);
            navigate("/set-new-password");
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
                    Enter Code
                </Typography>
                <FormLabel error={error}>{errorMsg ?? ""}</FormLabel>
                <Typography variant='body2'>A 4-digit code has been sent to your email</Typography>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="token"
                        label="Verification Code"
                        name="token"
                        autoComplete="off"
                        value={formik.values.token}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.token && Boolean(formik.errors.token)}
                        helperText={formik.touched.token && formik.errors.token}
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
                        Submit Code
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
};

export default EnterCode;
