"use client";

import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BoltIcon from "@mui/icons-material/Bolt";
import Link from "@mui/material/Link";
import { useRouter } from "next/navigation";
import { userState } from "@/store/auth";
import { useRecoilState } from "recoil";


function ResponsiveAppBar() {
    const [user, setUser] = useRecoilState(userState);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter()

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    useEffect(() => {
        setIsMounted(true)
        if (!user) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(storedUser);
            }
        }
    }, [setUser, user]);

    const navigateToPage = (page) => {
        router.push(page)
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async (e) => {
        handleCloseUserMenu()
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
        setUser(null);
        window.location.href = '/login'
    }

    return (
        <AppBar position="static" sx={{ bgcolor: "#0D1421" }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <BoltIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        onClick={() => {navigateToPage('/')}}
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            cursor: "pointer"
                        }}
                    >
                        ELECTRODE
                    </Typography>

                    <Box sx={{flexGrow: 1, display: { xs: "flex", md: "none" },}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    Explore
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    About
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>

                    <BoltIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}/>
                    <Typography
                        variant="p"
                        noWrap
                        component="a"
                        onClick={() => {navigateToPage('/')}}
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                            cursor: "pointer"
                        }}
                    >
                        ELECTRODE
                    </Typography>
                    <Box sx={{flexGrow: 1, display: { xs: "none", md: "flex" },}}>
                            <Link
                                onClick={() => {navigateToPage('explore')}}
                                underline="none"
                                sx={{ my: 2, mx: 1, color: "white", display: "block", cursor: "pointer" }}
                            >Explore
                            </Link>
                            <Link
                                onClick={() => {navigateToPage('about')}}
                                underline="none"
                                sx={{ my: 2, mx: 1, color: "white", display: "block" }}
                            >About
                            </Link>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        { isMounted && user ? (
                            <div className="d-flex">
                                <h6 className="me-2 my-auto">{user.first_name}</h6>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={user.first_name}/>
                                    </IconButton>
                                </Tooltip>
                            </div>
                            ) : (
                                <Link onClick={() => {navigateToPage('login')}}>
                                    <Button variant="contained" size="small" sx={{
                                        fontWeight: 'bold',
                                        textTransform: 'none',
                                        backgroundColor: (theme) => theme.palette.secondary.main, // Use the primary color
                                        color: (theme) => theme.palette.secondary.contrastText, // Text color
                                        '&:hover': {
                                            backgroundColor: (theme) => theme.palette.secondary.dark, // Darker shade on hover
                                        },
                                    }}>
                                        Sign in
                                    </Button>
                                </Link>
                            )}
                        <Menu
                            sx={{ mt: "45px", }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography textAlign="center">
                                    Profile
                                </Typography>
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>
                                <Typography textAlign="center">
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
