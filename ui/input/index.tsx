import styles from "./styles.module.css"
import { vt323 } from "@/lib/fonts";
type InputProps = {
    type: "text" | "number" | "email" | "password";
    name:string;
    value: string;
    placeholder?: string
    disabled?:boolean;
    required?:boolean;
    missing:boolean;
    onChange: (value:string) => void
}
export function Input(props:InputProps) {
    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        props.onChange(inputValue)
    }
    return (
        <input
            className={`${styles.input} ${vt323.className} ${props.value !== "" && styles.valued} ${props.missing && styles.missing} ${props.disabled && styles.disabled}`}
            type={props.type}
            name={props.name}
            value={props.value}
            placeholder={props.placeholder}
            disabled={props.disabled}
            required={props.required}
            onChange={handleChange}
        />
    )
}