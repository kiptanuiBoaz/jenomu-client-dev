import Avatar from '@mui/material/Avatar';
import { LoadingButton } from '@mui/lab';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { MuiTelInput } from 'mui-tel-input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Modal, Fade, Backdrop, FormLabel } from '@mui/material';
import { basePost } from '../utils/apiClient';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const validationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    role_guid: Yup.string().required('Role is required'),
    phone_number: Yup.string().required('Phone Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

const EditProfileModal = ({ open, handleClose, userInfo }: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const formik = useFormik({
        initialValues: {
            first_name: userInfo.user.first_name,
            last_name: userInfo.user.last_name,
            role_guid: userInfo.user.role_guid,
            phone_number: userInfo.user.phone_number,
            email: userInfo.user.email,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await basePost("/v1/user/update/", formik.values);
            handleClose();
        } catch (error: any) {
            setErrorMsg(error.message);
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            padding: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Edit Profile
                        </Typography>
                        <FormLabel error={error}>{errorMsg ?? ""}</FormLabel>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
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
                                        placeholder="Phone Number"
                                        fullWidth
                                        name="phone_number"
                                        value={formik.values.phone_number}
                                        onChange={(newValue) => formik.setFieldValue('phone_number', newValue)}
                                        onBlur={formik.handleBlur}
                                        defaultCountry="CA"
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

                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Update Profile
                            </LoadingButton>
                        </Box>
                    </Box>
                </Container>
            </Fade>
        </Modal>
    );
};

export default EditProfileModal;
