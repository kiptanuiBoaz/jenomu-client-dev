import { LoadingButton } from '@mui/lab';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { basePost } from '../utils/apiClient';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { getUserInfoState } from '../redux/slices/authSlice';
import { Notify } from 'notiflix';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    submission_date: Yup.date().required('Submission date is required'),
    comment: Yup.string().required('Comment is required'),
});

const JobApplicationModal = ({ open, handleClose, jobId }: { open: boolean, handleClose: () => void, jobId: string }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();

    const { user } = useSelector(getUserInfoState);

    const formik = useFormik({
        initialValues: {
            submission_date: '',
            comments: '',
        },
        validationSchema: validationSchema,
        onSubmit: () => { },
    });

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const res = await basePost(`/v1/job_application/create/`, { ...formik.values, job_guid: jobId, user_guid: user.user.guid });
            console.log(res);
            Notify.success("Application submitted successfully")
            handleClose();
            navigate("/freelancer")
        } catch (error: any) {
            console.log("error:", error);
            setErrorMsg(error.message);
            setError(true);
        } finally {
            setLoading(false);
        }

    }


    return (
        <Dialog open={open} onClose={handleClose}>
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle>Submit your application</DialogTitle>
                <FormLabel error={error}>{errorMsg ?? ""}</FormLabel>
                <DialogContent>
                    <TextField
                        required
                        fullWidth
                        placeholder='When do you forsee submitted the work'
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="comments"
                        label="Comments"
                        type="text"
                        placeholder="Say something you want to be included in your application"
                        fullWidth
                        multiline
                        rows={4}
                        value={formik.values.comments}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.comments && Boolean(formik.errors.comments)}
                        helperText={formik.touched.comments && formik.errors.comments}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <LoadingButton

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
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default JobApplicationModal;
