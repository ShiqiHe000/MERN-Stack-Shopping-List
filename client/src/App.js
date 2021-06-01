import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
import ShoppingList from "./components/ShoppingList";
import { ItemProvider } from "./context/ItemContext";
import AddNewItem from "./components/AddNewItem";
import "./App.css";

function App() {
    return (
        <div>
            <NavbarComponent />
            <ItemProvider>
                <AddNewItem />
                <ShoppingList />
            </ItemProvider>
        </div>
    );
}

export default App;
