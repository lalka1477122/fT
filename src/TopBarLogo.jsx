// eslint-disable-next-line no-unused-vars
import React from "react";
import logo from "./img/out-t-bank1.jpg";
import "./TopBarLogo.css"

export function TopBarLogo() {
    return (
        <>
            <img className="bank_logo" src={logo} alt="Логотип Т-банка" />
            <h2  className="Name_bank">Оплата за проезд</h2>
        </>
    );
}
