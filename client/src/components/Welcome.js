import React from "react";
import { Container } from "reactstrap";
import styles from "../scss/Welcome.module.scss";

const Wecome = () => {
    return (
        <Container>
            <h1 className="my-3">Welcome to Shopping List!</h1>
            <h3 className={styles.subtitile}>
                Please Login/Resgister to access your shopping list.
            </h3>
            <p className={styles.tips}>Try email: mary@gmail.com, password: mary and have a look!</p>
        </Container>
    );
};

export default Wecome;
