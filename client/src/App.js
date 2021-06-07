import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./components/Navbar";
import ShoppingList from "./components/ShoppingList";
import AddNewItem from "./components/AddNewItem";

function App() {
    return (
        <div>
            <NavbarComponent />
            <AddNewItem />
            <ShoppingList />
        </div>
    );
}

export default App;
