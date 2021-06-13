import React, { useState } from "react";
import { Container, Button } from "reactstrap";
import styles from "../scss/AddNewItem.module.scss";
import { useDispatch } from "react-redux";
import { addItem } from "../reducer/ItemSlice";

const AddNewItem = () => {
    const dispatch = useDispatch();

    const [newItem, setNewItem] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(addItem(newItem));
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
