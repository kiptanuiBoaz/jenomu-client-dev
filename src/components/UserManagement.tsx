import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Chip, Avatar, Rating, Typography, Button, InputBase, IconButton, Stack } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { baseGet } from '../utils/apiClient';
import LoadingScreen from './Loading';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { stringAvatar } from '../utils/utils';



const UserManagement = () => {
    const handleEditCellChangeCommitted = (params: any) => {
        console.log(params); // Handle your update logic here
    };

    const columns: GridColDef[] = [
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 70,
            renderCell: (params) => {
                console.log(params)
                return (
                    <Avatar  {...stringAvatar(`${params.row.first_name}${" "}${params.row.last_name}`), { p: 1 }} sizes="small" src={params.value} alt={params.row.first_name} />
                )
            },
        },
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'first_name', headerName: 'First Name', width: 100 },
        { field: 'last_name', headerName: 'Last Name', width: 100 },
        { field: 'email', headerName: 'Email', width: 200 },
        {
            field: 'role',
            headerName: 'Role',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value.name}
                    color={params.value.name === "freelancer" ? "primary" : params.value.name === "admin" ? "info" : "warning"}
                    variant="outlined"
                />
            ),
        },
        {
            field: 'is_active',
            headerName: 'Status',
            width: 90,
            editable: true,
            type: 'boolean',
            renderCell: (params) => (
                <Chip
                    label={params.value ? 'Active' : 'Inactive'}
                    color={params.value ? 'success' : 'default'}
                    variant="outlined"
                />
            ),
        },
        {
            field: 'rating',
            headerName: 'Rating',
            width: 150,
            renderCell: (params) => (
                <Rating value={params.value} readOnly />
            ),
        },
        {
            field: 'created_at',
            headerName: 'Date Created',
            width: 160,
            sortable: false,
            valueFormatter: (params: any) => (params.value),
        },
        {
            field: 'updated_at',
            headerName: 'Last Update',
            width: 160,
            sortable: false,
            valueFormatter: (params: any) => (params.value),
        },
    ];


    const { data: rows, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/user/all/`),
        queryKey: ["users"],
    });


    if (isLoading) return <LoadingScreen />
    if (isError) return <Typography>Something went wrong</Typography>;


    return (
        <Box sx={{ maxWidth: "100%" }}>
            <Stack >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, mt: 2 }}>
                    <Typography variant="h6">All Users</Typography>
                    <Button sx={{ textTransform: "none" }} variant="contained" startIcon={<AddIcon />} color="primary">
                        New User
                    </Button>
                </Box>
                <Box sx={{ width: '100%', paddingY: 2 }}>
                    <InputBase
                        placeholder="Search users..."
                        fullWidth
                        sx={{ p: '7px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}
                        startAdornment={<IconButton size="small" sx={{ mr: 1 }}><SearchIcon /></IconButton>}
                    />
                </Box>
            </Stack>
            <DataGrid

                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                onCellEditStop={handleEditCellChangeCommitted}
            />
        </Box>
    );
};

export default UserManagement;
