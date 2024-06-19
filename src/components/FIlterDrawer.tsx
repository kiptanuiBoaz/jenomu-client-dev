import React, { useState } from 'react';
import {
    Drawer, List, ListItem, ListItemText, ListItemIcon, Radio, Collapse, MenuItem, OutlinedInput, Typography,
    SelectChangeEvent,
    Box,
    Select,
    useMediaQuery,
    Autocomplete,
    TextField,
    Checkbox,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSortField, setDatePosted, setStartDate, setBudget, setJobType, setSkillsRequired,
    selectFilterFields
} from '../redux/slices/filterSlice';
import { useTheme } from '@mui/material/styles';
import { top100SkillsInMedicalResearch } from '../utils/data';
import { budgetOptions, datePostedOptions, jobTypeOptions, startDateOptions } from '../utils/filterOptions';

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
    const filterFields = useSelector(selectFilterFields);
    const [statusFilterOpen, setStatusFilterOpen] = useState(true);
    const [dateFilterOpen, setDateFilterOpen] = useState(false);
    const [budgetFilterOpen, setBudgetFilterOpen] = useState(false);
    const [jobTypeFilterOpen, setJobTypeFilterOpen] = useState(false);
    const [skillsFilterOpen, setSkillsFilterOpen] = useState(true);

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));

    const handleToggle = (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
        setter(prevState => !prevState);
    };

    const handleSortChange = (event: SelectChangeEvent<any>) => {
        dispatch(setSortField(event.target.value));
    };

    const handleDatePostedChange = (option: string) => {
        dispatch(setDatePosted(option));
    };

    const handleStartDateChange = (option: string) => {
        dispatch(setStartDate(option));
    };

    const handleBudgetChange = (option: string) => {
        dispatch(setBudget(option));
    };

    const handleJobTypeChange = (option: string) => {
        dispatch(setJobType(option));
    };

    const handleSkillsRequiredChange = (_e: any, values: string[]) => {
        dispatch(setSkillsRequired(values));
    };

    const drawerContent = (
        <Box sx={{ width: 250, padding: 2 }}>
            <Typography variant="h6">Filter</Typography>
            <List>
                <ListItem>
                    <Select
                        sx={{ width: 230 }}
                        displayEmpty
                        value={filterFields.sortField}
                        onChange={handleSortChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => {
                            if (!selected) {
                                return <em>Sort order</em>;
                            }
                            return selected;
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem disabled value="">
                            <em>Sort order</em>
                        </MenuItem>
                        {["ascending", "descending"].map((name) => (
                            <MenuItem key={name} value={name}>
                                {name}
                            </MenuItem>
                        ))}
                    </Select>
                </ListItem>

                {/* Date Posted Filter */}
                <ListItem button onClick={() => handleToggle(setDateFilterOpen)}>
                    <ListItemText primary="Date Posted" />
                    {dateFilterOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={dateFilterOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {datePostedOptions.map((option) => (
                            <ListItem key={option} button onClick={() => handleDatePostedChange(option)}>
                                <ListItemIcon>
                                    <Radio
                                        edge="start"
                                        checked={filterFields.datePosted === option}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary={option} />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>

                {/* Start Date Filter */}
                <ListItem button onClick={() => handleToggle(setStatusFilterOpen)}>
                    <ListItemText primary="Start Date" />
                    {statusFilterOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={statusFilterOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {startDateOptions.map((option) => (
                            <ListItem key={option} button onClick={() => handleStartDateChange(option)}>
                                <ListItemIcon>
                                    <Radio
                                        edge="start"
                                        checked={filterFields.startDate === option}
                                        tabIndex={-1}
                                        disableRipple
                                    />
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
                            <ListItem key={option} button onClick={() => handleBudgetChange(option)}>
                                <ListItemIcon>
                                    <Radio
                                        edge="start"
                                        checked={filterFields.budget === option}
                                        tabIndex={-1}
                                        disableRipple
                                    />
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
                            <ListItem key={option} button onClick={() => handleJobTypeChange(option)}>
                                <ListItemIcon>
                                    <Radio
                                        edge="start"
                                        checked={filterFields.jobType === option}
                                        tabIndex={-1}
                                        disableRipple
                                    />
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
                        <Autocomplete
                            onChange={handleSkillsRequiredChange}
                            multiple
                            options={top100SkillsInMedicalResearch}
                            id="checkboxes-tags-demo"
                            disableCloseOnSelect
                            getOptionLabel={(option) => option}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option}
                                </li>
                            )}
                            style={{ width: 250, height: 30 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Skills match" placeholder="Skills match" />
                            )}
                        />
                    </List>
                </Collapse>
            </List>
        </Box>
    );

    return isMediumScreen ? (
        <Box sx={{ width: 230 }}>{drawerContent}</Box>
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
