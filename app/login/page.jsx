"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/plugins/axios";
import { useSnackbar } from '../../context/SnackbarContext';
import { useRecoilState } from 'recoil';
import { userState, profileState } from "@/store/auth";
import styles from "@/assets/scss/login.module.scss"
import { InputText } from 'primereact/inputtext';
import BoltIcon from "@mui/icons-material/Bolt";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


const AuthPage = () => {
    const [user, setUser] = useRecoilState(userState);
    const [profile, setProfile] = useRecoilState(profileState);
    const [activeTab, setActiveTab] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { openSnackbar } = useSnackbar();
    const router = useRouter();


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/api/accounts/login/", { email, password });
            const token = response.data.token;
        
            Cookies.set('Token', token, { expires: 1, path: '/', sameSite: 'Strict' });
            localStorage.setItem("Token", token);
            
            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUser(response.data.user);
            setProfile(response.data.profile)
            router.replace("/");

            openSnackbar("Logged in successfully!", 'success', 3000);
        } catch (error) {
            openSnackbar(`Error: ${error.response?.data?.error}`, 'error', 3000);
        }
      };

    // Register handler
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                first_name: name,
                email: email,
                password: password,
            }
            const response = await axiosInstance.post("api/accounts/register/", payload);
            const token = response.data.token;

            Cookies.set('Token', token, { expires: 1 })
            localStorage.setItem("Token", token);

            localStorage.setItem("user", JSON.stringify(response.data.user));
            setUser(response.data.user);
            setProfile(response.data.profile)
            window.location.href = '/';

            openSnackbar("User created successfully!", 'success', 3000);
        } catch (error) {
            openSnackbar(`Error: ${error.response?.data?.error}`, 'error', 3000);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };


    return (
        <div className={styles.login_container}>
            <div className="container d-flex justify-content-center align-items-center">
                <div className={"card shadow-sm p-4 " + styles.login_card} style={{ width: "100%", maxWidth: "400px" }}>
                    <Box sx={{flexGrow: 1, display: "flex", justifyContent: "center", marginBottom: "2rem"}}>
                        <BoltIcon sx={{ display: "flex", mr: 1, color: "white" }}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            onClick={() => {navigateToPage('/')}}
                            sx={{
                                me: 1,
                                display: "flex" ,
                                fontFamily: "monospace",
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "white",
                                textDecoration: "none",
                                cursor: "pointer"
                            }}
                        >
                            ELECTRODE
                        </Typography>
                        </Box>
                    <div className={styles.tabs + " d-flex justify-content-center mb-4"}>
                        <button className={`${activeTab === "login" ? styles.tab_active : styles.tab_inactive} me-2`} onClick={() => setActiveTab("login")}>
                            Login
                        </button>
                        <button className={`${activeTab === "register" ? styles.tab_active : styles.tab_inactive}`} onClick={() => setActiveTab("register")}>
                            Register
                        </button>
                    </div>

                    { activeTab === "login" ? (
                        <form onSubmit={handleLogin}>
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Username" />
                            </div>
                            <div className="p-inputgroup flex-1 my-3">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <InputText value={password} onChange={(e) => setPassword(e.target.value)} type={ showPassword ? "text" : "password"} placeholder="Password" />
                                <span className="p-inputgroup-addon" style={{ cursor: "pointer" }} onClick={togglePasswordVisibility}>
                                    <i className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`}></i>
                                </span>
                            </div>
                            <Button type="submit" variant="contained" size="small" 
                                sx={{
                                    width: "100%",
                                    fontSize: "1rem",
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    backgroundColor: (theme) => theme.palette.secondary.main, // Use the primary color
                                    color: (theme) => theme.palette.secondary.contrastText, // Text color
                                    '&:hover': {
                                        backgroundColor: (theme) => theme.palette.secondary.dark, // Darker shade on hover
                                    },
                                }}
                            >Log In
                            </Button>
                        </form>) :
                        (<form onSubmit={handleRegister}>
                            <div className="p-inputgroup flex-1">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-user"></i>
                                </span>
                                <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                            </div>
                            <div className="p-inputgroup flex-1 mt-3">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-at"></i>
                                </span>
                                <InputText value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" />
                            </div>
                            <div className="p-inputgroup flex-1 my-3">
                                <span className="p-inputgroup-addon">
                                    <i className="pi pi-key"></i>
                                </span>
                                <InputText value={password} onChange={(e) => setPassword(e.target.value)} type={ showPassword ? "text" : "password"} placeholder="Password" />
                                <span className="p-inputgroup-addon" style={{ cursor: "pointer" }} onClick={togglePasswordVisibility}>
                                    <i className={`pi ${showPassword ? "pi-eye-slash" : "pi-eye"}`}></i>
                                </span>
                            </div>
                            {/* <button type="submit" className="btn btn-primary w-100">{activeTab === "login" ? "Sign In" : "Register"}</button> */}
                            <Button type="submit" variant="contained" size="small" 
                                sx={{
                                    width: "100%",
                                    fontSize: "1rem",
                                    fontWeight: 'bold',
                                    textTransform: 'none',
                                    backgroundColor: (theme) => theme.palette.secondary.main, // Use the primary color
                                    color: (theme) => theme.palette.secondary.contrastText, // Text color
                                    '&:hover': {
                                        backgroundColor: (theme) => theme.palette.secondary.dark, // Darker shade on hover
                                    },
                                }}
                            >Sign Up
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
