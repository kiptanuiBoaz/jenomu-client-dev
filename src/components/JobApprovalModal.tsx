import { LoadingButton } from '@mui/lab';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormLabel, MenuItem } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { basePatch } from '../utils/apiClient';
import { useState } from 'react';
import { Notify } from 'notiflix';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
    status: Yup.string().required('Status is required'),
});

const JobApprovalModal = ({ open, handleClose, applicationId, applicationStatus }: { open: boolean, handleClose: () => void, applicationId: string, applicationStatus: string }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);

    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            status: applicationStatus
        },
        validationSchema: validationSchema,
        onSubmit: () => { },
    });

    const handleSubmit = async () => {
        setLoading(true);

        try {
            const res = await basePatch(`/v1/job_application/update/${applicationId}/`, formik.values);
            console.log(res);
            Notify.success("Application approved successfully")
            handleClose();
            navigate("/researcher")
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
                        select
                        required
                        fullWidth
                        id="status"
                        label="Application Status"
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.status && Boolean(formik.errors.status)}
                        helperText={formik.touched.status && formik.errors.status}
                    >
                        <MenuItem value="submitted">Submitted</MenuItem>
                        <MenuItem value="approved">Approved</MenuItem>
                    </TextField>
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

export default JobApprovalModal;
