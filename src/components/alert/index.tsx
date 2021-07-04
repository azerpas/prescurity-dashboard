import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
} from "@chakra-ui/react";
import React from "react";
import { IAlertContext } from "../../context/alert";

export const MajorAlert = (props: IAlertContext) => {
    return(
        <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{props.title}</AlertTitle>
            <AlertDescription>{props.description}</AlertDescription>
            <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
    )
}