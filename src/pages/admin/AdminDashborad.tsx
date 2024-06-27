import {
    Box,
    Stack,
    Tab,
    Tabs,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { useState } from 'react';
import { FaUsers, FaUserShield, FaKey, FaBriefcase, FaFileAlt } from 'react-icons/fa';
import LoadingScreen from '../../components/Loading';
import NotFound from '../../components/NotFound';
import ApplicationManagement from '../../components/ApplicationManagement';
import PermissionManagement from '../../components/PermissionManagement';
import RoleManagement from '../../components/RoleManagement';
import UserManagement from '../../components/UserManagement';
import JobManagement from '../../components/JobManagement';

export default function AdminDashboard() {
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

    // const admin_id = query.get("admin_id");

    // const { data, isLoading, isError } = useQuery({
    //     queryFn: async () => await baseGet(`admin/v1/dashboard_summary/${admin_id}/`),
    //     queryKey: ["adminDashboard", admin_id],
    //     enabled: !!admin_id,
    // });

    const [currentTab, setCurrentTab] = useState('users');

    const TABS = [
        {
            value: 'users',
            label: 'Users',
            icon: <FaUsers />,
            component: <UserManagement />,
        },
        {
            value: 'roles',
            label: 'Roles',
            icon: <FaUserShield />,
            component: <RoleManagement />,
        },
        {
            value: 'permissions',
            label: 'Permissions',
            icon: <FaKey />,
            component: <PermissionManagement />,
        },
        {
            value: 'jobs',
            label: 'Jobs',
            icon: <FaBriefcase />,
            component: <JobManagement />,
        },
        {
            value: 'applications',
            label: 'Applications',
            icon: <FaFileAlt />,
            component: <ApplicationManagement />
        },
    ];

    // if (isLoading) return <LoadingScreen />;
    // if (isError) return <NotFound />;
    // if (!admin_id) return <NotFound />;

    return (
        <Box>
            <Box paddingLeft={!isMediumScreen ? "15px" : ""} paddingTop={"65px"} paddingRight={"20px"}>
                <Stack spacing={1} direction={isMediumScreen ? "column" : "row"}>
                    <Tabs
                        orientation={isMediumScreen ? "horizontal" : "vertical"}
                        value={currentTab}
                        onChange={(_event, newValue) => setCurrentTab(newValue)}
                        variant="scrollable"
                        scrollButtons="auto"
                        sx={{
                            marginTop: "30px",
                            color: "#1f2937",
                            borderBottom: isMediumScreen ? 1 : 0,
                            borderColor: '#1f2937',
                            position: isMediumScreen ? "fixed" : "relative",
                            bottom: isMediumScreen ? 0 : 'auto',
                            width: isMediumScreen ? "100%" : "160px",
                            backgroundColor: isMediumScreen ? theme.palette.background.paper : 'transparent',
                            alignItems: 'center',
                        }}
                    >
                        {TABS.map((tab) => (
                            <Tab
                                key={tab.value}
                                label={tab.label}
                                icon={tab.icon}
                                value={tab.value}
                                sx={{ justifyContent: 'left', textTransform: "none", }}
                            />
                        ))}
                    </Tabs>

                    {TABS.map(
                        (tab) => tab.value === currentTab && (
                            <Box key={tab.value} sx={{ width: ["80%", "80%",], marginTop: isMediumScreen ? 3 : 0 }}>
                                {tab.component}
                            </Box>
                        )
                    )}
                </Stack>
            </Box>
        </Box>
    );
}
