type IconProps = {
    size:number;
    color?:string
    className?:string;
}
export function ArrowIcon(props:IconProps) {
    return (
        <svg
            width={props.size.toString()}
            height={(props.size * 1.14).toString()}
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6 0H8V12H10V14H8V16H6V14H4V12H6V0ZM2 10V12H4V10H2ZM2 10V8H0V10H2ZM12 10V12H10V10H12ZM12 10V8H14V10H12Z" fill={props.color}/>
        </svg>
    )
}