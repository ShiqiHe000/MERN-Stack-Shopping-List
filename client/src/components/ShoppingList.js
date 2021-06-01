import React, { useContext, useEffect } from "react";
import { ItemContext } from "../context/ItemContext";
import { ListGroup, ListGroupItem, Button, Container } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "../scss/ShoppingList.module.scss";
import "../css/fade.css";

const ShoppingList = () => {
    const { items, deleteItem, getAllItems } = useContext(ItemContext);

    useEffect(() => {
        getAllItems();
    }, [])
    
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
                                    onClick={() => deleteItem(item._id)}>
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
