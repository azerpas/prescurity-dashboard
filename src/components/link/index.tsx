import styled from "@emotion/styled"
import Link from "next/link"
import React from "react";

export const PresLink = (props) => {
    return(
        <ClassicLink {...props}>{props.children}</ClassicLink>
    );
}

const ClassicLink = styled(Link)`
    color: #0070F3;
`;