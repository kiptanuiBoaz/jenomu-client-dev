import { Box, Avatar, Typography, Button, Rating, IconButton, Stack, Grid } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { HOST_API_KEY } from '../config-global';
import EditProfileModal from './EditProfileModal';
import { MuiTelInput } from 'mui-tel-input';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormLabel } from '@mui/material';
import { basePatch } from '../utils/apiClient';
import { LoadingButton } from '@mui/lab';

const ResearcherProfile = ({ user: userInfo }: any) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const { user, profile } = userInfo;
    const [open, setOpen] = useState(false);
    const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);

    const validationSchema = Yup.object({
        phoneNumber: Yup.string().required('Phone Number is required'),
    });



    // Formik setup
    const formik = useFormik({
        initialValues: {
            phone_number: '',
        },
        validationSchema: validationSchema,
        onSubmit: async () => {

        },
    });


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditPhoneNumber = () => {
        setIsEditingPhoneNumber(!isEditingPhoneNumber);
    };


    const handleSubmit = async () => {
        setLoading(true);

        try {
            const res = await basePatch(`/v1/user/update/${userInfo.user.guid}/`, formik.values);
            console.log(res);
            setIsEditingPhoneNumber(false)
        } catch (error: any) {
            console.log("error:", error);
            setErrorMsg(error.message);
            setError(true);
        } finally {
            setLoading(false);
        }

    }


    return (
        <Box display="flex" flexDirection="column" alignItems="center" sx={{ backgroundColor: "#fff" }} p={2}>
            <Avatar
                alt={user.first_name}
                src={`${HOST_API_KEY}${profile.image}`}
                sx={{ width: 100, height: 100, mb: 2 }}
            />
            <Typography variant="h6">{user.first_name} {user.last_name}</Typography>
            <Typography >{user.role.name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
            <Box display="flex" alignItems="center" gap={1} flexDirection="column">
                {isEditingPhoneNumber ? (<Stack gap={1}>
                    <FormLabel error={error}>{errorMsg ?? ""}</FormLabel>
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
                    <Stack direction={"row"} justifyContent={"center"} gap={2}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} sm={6}>
                                <Button
                                    fullWidth={true}
                                    variant="outlined"
                                    sx={{ mt: 3, mb: 2, }}
                                    onClick={() => setIsEditingPhoneNumber(false)}
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <LoadingButton
                                    fullWidth={true}
                                    loadingPosition="end"
                                    loading={loading}
                                    onClick={
                                        async (e) => {
                                            handleSubmit();
                                            e.preventDefault()
                                            formik.submitForm()
                                        }}

                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, }}
                                >
                                    Save
                                </LoadingButton>
                            </Grid>
                        </Grid>


                    </Stack>


                </Stack>

                ) : (<>
                    <Typography variant="body2">{user.phone_number}   <IconButton onClick={handleEditPhoneNumber} size="small">
                        <EditIcon fontSize="small" />
                    </IconButton>
                    </Typography>

                    <Box
                        sx={{
                            '& > legend': { mt: 2 },
                        }}
                    >
                        <Rating size="small" name="read-only" value={4} readOnly />
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mt: 2 }}>
                        Edit Profile
                    </Button>
                </>

                )}

            </Box>

            <EditProfileModal open={open} handleClose={handleClose} userInfo={userInfo} />
        </Box>
    );
};

export default ResearcherProfile;


