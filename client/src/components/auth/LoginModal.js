import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../reducer/AuthSlice";
import { clearErrors } from "../../reducer/ErrorSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const LoginModal = () => {
    const error = useSelector((state) => state.error); // whole error object
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");
    const [hasError, setHasError] = useState(false);
    const [password, setPassword] = useState("");

    const toggle = () => {
        dispatch(clearErrors());
        setHasError(false);
        setModal(!modal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // attempt to register
        dispatch(
            login({
                email,
                password,
            })
        )
            .then(unwrapResult)
            .then(() => {
                // if authenticated, close modal
                toggle();
            })
            .catch((rejectedValueOrSerializedError) => {
                setHasError(true);
            });

            setEmail("");
            setPassword("");
    };

    return (
        <>
            <NavLink href="#" onClick={toggle}>
                Login
            </NavLink>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Login</ModalHeader>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <ModalBody>
                        {hasError ? (
                            <Alert color="danger">{error.msg.message}</Alert>
                        ) : (
                            ""
                        )}

                        <FormGroup>
                            <Label for="email">Email:</Label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                required
                                className="mb-3"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password:</Label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                required
                                className="mb-3"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" type="submit">
                            Login
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </>
    );
};

export default LoginModal;
