
// next
import Link from "next/link";

// node
import styled from "@emotion/styled";

// react
import React from "react";

export const PresLink = (props) => {
    return(
        <ClassicLink {...props}>{props.children}</ClassicLink>
    );
}

const ClassicLink = styled(Link)`
    color: #0070F3;
`;