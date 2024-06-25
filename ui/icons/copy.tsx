import Copy from "./copy.svg";
type IconProps = {
    size:number;
    className?:string;
}
export function CopyIcon(props:IconProps) {
    return (
        <svg
            width={props.size.toString()}
            height={(props.size * 1.25).toString()}
            className={props.className}
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 0H11V2H2V15H0V0ZM4 4H16V20H4V4ZM6 6V18H14V6H6Z" fill="black"/>
        </svg>
    )
}