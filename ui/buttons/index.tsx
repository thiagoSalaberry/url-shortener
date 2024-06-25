import styled from "styled-components";
import { vt323 } from "@/lib/fonts";

type ButtonProps = {
    style:"main" | "secondary" | "mainIcon" | "secondaryIcon";
    type: "button" | "submit";
    children: React.ReactNode;
    disabled?: boolean;
    onClick: () => void;
}
const MainBtnStyled = styled.button`
    background: #f09274;
    border: 2px solid #151515;
    padding: 8px 20px;
    box-shadow: -2px 2px 0 0 rgb(15,15,15);
    border-radius: 5px;
    font-size: 26px;
    font-weight: 400;
    transition: all .2s;
    cursor: pointer;
    &:hover {
        transform: translate(2px, -2px);
        box-shadow: -4px 4px rgb(15,15,15);
    }
    &:active {
        transform: translate(0px,0px);
        box-shadow: none;
    }
`
const SecondaryBtnStyled = styled(MainBtnStyled)`
    background: none;
`
const MainIconBtnStyled = styled(MainBtnStyled)`
    display: flex;
    justify-content: center;
    align-items: center;
`
const SecondaryIconBtnStyled = styled(SecondaryBtnStyled)`
    
`
export function Button(props:ButtonProps) {
    switch (props.style) {
        case "main":
            return <MainBtnStyled onClick={props.onClick} type={props.type} className={vt323.className}>{props.children}</MainBtnStyled>;
        case "secondary": 
            return <SecondaryBtnStyled onClick={props.onClick} type={props.type} className={vt323.className}>{props.children}</SecondaryBtnStyled>;
        case "mainIcon":
            return <MainIconBtnStyled onClick={props.onClick} type={props.type} className={vt323.className}>{props.children}</MainIconBtnStyled>;
        case "secondaryIcon":
            return <SecondaryIconBtnStyled onClick={props.onClick} type={props.type} className={vt323.className}>{props.children}</SecondaryIconBtnStyled>;
        default:
            return <MainBtnStyled onClick={props.onClick} type={props.type} className={vt323.className}>{props.children}</MainBtnStyled>;
    }
}