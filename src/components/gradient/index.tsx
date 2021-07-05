import {css, keyframes} from '@emotion/react';
import styled from '@emotion/styled';

type GradientProps = {number: number,colorFrom: string, colorTo: string, content: string, children: React.ReactNode, top?: string, bottom?: string}

const fade_1 = keyframes`
    0%,16.667%,to {
        opacity: 1;
    }
    33.333%,83.333% {
        opacity:0;
    }
`;

const fade_2 = keyframes`
    0%,to {
        opacity: 0;
    }
    33.333%,50% {
        opacity: 1;
    }
    16.667%,66.667% {
        opacity: 0;
    }
`;

const fade_3 = keyframes`
    0%,50%,to {
        opacity: 0;
    }
    66.667%,83.333% {
        opacity: 1;
    }
`;

const faded = [fade_1,fade_2,fade_3];

const Gradient = styled.span<GradientProps>`
    position: absolute;
    left: 0;
    top: ${props => props.top ? `${props.top}` : `none`};
    bottom: ${props => props.bottom ? `${props.bottom}` : `none`};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: ${props => `linear-gradient(90deg,${props.colorFrom},${props.colorTo});`};
    -webkit-animation: ${props => css`${faded[props.number]} 8s infinite`};
    animation: ${props => css`${faded[props.number]} 8s infinite`};
    &::before{
        content: ${props => props.content};
    }
`;

const GradientBefore = styled.span<{content: string}>`
    position: relative;
    &:before{
        content: "${props => props.content}";
        position: inherit;
    }
`;

export const GradientWrapper = (props: GradientProps) => {
    return(
        <GradientBefore content={props.content}>
            <Gradient {...props}/>
        </GradientBefore>
    );
}