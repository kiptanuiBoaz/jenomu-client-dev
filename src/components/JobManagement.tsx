import { baseGet } from '../utils/apiClient';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from './Loading';
import { Typography, Box, Chip, Stack, Button, InputBase, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const JobManagement = () => {
    const { data: jobs, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/job/all/`),
        queryKey: ["jobs"],
    });

    if (isLoading) return <LoadingScreen />;
    if (isError) return <Typography>Something went wrong</Typography>;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'job_type',
            headerName: 'Job Type',
            width: 110,
            renderCell: (params: any) => (
                <Chip variant={"outlined"} label={params.value} color="primary" />
            ),
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 90,
            renderCell: (params: any) => (
                <Chip label={params.value} color="secondary" />
            ),
        },
        { field: 'proposed_budget', headerName: 'Proposed($)', width: 90, type: 'number' },
        { field: 'agreed_budget', headerName: 'Agreed($)', width: 90, type: 'number' },
        {
            field: 'start_date',
            headerName: 'Start Date',
            width: 110,
            valueFormatter: (params: any) => (params.value),
        },
        {
            field: 'end_date',
            headerName: 'End Date',
            width: 110,
            valueFormatter: (params: any) => (params.value),
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 100,
            valueFormatter: (params: any) => (params.value),
        },
        {
            field: 'manager',
            headerName: 'Manager',
            width: 200,
            valueGetter: (params: any) => { console.log(params); return params.email ?? "" },
        },
        {
            field: 'skills_required',
            headerName: 'Skills Required',
            width: 300,
            renderCell: (params: any) => (
                <Box style={{ display: 'flex', overflowX: 'auto', maxWidth: '100%', height: '100%' }}>
                    {params.row.skills_required.map((skill: string, index: number) => (
                        <Chip size="small" variant="outlined" color="primary" key={index} label={skill} style={{ marginRight: 4 }} />
                    ))}
                </Box>
            ),
        },
    ];

    return (
        <Box style={{ height: 600, width: '100%' }}>
            <Stack>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, mt: 2 }}>
                    <Typography variant="h6"> All Jobs</Typography>
                    <Button sx={{ textTransform: "none" }} variant="contained" startIcon={<AddIcon />} color="primary">
                        New Job
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
            <DataGrid
                rows={jobs}
                columns={columns}
                getRowId={(row) => row.id}
            />
        </Box>
    );
};

export default JobManagement;
