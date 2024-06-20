import Avatar from '@mui/material/Avatar';
import { LoadingButton } from '@mui/lab';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { MuiTelInput } from 'mui-tel-input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { basePost } from '../../utils/apiClient';

const CreateAccount = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();

    // Yup validation schema
    const validationSchema = Yup.object({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        role_guid: Yup.string().required('Role is required'),
        phoneNumber: Yup.string().required('Phone Number is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    // useEffect(() => {

    //     const get_roles = async () => {
    //         try {
    //             const roles = await baseGet("/v1/role/");
    //             console.log(roles, "roles");

    //         } catch (error) {
    //             console.log(error)
    //         }

    //     }
    //     get_roles();

    // }, [])



    // Formik setup
    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            role_guid: 'freelancer',
            phone_number: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: async () => {

        },
    });

    const handleSubmit = async () => {
        const values = formik.values;
        setLoading(true);
        const { confirmPassword, ...newValues } = values;
        try {
            const res = await basePost("/v1/user/register/", { ...newValues, is_active: true });
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

    console.log(formik.values)

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
                    Sign up
                </Typography>
                <FormLabel error={error}>{errorMsg ?? ""}</FormLabel>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="given-name"
                                name="first_name"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                helperText={formik.touched.first_name && formik.errors.first_name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="last_name"
                                autoComplete="family-name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.last_name && formik.errors.last_name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                required
                                fullWidth
                                id="role"
                                label="Role"
                                name="role_guid"
                                value={formik.values.role_guid}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.role_guid && Boolean(formik.errors.role_guid)}
                                helperText={formik.touched.role_guid && formik.errors.role_guid}
                            >
                                <MenuItem value="freelancer">Freelancer</MenuItem>
                                <MenuItem value="researcher">Researcher</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <MuiTelInput
                                placeholder='Phone Number'
                                fullWidth
                                name="phone_number"
                                value={formik.values.phone_number}
                                onChange={(newValue) => formik.setFieldValue('phone_number', newValue)}
                                onBlur={formik.handleBlur}
                                defaultCountry='CA'
                                error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                                helperText={formik.touched.phone_number && formik.errors.phone_number}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
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
                        </Grid>

                    </Grid>
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
                        Sign Up
                    </LoadingButton>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateAccount;
