import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { useState } from "react";
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

export const DropdownMenu = ({ title, options }: { title: string, options: any }) => {
    const [anchorEl, setAnchorEl] = useState<any | null>(null);

    return (
        <>
            <Button
                sx={{ textTransform: "none", color: "#fff" }}
                size='small'
                aria-controls={`${title}-menu`}
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                endIcon={anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            >
                {title}
            </Button>
            <Menu

                id={`${title}-menu`}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                {options.map((option: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined, index: number) => (
                    <MenuItem key={index} onClick={() => setAnchorEl(null)}>
                        {option}<TrendingFlatIcon fontSize="small" sx={{ marginLeft: 5 }} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};