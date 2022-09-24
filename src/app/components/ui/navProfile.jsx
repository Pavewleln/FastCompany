import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
export const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    if (!currentUser) return "loading...";
    return (
        <div className={"dropdown"} onClick={toggleMenu}>
            <div>
                <div
                    className={"btn dropdown-toggle d-flex align-items-center"}
                >
                    <div className={"me-2"}>
                        {currentUser.name}
                        <img
                            src={currentUser.image}
                            className="rounded-circle shadow-1-strong me-3"
                            alt="avatar"
                            width="65"
                            height="65"
                        />
                    </div>
                </div>
            </div>
            <div className={"dropdown-menu w-100" + (isOpen ? " show" : "")}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className={"dropdown-item"}
                >
                    Профиль
                </Link>
                <Link to={`/logout`} className={"dropdown-item"}>
                    Выйти
                </Link>
            </div>
        </div>
    );
};
