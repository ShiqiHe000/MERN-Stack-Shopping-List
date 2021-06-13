import React from "react";
import { Alert } from "reactstrap";
import { useSelector } from "react-redux";
import { errorMessageSelector } from "../reducer/ErrorSlice";

const ErrorMessage = () => {
    const errorMessage = useSelector(errorMessageSelector);

    return (
        <div>
            {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : null}
        </div>
    );
};

export default ErrorMessage;
