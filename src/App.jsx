import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callServer } from "./headersSlice";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

/* ------------- utility functions ------------- */
const joinClassNames = (...array) => {
    return array.join(" ");
};
/* ------------- smaller elements ------------- */
function Header({ number, text, image }) {
    const className = "Header Header" + number;
    return React.createElement("h" + number, { className }, text);
}
function Footer({ text, children }) {
    const className = joinClassNames("Footer");
    return (
        <footer className={className}>
            <small>
                {text}
                {children}
            </small>
        </footer>
    );
}
function TextInput({ value, onChange, onEnterKey, defaultValue, disabled }) {
    const className = "TextInput";
    function onKeyDown(event) {
        const { key } = event;
        if (key.toLowerCase() === "enter") {
            onEnterKey(event);
        }
    }
    return (
        <input
            className={className}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange}
            onKeyDown={onKeyDown}
        ></input>
    );
}
function Link({ href, text }) {
    const className = joinClassNames("Link");
    return (
        <a className={className} href={href}>
            {text ? text : href}
        </a>
    );
}
function Window({ additionalClassName, headerText, children }) {
    const className = joinClassNames(additionalClassName, "Window");
    return (
        <section className={className}>
            <Header number={2} text={headerText}></Header>
            {children}
        </section>
    );
}
/* ------------- bigger elements ------------- */
function Request({ additionalClassName, input }) {
    return (
        <Window additionalClassName={"Request"} headerText={"Request"}>
            <TextInput defaultValue={input} disabled={true}></TextInput>
        </Window>
    );
}
function Response({ additionalClassName }) {
    return (
        <Window
            additionalClassName={"Response"}
            headerText={"Response"}
        ></Window>
    );
}
function App() {
    const dispath = useDispatch();
    const state = useSelector((state) => state.headers);
    return (
        <>
            <Header number={1} text={"Request Header Parser"}></Header>
            <Request input={state.input}></Request>
            <Response></Response>
            <Footer>
                by{" "}
                <Link
                    text={"Abdullah Fatota"}
                    href={"https://github.com/new-AF/request-headers-parser"}
                ></Link>
            </Footer>
        </>
    );
}

export default App;
