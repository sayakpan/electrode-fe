import styles from "../styles/page.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import ThemeProviderComponent from '../components/theme/ThemeProviderComponent';
import HomePage from "@/components/home-page/homepage";

export default function Home() {
    return (
        <ThemeProviderComponent>
           <HomePage />
        </ThemeProviderComponent>
    );
}
