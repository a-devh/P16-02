//This screen displays the login UI

import React from "react";

const Login = () => {
    return (
        <div>
            {/* */}
            <div className="TopBar">
            {/* Top Bar contains the navigation features */}
            </div>

            <div className="BrickPic">
            {/*This contains the brick banner bicture as well as the "Legacy Brick Admin" text */}
            </div>

            <div className="LoginWindow">
            {/*This contains the components for the login features, */}
                <h1>Login</h1>
                <text>Email</text>
                <textarea>Email</textarea>
                <text>Password</text>
                <textarea>Password</textarea>
                <button>Login</button>
                <text>Forgot Password?</text>
            </div>

        </div>
    );
};

export default Login;