import React, { useEffect } from "react";
import { ListGroup, ListGroupItem, Button, Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "../scss/ShoppingList.module.scss";
import "../css/fade.css";
import { fetchItems, deleteItem } from "../reducer/ItemSlice";
import { useDispatch, useSelector } from "react-redux";

const ShoppingList = () => {
    const dispatch = useDispatch();
    const items = useSelector((state) => state.items.items);

    useEffect(() => {
        dispatch(fetchItems())
      
    }, [dispatch]);

    function handleDelete(id) {
        dispatch(deleteItem(id));
    }

    return (
        <Container>
            <ListGroup>
                <TransitionGroup>
                    {items.map((item) => (
                        <CSSTransition
                            key={item._id}
                            timeout={500}
                            classNames="item">
                            <ListGroupItem key={item._id}>
                                <Button
                                    color="danger"
                                    size="sm"
                                    className={styles.deleteButton}
                                    onClick={() => handleDelete(item._id)}>
                                    &times;
                                </Button>
                                {item.name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    );
};

export default ShoppingList;
