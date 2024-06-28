import { useQuery } from "@tanstack/react-query";
import { baseGet } from "../utils/apiClient";
import LoadingScreen from "./Loading";
import { Typography, Box, Chip, Stack, Button, InputBase, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const RoleManagement = () => {
    const { data: roles, isLoading, isError } = useQuery({
        queryFn: async () => await baseGet(`/v1/role/all/`),
        queryKey: ["roles"],
    });

    if (isLoading) return <LoadingScreen />;
    if (isError) return <Typography>Something went wrong</Typography>;

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
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
        {
            field: 'permissions',
            headerName: 'Permissions',
            width: 300,
            renderCell: (params) => (

                <Box>
                    {params.row.permission_guid.map((perm: any) => (
                        <Chip
                            key={perm.id}
                            variant="outlined"
                            color={perm.name === "create" ? "info" : "error"}
                            label={perm.name}
                            style={{ margin: 2 }}
                        />
                    ))}
                </Box>
            )
            ,
            valueGetter: (params: any) => params?.row
        },
    ];

    return (
        <Box style={{ height: 600, width: '100%' }}>
            <Stack >
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1, mt: 2 }}>
                    <Typography variant="h6">All Users</Typography>
                    <Button sx={{ textTransform: "none" }} variant="contained" startIcon={<AddIcon />} color="primary">
                        New Role
                    </Button>
                </Box>
                <Box sx={{ width: '100%', paddingY: 2 }}>
                    <InputBase
                        placeholder="Search roles..."
                        fullWidth
                        sx={{ p: '7px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}
                        startAdornment={<IconButton size="small" sx={{ mr: 1 }}><SearchIcon /></IconButton>}
                    />
                </Box>
            </Stack>
            <DataGrid rows={roles} columns={columns} />
        </Box>
    );
};

export default RoleManagement;
