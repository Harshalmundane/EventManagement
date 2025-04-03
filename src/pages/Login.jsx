import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            
            // Redirect to home or previous protected page
            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
            window.location.reload();
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                            Event Horizon
                        </h1>
                    </Link>
                    <p className="mt-2 text-gray-400">Welcome back! Please sign in to continue</p>
                </div>

                <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={user.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                        autoComplete="username"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        value={user.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        required
                                        autoComplete="current-password"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="mt-2 text-right">
                                    <Link to="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 hover:underline">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-200 ${isLoading
                                    ? "bg-purple-800 cursor-not-allowed"
                                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
                                    }`}
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>
                        </form>

                        <div className="mt-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-gray-800 text-gray-400">
                                        Don't have an account?
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6">
                                <Link
                                    to="/register"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-lg shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
                                >
                                    Create new account
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                    By continuing, you agree to our Terms of Service and Privacy Policy
                </div>
            </div>
        </div>
    );
};

export default Login;