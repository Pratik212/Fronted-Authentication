import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import history from '../../@history/@history'
import {submitLogin} from "../../auth/store/loginSlice";
import {useDispatch} from "react-redux";
import Navigation from "../navigation/Navigation";

const Form = () => {
    const intialValues = { email: "", password: "" };
    const dispatch = useDispatch();
    const [formValues, setFormValues] = useState(intialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = () => {
        dispatch(submitLogin(formValues)).then(res=>{
            console.log(res)
            if(res){
                history.push({
                    pathname:'/'
                })
            }
        })
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

        if (!values.password) {
            errors.password = "Cannot be blank";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
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

        <div className="container shadow-lg p-3 mb-5 bg-white rounded ">
            <h1 className="">Sign in to continue</h1>
            {Object.keys(formErrors).length === 0 && isSubmitting && (
                <span className="success-msg">Form submitted successfully</span>
            )}
            <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formValues.email}
                        onChange={handleChange}
                        className={formErrors.email && "input-error"}
                    />
                    {formErrors.email && (
                        <span className="error">{formErrors.email}</span>
                    )}
                </div>

                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formValues.password}
                        onChange={handleChange}
                        className={formErrors.password && "input-error"}
                    />
                    {formErrors.password && (
                        <span className="error">{formErrors.password}</span>
                    )}
                </div>

                <button type="submit">Sign In</button>
                <Link to="/register" >Sign up</Link>
            </form>
        </div>
        </>
    );
};

export default Form;
