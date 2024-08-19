'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

// Create a theme instance
const theme = createTheme({
    palette: {
        mode: 'dark', // Set the palette mode to dark
        primary: {
            main: '#0D1421', // Primary color for dark theme
            contrastText: '#fff', // Text color on primary backgrounds
        },
        secondary: {
            main: '#5002cf', // Secondary color for dark theme
            contrastText: '#fff', // Text color on secondary backgrounds
            light: '#7b3eff', // Lighter shade of the secondary color
            dark: '#3d0099',
        },
        background: {
            paper: '#121212', // Background color for paper surfaces (e.g., cards, menus)
            default: '#121212', // Default background color for the app
        },
        text: {
            primary: '#ffffff', // Primary text color
            secondary: '#b0bec5', // Secondary text color
        },
        divider: '#333', // Divider color
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif', // Default font family
        h1: {
            fontSize: '2.25rem', // Size for h1 headings
            fontWeight: 500,
            letterSpacing: '0.5px',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
            letterSpacing: '0.5px',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '4px', // Rounded corners for buttons
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1e1e1e', // Card background color
                },
            },
        },
    },
});

export default function ThemeProviderComponent({ children }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
