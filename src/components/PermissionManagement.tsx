import { baseGet } from '../utils/apiClient';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from './Loading';
import { Typography, Box, Stack, Button, InputBase, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const PermissionManagement = () => {
    const { data: permissions, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/permissions/`),
        queryKey: ["permissions"],
    });

    if (isLoading) return <LoadingScreen />;
    if (isError) return <Typography>Something went wrong</Typography>;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'guid', headerName: 'GUID', width: 250 },
        { field: 'name', headerName: 'Name', width: 150 },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 200,
            valueFormatter: (params: any) => (params.value),
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            width: 200,
            valueFormatter: (params: any) => (params.value),
        },
    ];

    return (
        <Box style={{ height: "100%", width: '100%' }}>
            <Stack >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, mt: 2 }}>
                    <Typography variant="h6">All Users</Typography>
                    <Button sx={{ textTransform: "none" }} variant="contained" startIcon={<AddIcon />} color="primary">
                        New Permission
                    </Button>
                </Box>
                <Box sx={{ width: '100%', paddingY: 2 }}>
                    <InputBase
                        placeholder="Search permissions..."
                        fullWidth
                        sx={{ p: '7px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}
                        startAdornment={<IconButton size="small" sx={{ mr: 1 }}><SearchIcon /></IconButton>}
                    />
                </Box>
            </Stack>
            <DataGrid rows={permissions} columns={columns} />
        </Box>
    );
};

export default PermissionManagement;
