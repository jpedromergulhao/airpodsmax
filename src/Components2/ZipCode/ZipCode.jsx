import React from "react";
import "./ZipCode.css";
import ZipCodeArea from "./ZipComponents/ZipCodeArea/ZipCodeArea";
import DeliverArea from "./ZipComponents/DeliverArea/DeliverArea";

function ZipCode() {

    return (
        <div className="actionArea">
            <ZipCodeArea/>
            <DeliverArea/>
        </div>
    )
}

export default ZipCode;