"use client"
import styles from "./styles.module.css";
import { Button, ButtonRef } from "@/ui/buttons";
import { CopyIcon, ExternalIcon, LinkedInIcon, GithubIcon, Navigation } from "@/ui";
import { Input } from "@/ui/input";
import { useEffect, useRef, useState } from "react";
import { UrlResult, Toast } from "@/components";
export default function Page() {
    const buttonRef = useRef<ButtonRef>(null)
    const [iconsSize, setIconsSize] = useState<"small" | "large">("large");
    const [toastPos, setToastPos] = useState<{top:number, left:number} | null>(null)
    const showToast = (top:number, left:number) => {
        if (buttonRef.current) {
            buttonRef.current.focus()
            setToastPos({
                top,
                left
            })
        }
    }
    useEffect(()=>{
        const handleResize = () => {
            if(window.innerWidth >= 768) {
                setIconsSize("large")
            } else {
                setIconsSize("small")
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize)
        return ()=> window.removeEventListener("resize", handleResize)
    }, [])
    useEffect(()=>{
        if(toastPos) {
            const timer = setTimeout(() => {
                setToastPos(null)
            }, 3000);
            return () => clearTimeout(timer)
        }
    }, [toastPos])
    return (
        <main className={styles.ui_page}>
            <Button type="button" ref={buttonRef} disabled={toastPos ? true : false} onClick={(top, left)=>showToast(top!, left!)} style="main">Main Button</Button>
            {
                toastPos && <Toast duration={3000} position={toastPos}>Copied!</Toast>
            }
            <p>{iconsSize}</p>
            <Button type="button" onClick={()=>{}} style="mainIcon"><GithubIcon size={iconsSize == "large" ? 20 : 14}/></Button>
        </main>
    )
}

const AnimatedText = ({children}:{children:string}) => {
    const [test, setTest] = useState("");
    const [missing, setMissing] = useState(false);
    const [submitting, setSubmitting] =useState(false)
    const handleChange = (value:string) => {
        setTest(value)
    }
    return (
        <p className={styles.animated_text}>{
            children.split("").map((char, index) => {
                return <span className={`${styles.span} ${index % 2 == 0 ? styles.top : styles.bottom}`} key={index} style={{animationDelay: `${index * 0.1}s`}}>{char}</span>
            })
        }</p>            
    )
} 