import styled from "styled-components";
import { vt323 } from "@/lib/fonts";
import { forwardRef, useImperativeHandle, useRef } from "react";
type ButtonProps = {
    style:"main" | "secondary" | "mainIcon" | "secondaryIcon";
    type: "button" | "submit";
    children: React.ReactNode;
    disabled?: boolean;
    onClick: (top?:number, left?:number) => void;
}
export type ButtonRef = {
    focus: () => void
}
const MainBtnStyled = styled.button`
    background: #f09274;
    border: 2px solid #151515;
    padding: 8px 20px;
    box-shadow: -2px 2px 0 0 rgb(15,15,15);
    border-radius: 5px;
    font-size: 26px;
    font-weight: 400;
    transition: all .15s;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
        transform: translate(2px, -2px);
        box-shadow: -4px 4px rgb(15,15,15);
    }
    &:active {
        /* box-shadow: -2px 2px 0 0 rgb(15,15,15); */
        transform: translate(-2px, 2px);
        box-shadow: none;
    }
    @media (max-width: 768px) {
        & {
            font-size: 14px;
            white-space: nowrap;
        }
    }
`
const SecondaryBtnStyled = styled(MainBtnStyled)`
    background: none;
`
const MainIconBtnStyled = styled(MainBtnStyled)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    @media (max-width: 768px) {
        & {
            padding: 5px;
            width: 46px;
            height: 36px;
        }
    }
`
const SecondaryIconBtnStyled = styled(SecondaryBtnStyled)`
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => ({
        focus: () => {
            if (buttonRef.current) {
                buttonRef.current.focus();
            }
        }
    }))
    const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const left = rect.left + rect.width / 2;
            const top = rect.bottom + 5;
            props.onClick(top, left)
        }
    }
    switch (props.style) {
        case "main":
            return <MainBtnStyled ref={buttonRef} onClick={handleClick} type={props.type} className={vt323.className}>{props.children}</MainBtnStyled>;
        case "secondary": 
            return <SecondaryBtnStyled ref={buttonRef} onClick={handleClick} type={props.type} className={vt323.className}>{props.children}</SecondaryBtnStyled>;
        case "mainIcon":
            return <MainIconBtnStyled ref={buttonRef} onClick={handleClick} type={props.type} className={vt323.className}>{props.children}</MainIconBtnStyled>;
        case "secondaryIcon":
            return <SecondaryIconBtnStyled ref={buttonRef} onClick={handleClick} type={props.type} className={vt323.className}>{props.children}</SecondaryIconBtnStyled>;
        default:
            return <MainBtnStyled ref={buttonRef} onClick={handleClick} type={props.type} className={vt323.className}>{props.children}</MainBtnStyled>;
    }
})

