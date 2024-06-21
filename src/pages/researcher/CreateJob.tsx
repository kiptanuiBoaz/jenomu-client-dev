import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { basePost } from '../../utils/apiClient';
import { Autocomplete, MenuItem } from '@mui/material';
import { FormLabel } from '@mui/material';
import { top100SkillsInMedicalResearch } from '../../utils/data';
import { useSelector } from 'react-redux';
import { getUserInfoState } from '../../redux/slices/authSlice';
import { Notify } from 'notiflix';

const CreateJob = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const { user } = useSelector(getUserInfoState);

    const [skillsRequired, setSkillsRequired] = useState<string[]>([]);

    const navigate = useNavigate();

    // Yup validation schema
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required').max(200),
        description: Yup.string().required('Description is required'),
        job_type: Yup.string().required('Job Type is required').max(200),
        status: Yup.string().required('Status is required').max(200),
        start_date: Yup.string().required('Start Date is required'),
        end_date: Yup.string().required('End Date is required'),
        proposed_budget: Yup.number().required('Proposed Budget is required'),
        submission_date: Yup.string().required('Submission Date is required'),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            job_type: '',
            start_date: '',
            end_date: '',
            proposed_budget: 0,
            submission_date: '',
            agreed_budget: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log(values);
        },
    });

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const res = await basePost("/v1/job/create/", { ...formik.values, skills_required: skillsRequired });
            console.log(res);
            Notify.success("Job created successfully")
            navigate("/researcher");
        } catch (error: any) {
            console.log("error:", error);
            setErrorMsg("Something went wrong,try again");
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    console.log({ ...formik.values, skillsRequired })

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Create Job
                </Typography>
                <FormLabel error={error}>{errorMsg ?? ""}</FormLabel>
                <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                required
                                fullWidth
                                id="job_type"
                                label="Job Type"
                                name="job_type"
                                value={formik.values.job_type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.job_type && Boolean(formik.errors.job_type)}
                                helperText={formik.touched.job_type && formik.errors.job_type}
                            >
                                <MenuItem value="freelance">Freelance</MenuItem>
                                <MenuItem value="contract">Contract</MenuItem>
                                <MenuItem value="long-term">Long Term</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                multiline
                                minRows={6}
                                maxRows={10}
                                id="description"
                                label="Description"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && Boolean(formik.errors.description)}
                                helperText={formik.touched.description && formik.errors.description}
                                InputProps={{
                                    sx: {
                                        "&:focus-within .MuiOutlinedInput-notchedOutline": {
                                            borderColor: 'primary.main',
                                        }
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Autocomplete
                                fullWidth={true}
                                onChange={(_e, v: Array<string>) => setSkillsRequired(v)}
                                multiple
                                limitTags={2}
                                id="multiple-limit-tags"
                                options={top100SkillsInMedicalResearch}
                                getOptionLabel={(option) => option}

                                renderInput={(params) => (
                                    <TextField {...params} fullWidth={true} label="Required skills" placeholder="Select a maximum of five skills" />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                id="start_date"
                                label="Start Date"
                                name="start_date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.start_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                                helperText={formik.touched.start_date && formik.errors.start_date}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                id="end_date"
                                label="End Date"
                                name="end_date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.end_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                                helperText={formik.touched.end_date && formik.errors.end_date}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                id="proposed_budget"
                                label="Proposed Budget"
                                name="proposed_budget"
                                type="number"
                                value={formik.values.proposed_budget}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.proposed_budget && Boolean(formik.errors.proposed_budget)}
                                helperText={formik.touched.proposed_budget && formik.errors.proposed_budget}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                fullWidth
                                id="submission_date"
                                label="Submission Date"
                                name="submission_date"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={formik.values.submission_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.submission_date && Boolean(formik.errors.submission_date)}
                                helperText={formik.touched.submission_date && formik.errors.submission_date}
                            />
                        </Grid>
                    </Grid>
                    <LoadingButton
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
                        Create Job
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    );
};

export default CreateJob;

