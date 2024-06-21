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
import { Modal, Fade, Backdrop, FormLabel, IconButton, Autocomplete } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { basePatch } from '../utils/apiClient';
import { HOST_API_KEY } from '../config-global';
import { useDispatch } from 'react-redux';
import { login, setUserInfo } from '../redux/slices/authSlice';
import { top100SkillsInMedicalResearch } from '../utils/data';

const validationSchema = Yup.object({
    specialty: Yup.string().required('Specialy is required'),
});

const EditProfileModal = ({ open, handleClose, userInfo }: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [avatar, setAvatar] = useState(`${HOST_API_KEY}${userInfo.profile.image}`);
    const [skills, setSkills] = useState<string[]>([]);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            specialty: userInfo.profile.specialty,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        }
    });


    const handleSubmit = async () => {

        setLoading(true);
        try {
            const res = await basePatch(`/v1/profile/update/`, { specialty: [formik.values.specialty], skills, image: avatar });
            dispatch(setUserInfo(res))
            // handleClose();
        } catch (error: any) {
            setErrorMsg(error.message);
            setError(true);
        } finally {
            setLoading(false);
        }
    };


    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
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
                        <Box sx={{ position: 'relative', mb: 2 }}>
                            <Avatar sx={{ width: 100, height: 100 }} src={avatar} />
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="label"
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    right: 0,
                                    backgroundColor: 'white',
                                }}
                            >
                                <input hidden accept="image/*" type="file" onChange={handleAvatarChange} />
                                <PhotoCamera />
                            </IconButton>
                        </Box>
                        <Typography component="h1" variant="h5">
                            Edit Profile
                        </Typography>
                        <FormLabel error={error}>{errorMsg ?? ""}</FormLabel>
                        <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        autoComplete="given-name"
                                        name="specialty"
                                        required
                                        fullWidth
                                        id="specialty"
                                        label="Specialty"
                                        autoFocus
                                        value={formik.values.specialty}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.specialty && Boolean(formik.errors.specialty)}
                                        helperText={formik.touched.specialty && formik.errors.specialty as string}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Autocomplete
                                        fullWidth={true}
                                        onChange={(_e, v: Array<string>) => setSkills(v)}
                                        multiple
                                        limitTags={2}
                                        id="multiple-limit-tags"
                                        options={top100SkillsInMedicalResearch}
                                        getOptionLabel={(option) => option}

                                        renderInput={(params) => (
                                            <TextField {...params} fullWidth={true} label="Skills" placeholder="Select a maximum of five skills" />
                                        )}
                                    />
                                </Grid>



                            </Grid>
                            <LoadingButton
                                loadingPosition="end"
                                loading={loading}
                                onClick={
                                    async (e) => {
                                        handleSubmit();
                                        e.preventDefault();
                                        formik.submitForm();
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
