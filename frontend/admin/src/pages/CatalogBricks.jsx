import React from "react";

const CatalogBricks = () => {
    return (
        <div>
            {/* */}
            <div className="TopBar">
            {/* Top Bar contains the navigation features */}
            </div>

            <div className="BrickPic">
            {/*This contains the brick banner bicture as well as the "Legacy Brick Admin" text */}
            </div>

            <div className="Center Content">
            {/*This contains the components for the Add Brick features, */}
                <h1>Add Brick</h1>
                <text>Name</text>
                <textarea></textarea>

                <text>Campus</text>
                <textarea></textarea>

                <text>Row</text>
                <textarea></textarea>

                <text>Row#</text>
                <textarea></textarea>

                <text>Inscription</text>
                <textarea></textarea>

                <button>Add Brick</button>
                <button>Clear</button>

                <text>import Brick</text>
                <button>Select File</button>
            </div>

        </div>
    );
};

export default CatalogBricks;