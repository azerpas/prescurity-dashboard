import React,  { Component} from "react";
import QRCode from 'qrcode.react'

export default function qrcode () {

    return (
        <div classeName={'signature'}>
           <QRCODE 
           value="123456"
           size={290}
           level={H}
           includeMargin={true}
           /> 
        </div>


    )
}
