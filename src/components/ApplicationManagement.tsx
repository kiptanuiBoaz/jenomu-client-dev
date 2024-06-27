import { useQuery } from "@tanstack/react-query";
import { baseGet } from "../utils/apiClient";
import LoadingScreen from "./Loading";
import { Typography, Box, Chip, Stack, Button, InputBase, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const ApplicationManagement = () => {
    const { data: applications, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job_application/all/`),
        queryKey: ["applications"],
    });

    console.log(applications);

    if (isLoading) return <LoadingScreen />;
    if (isError) return <Typography>Something went wrong</Typography>;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'job_guid', headerName: 'Job', width: 150 },
        {
            field: 'user_guid',
            headerName: 'Applicant',
            width: 200,

        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params: any) => (
                <Chip label={params.value} color="primary" />
            ),
        },
        { field: 'comments', headerName: 'Comments', width: 200 },
        { field: 'submission_date', headerName: 'Submission Date', width: 150 },
        { field: 'created_at', headerName: 'Created At', width: 150 },
        { field: 'updated_at', headerName: 'Updated At', width: 150 },
    ];

    return (
        <Box style={{ height: 600, width: '100%' }}>
            <Stack>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, mt: 2 }}>
                    <Typography variant="h6"> All Applications</Typography>
                    <Button sx={{ textTransform: "none" }} variant="contained" startIcon={<AddIcon />} color="primary">
                        New Appplication
                    </Button>
                </Box>
                <Box sx={{ width: '100%', paddingY: 2 }}>
                    <InputBase
                        placeholder="Search jobs..."
                        fullWidth
                        sx={{ p: '7px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}
                        startAdornment={<IconButton size="small" sx={{ mr: 1 }}><SearchIcon /></IconButton>}
                    />
                </Box>
            </Stack>
            <DataGrid rows={applications} columns={columns} getRowId={(row) => row.id} />
        </Box>
    );
};

export default ApplicationManagement;
