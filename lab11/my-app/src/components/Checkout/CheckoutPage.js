import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CheckoutPage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../actions/cartActions';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ]+$/, "First name must contain only letters (Latin or Ukrainian)")
                .required("First name is required"),
            lastName: Yup.string()
                .matches(/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ]+$/, "Last name must contain only letters (Latin or Ukrainian)")
                .required("Last name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required")
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    'Please enter a valid email address'),
                
                
            phone: Yup.string()
                .matches(/^\+?[0-9]{10,15}$/, "Phone must be a valid number")
                .required("Phone is required"),
            address: Yup.string()
                .required("Address is required")
                .max(255, "Address cannot exceed 255 characters"),
        }),
        onSubmit: (values) => {
            console.log('Order submitted:', values);
            dispatch(clearCart()); // Очищення кошика після успішного оформлення замовлення
            navigate('/success'); // Перехід на сторінку успіху
        },
    });

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        {...formik.getFieldProps('firstName')}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                        <div className="error">{formik.errors.firstName}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        {...formik.getFieldProps('lastName')}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                        <div className="error">{formik.errors.lastName}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="error">{formik.errors.email}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                        id="phone"
                        type="text"
                        {...formik.getFieldProps('phone')}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="error">{formik.errors.phone}</div>
                    ) : null}
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        {...formik.getFieldProps('address')}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <div className="error">{formik.errors.address}</div>
                    ) : null}
                </div>
                <div className="form-actions">
                    <button type="button" onClick={() => navigate('/cart')}>Go Back</button>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutPage;
