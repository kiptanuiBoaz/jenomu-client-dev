import React, { useState } from 'react';
import {
    Drawer, List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse, MenuItem, OutlinedInput, Typography,
    SelectChangeEvent,
    Box,
    Select,
    useMediaQuery,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedStatuses, setSortField } from '../redux/slices/jobsSlice';
import { RootState } from '../redux/store/store';
import { useTheme } from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const FilterDrawer = ({ open, onClose }: any) => {
    const dispatch = useDispatch();
    const { sortField, selectedStatuses } = useSelector((state: RootState) => state.jobs);
    const [statusFilterOpen, setStatusFilterOpen] = useState(true);
    const [dateFilterOpen, setDateFilterOpen] = useState(false);
    const [budgetFilterOpen, setBudgetFilterOpen] = useState(false);
    const [jobTypeFilterOpen, setJobTypeFilterOpen] = useState(false);
    const [skillsFilterOpen, setSkillsFilterOpen] = useState(false);

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(prevState => !prevState);
    };

    const handleStatusChange = (status: string) => {
        const currentIndex = selectedStatuses.indexOf(status);
        const newChecked = [...selectedStatuses];

        if (currentIndex === -1) {
            newChecked.push(status);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        dispatch(setSelectedStatuses(newChecked));
    };

    const handleChange = (event: SelectChangeEvent<any>) => {
        const {
            target: { value },
        } = event;
        dispatch(setSortField(typeof value === 'string' ? value.split(',') : value));
    };

    const fields = [
        'Status',
        'Submission date',
        'Proposed budget',
        'Ralph Hubbard',
    ];

    const datePostedOptions = ['Today', 'This week', 'This month'];
    const budgetOptions = ['0-100 dollars', '100-1000 dollars', 'More than 1000 dollars'];
    const jobTypeOptions = ['Contract', 'Long-term'];

    const drawerContent = (
        <Box sx={{ width: 250, padding: 2 }}>
            <Typography variant="body2">Filter</Typography>
            <List>
                <ListItem>
                    <Select
                        displayEmpty
                        value={sortField}
                        onChange={handleChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return <em>Sort order</em>;
                            }
                            return selected.join(', ');
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="">
                            <em>Sort order</em>
                        </MenuItem>
                        {fields.map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </ListItem>

                {/* Status Filter */}
                <ListItem button onClick={() => handleToggle(setStatusFilterOpen)}>
                    <ListItemText primary="Status" />
                    {statusFilterOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={statusFilterOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {['Open', 'Closed'].map((status) => (
                            <ListItem key={status} button onClick={() => handleStatusChange(status)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={selectedStatuses.indexOf(status) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary={status} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {/* Date Posted Filter */}
                <ListItem button onClick={() => handleToggle(setDateFilterOpen)}>
                    <ListItemText primary="Date Posted" />
                    {dateFilterOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={dateFilterOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {datePostedOptions.map((option) => (
                            <ListItem key={option} button>
                                <ListItemIcon>
                                    <Checkbox edge="start" tabIndex={-1} disableRipple />
                                </ListItemIcon>
                                <ListItemText primary={option} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {/* Budget Filter */}
                <ListItem button onClick={() => handleToggle(setBudgetFilterOpen)}>
                    <ListItemText primary="Budget" />
                    {budgetFilterOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={budgetFilterOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {budgetOptions.map((option) => (
                            <ListItem key={option} button>
                                <ListItemIcon>
                                    <Checkbox edge="start" tabIndex={-1} disableRipple />
                                </ListItemIcon>
                                <ListItemText primary={option} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {/* Job Type Filter */}
                <ListItem button onClick={() => handleToggle(setJobTypeFilterOpen)}>
                    <ListItemText primary="Job Type" />
                    {jobTypeFilterOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={jobTypeFilterOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {jobTypeOptions.map((option) => (
                            <ListItem key={option} button>
                                <ListItemIcon>
                                    <Checkbox edge="start" tabIndex={-1} disableRipple />
                                </ListItemIcon>
                                <ListItemText primary={option} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {/* Skills Filter */}
                <ListItem button onClick={() => handleToggle(setSkillsFilterOpen)}>
                    <ListItemText primary="Skills" />
                    {skillsFilterOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={skillsFilterOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {/* Replace the following with your skills fetching and rendering logic */}
                        {['Skill 1', 'Skill 2', 'Skill 3'].map((skill) => (
                            <ListItem key={skill} button>
                                <ListItemIcon>
                                    <Checkbox edge="start" tabIndex={-1} disableRipple />
                                </ListItemIcon>
                                <ListItemText primary={skill} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </List>
        </Box>
    );

    return isMediumScreen ? (
        <Box sx={{ width: 250 }}>{drawerContent}</Box>
    ) : (
        <Drawer
            variant="temporary"
            open={open}
            onClose={onClose}
            ModalProps={{ keepMounted: true }}
        >
            {drawerContent}
        </Drawer>
    );
};

export default FilterDrawer;
