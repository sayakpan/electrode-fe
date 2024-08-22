import { StrictMode } from "react";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css"
import MyNavbar from "../components/layouts/navbar";
import ThemeProviderComponent from '../components/theme/ThemeProviderComponent';
import { SnackbarProvider } from '../context/SnackbarContext';
import RecoilContextProvider from "@/lib/recoilContextProvider";
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/arya-blue/theme.css";
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Electrode - Games",
    description: "A Multiplayer Gaming Application",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={inter.className}>
                <StrictMode>
                    <RecoilContextProvider>
                        <ThemeProviderComponent>
                            <PrimeReactProvider>
                                <SnackbarProvider>
                                    <MyNavbar /> {/* Add the navbar here */}
                                    <main>{children}</main> {/* Wrap the children with main */}
                                </SnackbarProvider>
                            </PrimeReactProvider>
                        </ThemeProviderComponent>
                    </RecoilContextProvider>
                </StrictMode>
            </body>
        </html>
    );
}
