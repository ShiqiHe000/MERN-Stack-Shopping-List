import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
import ShoppingList from "./components/ShoppingList";
import AddNewItem from "./components/AddNewItem";
import ErrorMessage from "./components/ErrorMessage";
import { isAuthenticatedSelector } from "./reducer/AuthSlice";
import { useSelector } from "react-redux";
import Welcome from "./components/Welcome";

function App() {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const renderPage = (
        <>
            <ErrorMessage />
            <AddNewItem />
            <ShoppingList />
        </>
    );

    return (
        <>
            <NavbarComponent />
            {isAuthenticated ? renderPage : <Welcome />}
        </>
    );
}

export default App;
