import { Public, Stars, Favorite } from "@material-ui/icons";
import React from "react";
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-container">
                <div className="sidebar-options">
                    <div className="sidebar-option">
                        <Public />
                        <a>All Forums</a>
                    </div>
                    <div className="sidebar-option">
                        <Stars />
                        <a>My Forums</a>
                    </div>
                    <div className="sidebar-option">
                        <Favorite />
                        <a>Folwed Forums</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;