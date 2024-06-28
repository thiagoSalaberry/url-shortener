import { useEffect, useState } from "react"
import styles from "./styles.module.css"
type ToastProps = {
    children:React.ReactNode,
    position: {top:number, left:number}
    duration?: number
}
export function Toast(props:ToastProps) {
    const [visible, setVisible] = useState(true);
    useEffect(()=>{
        let timer:ReturnType<typeof setTimeout>;
        if(props.duration) {
            timer = setTimeout(() => {
                setVisible(false)
            }, props.duration);
        }
        return () => {
            if(timer) clearTimeout(timer);
        }
    }, [props.duration])
    if(!visible) return null
    return (
        <div className={styles.container} style={{top: props.position.top, left: props.position.left}}>
            <span className={styles.triangle}></span>
            <p className={styles.text}>{props.children}</p>
        </div>
    )
}