type IconProps = {
    size:number;
    color?:string
    className?:string;
}
export function CutIcon(props:IconProps) {
    return (
        <svg style={{transform: "rotate(-90deg)"}} width={props.size.toString()} height={props.size.toString()} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V2H0V0ZM4 4H2V2H4V4ZM6 6H4V4H6V6ZM8 8V6H6V8H8ZM12 8H8V12H0V20H8V12H12V20H20V12H12V8ZM14 6V8H12V6H14ZM16 4V6H14V4H16ZM18 2H16V4H18V2ZM18 2V0H20V2H18ZM2 18V14H6V18H2ZM14 18V14H18V18H14Z" fill={props.color || "black"}/>
        </svg>
    )
}