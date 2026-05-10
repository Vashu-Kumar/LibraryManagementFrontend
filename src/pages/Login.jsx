import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";


const Login = ({ setShowLogin, setUser }) => {

    const [state, setState] = useState("login")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onSubmitHandler = (event) => {
    event.preventDefault();

    // Fake Login
    setUser(true)

    // Close Modal
    setShowLogin(false)
}
    return (
    <div
        onClick={() => setShowLogin(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-sm text-gray-600"
    >

        <form
            onSubmit={onSubmitHandler}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col gap-4 items-start p-8 py-12 w-80 sm:w-[352px] rounded-xl shadow-2xl border border-gray-200 bg-white"
        >

            {/* CLOSE BUTTON */}
            <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
                <RxCross2 className="text-xl" />
            </button>

            <h3 className="bold-24 mx-auto mb-3">
                <span className="text-secondary capitalize">User </span>
                <span className="capitalize">
                    {state === "login" ? "Login" : "Register"}
                </span>
            </h3>

            {state === "register" && (
                <div className="w-full">
                    <p className="medium-14">Name</p>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Enter your User Name"
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
                        required
                    />
                </div>
            )}

            <div className="w-full">
                <p className="medium-14">Email</p>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Enter your Email"
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
                    required
                />
            </div>

            <div className="w-full">
                <p className="medium-14">Password</p>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Enter your Password"
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-black"
                    required
                />
            </div>

            {state === "register" ? (
                <p>
                    Already have account?
                    <span
                        onClick={() => setState("login")}
                        className="text-secondary cursor-pointer"
                    >
                        {" "}Click here
                    </span>
                </p>
            ) : (
                <p>
                    Create an account?
                    <span
                        onClick={() => setState("register")}
                        className="text-secondary cursor-pointer"
                    >
                        {" "}Click here
                    </span>
                </p>
            )}

            <button
                type="submit"
                className="btn-secondary w-full rounded"
            >
                {state === "register" ? "Create Account" : "Login"}
            </button>

        </form>
    </div>
)
}

export default Login
