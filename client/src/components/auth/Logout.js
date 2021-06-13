import React from "react";
import { NavLink } from "reactstrap";
import {logout} from '../../reducer/AuthSlice';
import { useDispatch } from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();

    return <NavLink href="#" onClick={() => dispatch(logout())}>Logout</NavLink>;
};

export default Logout;
