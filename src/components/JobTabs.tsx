import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { resetFilterFields, setJobTabs } from '../redux/slices/filterSlice';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function JobsTabs() {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        dispatch(resetFilterFields());
        setValue(newValue);
        dispatch(setJobTabs(newValue));
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab sx={{ textTransform: "none" }} label="All " {...a11yProps(0)} />
                    <Tab sx={{ textTransform: "none" }} label="Best Match" {...a11yProps(1)} />
                    <Tab sx={{ textTransform: "none" }} label="Most Recent" {...a11yProps(2)} />
                </Tabs>
            </Box>
        </Box>
    );
}
