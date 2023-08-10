import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callServer } from "./headersSlice";
import { prettyPrintJson } from "pretty-print-json";

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
        <textarea
            className={className}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange}
            onKeyDown={onKeyDown}
        ></textarea>
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
function Button({ additionalClassName, text, onClick }) {
    const className = joinClassNames(additionalClassName, "Button");
    return (
        <button className={className} onClick={onClick}>
            {text}
        </button>
    );
}

function Text({ additionalClassName, text }) {
    const className = joinClassNames(additionalClassName, "Text");
    return <div className={className}>{text}</div>;
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
/* ------------- Request ------------- */
function Request({ additionalClassName, input }) {
    const dispath = useDispatch();
    function onClick(event) {
        dispath(callServer());
    }
    return (
        <Window additionalClassName={"Request"} headerText={"Request"}>
            <TextInput defaultValue={input} disabled={true}></TextInput>
            <Button text={"Send Request"} onClick={onClick}></Button>
        </Window>
    );
}
/* ------------- Response ------------- */
function Response({ additionalClassName, output: json }) {
    return (
        <Window additionalClassName={"Response"} headerText={"Response"}>
            <pre
                className="json-container"
                dangerouslySetInnerHTML={{
                    __html:
                        json === ""
                            ? undefined
                            : prettyPrintJson.toHtml(JSON.parse(json), {
                                  lineNumbers: true,
                                  indent: 4,
                              }),
                }}
            ></pre>
        </Window>
    );
}
/* ------------- APP ------------- */
function App() {
    const state = useSelector((state) => state.headers);
    return (
        <>
            <Header number={1} text={"Request Header Parser"}></Header>
            <Request input={state.input}></Request>
            {/* state.json is a string */}
            <Response output={state.json}></Response>
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
