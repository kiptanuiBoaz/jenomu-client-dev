import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import { Box, InputAdornment, Link, Menu, MenuItem, useTheme } from '@mui/material';
import { CiSearch } from 'react-icons/ci';
import { DropdownMenu } from './NavDropDown';
import { useNavigate } from 'react-router-dom';
import { getUserInfoState } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import NavProfile from './NavProfile';
import { resetFilterFields, setSearchTerm } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store/store';



const Navbar = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [isFocused, setIsFocused] = useState(false);

    const dispatch = useDispatch();
    const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(resetFilterFields());
        dispatch(setSearchTerm(event.target.value));
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { user } = useSelector(getUserInfoState);
    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'gray', m: 0 }}>
            <Toolbar>
                <Typography variant="h5" noWrap sx={{ marginRight: 5, display: { xs: 'none', sm: 'block' } }}>
                    <Link color={'#fff'} href="https://jenomu.com">
                        Jenomu
                    </Link>

                </Typography>
                <Button
                    // 
                    variant="text"
                    style={{ color: "#ccc", textTransform: "none" }}
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Dashboard
                </Button>
                <Menu

                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    <MenuItem onClick={() => navigate("/researcher/post-job")}>Cretate New</MenuItem>
                    <MenuItem onClick={() => navigate("/researcher/")}>View All</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
                {/* <DropdownMenu title="Get Talent" options={['Option 1', 'Option 2']} />
                <DropdownMenu title="Post a job" options={['Create New', 'Option 2']} /> */}

                <Box style={{ flexGrow: 1 }} />
                <Box
                    style={{
                        position: 'relative',
                        borderRadius: '4px',
                        backgroundColor: '#fff',
                        marginRight: '16px',
                        marginLeft: 0,
                        width: '100%',
                        maxWidth: '300px',
                        [theme.breakpoints.up('sm')]: {
                            marginLeft: '24px',
                            width: 'auto',
                        },
                    }}
                >
                    <TextField
                        size='small'
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        type="text"
                        id="outlined-basic"
                        variant="outlined"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        InputProps={{
                            startAdornment: !isFocused && (
                                <InputAdornment position="start">
                                    <IconButton edge="start">
                                        <CiSearch />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                {isAuthenticated
                    ? <NavProfile user={user} />
                    : (
                        <>
                            <Button onClick={() => navigate("/create-account")} variant='outlined' color="inherit">Sign In</Button>
                            <Button onClick={() => navigate("/login")} sx={{ backgroundColor: "primary", color: "#fff" }} >Sign Up</Button>
                        </>
                    )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
