type IconProps = {
    size:number;
    color?:string
    className?:string;
}
export function LinkedInIcon(props:IconProps) {
    return (
        <svg width={props.size.toString()} height={(props.size * 1.076).toString()} viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0H2V2H0V0Z" fill={props.color || "black"}/>
            <path d="M0 4H2V14H0V4Z" fill={props.color || "black"}/>
            <path d="M4 4H6V14H4V4Z" fill={props.color || "black"}/>
            <path d="M11 6H13V14H11V6Z" fill={props.color || "black"}/>
            <path d="M11 4V6H6V4H11Z" fill={props.color || "black"}/>
        </svg>
    )
}