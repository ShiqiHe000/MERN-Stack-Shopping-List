import React, { useState, useContext } from "react";
import { ItemContext } from "../context/ItemContext";
import { Container, Button } from "reactstrap";
import styles from "../scss/AddNewItem.module.scss";

const AddNewItem = () => {
    const { addItem } = useContext(ItemContext);

    const [newItem, setNewItem] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        addItem(newItem);
        setNewItem("");
    }

    return (
        <Container>
            <form
                className={`my-3 ${styles.inputArea}`}
                onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="New Item"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                />
                <Button color="primary" type="submit">
                    Add Item
                </Button>
            </form>
        </Container>
    );
};

export default AddNewItem;
