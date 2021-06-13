import React, { useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector, userSelector } from "../reducer/AuthSlice";

const NavbarComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const isAuthenticated = useSelector(isAuthenticatedSelector);
    const user = useSelector(userSelector);

    const authLink = (
        <>
            <NavItem>
                <span className="navbar-text me-3">
                    <strong>
                        {user ? `Welcome ${user.name}` : null}
                    </strong>
                </span>
            </NavItem>
            <NavItem>
                <Logout />
            </NavItem>
        </>
    );

    const guestLink = (
        <>
            <NavItem>
                <LoginModal />
            </NavItem>
            <NavItem>
                <RegisterModal />
            </NavItem>
        </>
    );

    return (
        <div>
            <Navbar color="dark" dark expand="md">
                <Container>
                    <NavbarBrand href="/">Shopping List</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="ms-auto align-items-center" navbar>
                            {isAuthenticated ? authLink : guestLink}
                            <NavItem>
                                <NavLink href="https://github.com/ShiqiHe000/MERN-Stack-Shopping-List">
                                    GitHub
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavbarComponent;
