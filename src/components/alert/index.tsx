import {Alert, AlertDescription, AlertIcon, AlertTitle,} from "@chakra-ui/react";
import React from "react";
import {IAlertContext} from "../../context/alert";

export const MajorAlert = (props: IAlertContext) => {
    if(props.display === false){
        return (<></>);
    }
    return(
        <Alert status={props.status ? props.status : "error"}>
            <AlertIcon />
            <AlertTitle mr={2}>{props.title}</AlertTitle>
            <AlertDescription>{props.description}</AlertDescription>
        </Alert>
    )
}