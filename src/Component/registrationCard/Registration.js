import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import history from "../../@history/@history";
import {submitLogin} from "../../auth/store/loginSlice";
import {submitRegister} from "../../auth/store/registerSlice";
import {useDispatch} from "react-redux";
import Navigation from "../navigation/Navigation";

const Registration = () => {
    const initialValues = { firstName: "", lastName: "" , email:"" , address:""};
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        debugger
        dispatch(submitRegister(formValues))
        console.log(formValues);
    };

    //input change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    //form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmitting(true);
        console.log(":::intialValues:::",initialValues)
    };

    //form validation handler
    const validate = (values) => {
        let errors = {};

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Cannot be blank";
        } else if (!regex.test(values.email)) {
            errors.email = "Invalid email format";
        }

        if (!values.firstName) {
            errors.firstName = "Cannot be blank";
        }

        if (!values.password) {
            errors.password = "Cannot be blank";
        }

        if (!values.lastName) {
            errors.lastName = "Cannot be blank";
        }

        return errors;
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmitting) {
            submit();
        }
    }, [formErrors]);

    return (
        <>
            <Navigation/>
        <div className="container shadow-lg p-3 mb-5 bg-light rounded ">
            <h1 className="">Registration</h1>
            {Object.keys(formErrors).length === 0 && isSubmitting && (
                <span className="success-msg">Form submitted successfully</span>
            )}
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                    <label htmlFor="firstName">FirstName</label>
                    <input
                        type="firstName"
                        name="firstName"
                        id="firstName"
                        value={formValues.firstName}
                        onChange={handleChange}
                        placeholder="Enter Your FirstName"
                        className={formErrors.firstName && "input-error"}
                    />
                    {formErrors.firstName && (
                        <span className="error">{formErrors.firstName}</span>
                    )}
                </div>

                <div className="form-row">
                    <label htmlFor="lastName">LastName</label>
                    <input
                        type="lastName"
                        name="lastName"
                        id="lastName"
                        value={formValues.lastName}
                        onChange={handleChange}
                        placeholder="Enter Your LastName"
                        className={formErrors.lastName && "input-error"}
                    />
                    {formErrors.lastName && (
                        <span className="error">{formErrors.lastName}</span>
                    )}
                </div>

                <div className="form-row">
                    <label htmlFor="a'">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formValues.email}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Enter Your Address"
                        className={formErrors.email && "input-error"}
                    />
                    {formErrors.email && (
                        <span className="error">{formErrors.email}</span>
                    )}
                </div>

                <div className="form-row">
                    <label htmlFor="a'">Address</label>
                    <input
                        type="address"
                        name="address"
                        id="address"
                        value={formValues.address}
                        onChange={handleChange}
                        autoComplete="off"
                        placeholder="Enter Your Address"
                        className={formErrors.address && "input-error"}
                    />
                    {formErrors.address && (
                        <span className="error">{formErrors.address}</span>
                    )}
                </div>

                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="New Password"
                        value={formValues.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                        className={formErrors.password && "input-error"}
                    />
                    {formErrors.password && (
                        <span className="error">{formErrors.password}</span>
                    )}
                </div>

                <button className="bg-dark" type="submit">Sign Up</button>

                <Link to="/login">Sign in</Link>
            </form>
        </div>
        </>
    );
};

export default Registration;
