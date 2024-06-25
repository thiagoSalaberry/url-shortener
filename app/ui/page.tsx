"use client"
import styles from "./styles.module.css";
import { Button } from "@/ui/buttons";
import { CopyIcon } from "@/ui/icons/copy";
import { ExternalIcon } from "@/ui/icons/link";
import { Input } from "@/ui/input";
import { useState } from "react";
import { UrlResult } from "@/components/result";
export default function Page() {
    return (
        <main className={styles.ui_page}>
            <AnimatedText>http://localhost:3000/xMBENA</AnimatedText>
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
        <main>
            <p className={styles.animated_text}>{
                children.split("").map((char, index) => {
                    return <span className={`${styles.span} ${index % 2 == 0 ? styles.top : styles.bottom}`} key={index} style={{animationDelay: `${index * 0.1}s`}}>{char}</span>
                })
            }</p>
            <Button type="main">Main Button</Button>
            <Button type="secondary">Secondary Button</Button>
            <Button type="mainIcon"><CopyIcon size={16}/></Button>
            <Button type="mainIcon"><ExternalIcon size={20}/></Button>
            <Button type="secondaryIcon">Main Button</Button>
            <Input type="text" name="test" value={test} missing={missing} disabled={submitting} placeholder="Place your long URL here..." onChange={(value)=>handleChange(value)}/>
            <UrlResult result="http://localhost:3000/xMBENA"/>
        </main>
    )
} 