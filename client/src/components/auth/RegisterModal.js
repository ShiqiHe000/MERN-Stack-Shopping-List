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
import { isAuthenticatedSelector, register } from "../../reducer/AuthSlice";
import { clearErrors } from "../../reducer/ErrorSlice";
import { unwrapResult } from "@reduxjs/toolkit";


const RegisterModal = () => {
    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const error = useSelector((state) => state.error); // whole error object
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasError, setHasError] = useState(false);

    const toggle = () => {
        dispatch(clearErrors());
        setHasError(false);
        setModal(!modal);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // attempt to register
        dispatch(
            register({
                name: username,
                email,
                password,
            })
        )
            .then(unwrapResult)
            .then(() => {
                toggle();
            })
            .catch((err) => {
                setHasError(true);
            });
        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div>
            <NavLink href="#" onClick={toggle}>
                Register
            </NavLink>

            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader>Register</ModalHeader>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <ModalBody>
                        {hasError ? (
                            <Alert color="danger">{error.msg.message}</Alert>
                        ) : (
                            ""
                        )}
                        <FormGroup>
                            <Label for="name">Username:</Label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                required
                                className="mb-3"
                                value={username}
                                onChange={(e) =>
                                    setUsername(e.target.value)
                                }></Input>
                        </FormGroup>
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
                            Register
                        </Button>{" "}
                        <Button color="secondary" onClick={toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Form>
            </Modal>
        </div>
    );
};

export default RegisterModal;
