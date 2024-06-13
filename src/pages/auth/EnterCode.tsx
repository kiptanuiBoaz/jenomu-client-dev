import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const EnterCodeForm = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        code: Yup.string()
            .length(4, 'Code must be exactly 4 digits')
            .required('Code is required'),
    });

    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Add form submission logic here
            console.log(values);
            navigate('/set-new-password');
        },
    });

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
                <Typography variant='body2'>A 4-digit code has been sent to your email</Typography>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="code"
                        label="Verification Code"
                        name="code"
                        autoComplete="off"
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit Code
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EnterCodeForm;
