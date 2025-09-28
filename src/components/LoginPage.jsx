import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import illustration from "../assets/illustration.png";
import googleIcon from "../assets/google-icon.png";
import facebookIcon from "../assets/facebook-icon.png";
import accountIcon from "../assets/account_circle.svg";
import emailIcon from "../assets/mail.svg";
import lockIcon from "../assets/key.svg";
import hide from "../assets/visibility.svg";

export default function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const userData = localStorage.getItem("userData");
        if (userData) navigate("/home");
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error as user types
        setFormErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const errors = {};

        // Username validation
        if (!formData.username.trim()) {
            errors.username = "This field is required";
        } else if (formData.username.trim() !== "emilys") {
            errors.username = "Only 'emilys' is allowed";
        }

        // Email validation (optional)
        if (formData.email.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email.trim())) {
                errors.email = "Enter a valid email address";
            }
        }

        // Password validation
        if (!formData.password) {
            errors.password = "This field is required";
        } else if (formData.password.length < 8) {
            errors.password = "Minimum of 8 characters";
        }

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setLoading(true);

        try {
            const payload = {
                username: formData.username.trim(),
                password: formData.password,
                ...(formData.email ? { email: formData.email.trim() } : {}),
                expiresInMins: 30, // included here
            };

            // Call the dummy API
            await fetch("https://dummyjson.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            // Store user data locally
            const userData = {
                username: formData.username.trim(),
                email: formData.email.trim(),
                expiresInMins: 30,
                loggedIn: true,
            };
            localStorage.setItem("userData", JSON.stringify(userData));

            // Redirect to home
            navigate("/home");
        } catch (err) {
            // Even if API fails, still store and redirect
            const userData = {
                username: formData.username.trim(),
                email: formData.email.trim(),
                expiresInMins: 30,
                loggedIn: true,
            };
            localStorage.setItem("userData", JSON.stringify(userData));
            navigate("/home");
        } finally {
            setLoading(false);
        }
    };


    const getLabelClasses = (value) =>
        `absolute left-10 text-gray-400 transition-all duration-200 ${value
            ? "top-1 -translate-y-0 text-xs"
            : "top-1/2 -translate-y-1/2 text-base peer-focus:top-1 peer-focus:-translate-y-0 peer-focus:text-xs"
        }`;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-xl overflow-hidden">
                {/* Illustration side */}
                <div className="md:w-1/2 flex items-center justify-center p-6">
                    <img src={illustration} alt="Illustration" className="w-3/4 max-w-sm" />
                </div>

                {/* Form side */}
                <div className="md:w-1/2 w-full p-8 bg-white border border-gray-200 rounded-[20px]">
                    <h2 className="mb-6">
                        <span className="block font-medium text-[36px] leading-tight">Welcome to</span>
                        <span className="block font-extrabold text-[46px] leading-tight text-[#6358DC]">
                            Unstop
                        </span>
                    </h2>

                    {/* Social buttons */}
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 mb-3 hover:bg-gray-50"
                    >
                        <img src={googleIcon} alt="Google" className="w-5 h-5" />
                        Login with Google
                    </button>
                    <button
                        type="button"
                        className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 hover:bg-gray-50"
                    >
                        <img src={facebookIcon} alt="Facebook" className="w-3 h-5" />
                        Login with Facebook
                    </button>

                    <div className="flex items-center my-4">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-2 text-gray-400 text-sm">OR</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        {/* Username */}
                        <div className="relative w-full">
                            <input
                                type="text"
                                name="username"
                                placeholder=" "
                                value={formData.username}
                                onChange={handleChange}
                                className="peer block w-full rounded-md bg-[#F4F4F4] pl-10 pr-3 pt-5 pb-2 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6358DC]"
                            />
                            <label className={getLabelClasses(formData.username)}>User name</label>
                            <img
                                src={accountIcon}
                                alt="username icon"
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                            />
                        </div>
                        {formErrors.username && (
                                <p className="text-red-500 text-xs">{formErrors.username}</p>
                            )}

                        {/* Email */}
                        <div className="relative w-full">
                            <input
                                type="email"
                                name="email"
                                placeholder=" "
                                value={formData.email}
                                onChange={handleChange}
                                className="peer block w-full rounded-md bg-[#F4F4F4] pl-10 pr-3 pt-5 pb-2 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6358DC]"
                            />
                            <label className={getLabelClasses(formData.email)}>Email</label>
                            <img
                                src={emailIcon}
                                alt="email icon"
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                            />
                        </div>
                         {formErrors.email && (
                                <p className="text-red-500 text-xs">{formErrors.email}</p>
                            )}

                        {/* Password */}
                        <div className="relative w-full">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder=" "
                                value={formData.password}
                                onChange={handleChange}
                                className="peer block w-full rounded-md bg-[#F4F4F4] pl-10 pr-10 pt-5 pb-2 text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6358DC]"
                            />
                            <label className={getLabelClasses(formData.password)}>Password</label>
                            <img
                                src={lockIcon}
                                alt="password icon"
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
                            />
                            <img
                                src={hide}
                                alt="toggle visibility"
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                         {formErrors.password && (
                                <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                            )}

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="accent-[#6358DC]" /> Remember me
                            </label>
                            <a href="#" onClick={(e) => e.preventDefault()} className="text-[#6358DC]">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#6358DC] text-white rounded-md py-2 font-medium hover:bg-[#6358DC] transition disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Don’t have an account?{" "}
                        <a href="#" onClick={(e) => e.preventDefault()} className="text-[#6358DC]">
                            Register
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
