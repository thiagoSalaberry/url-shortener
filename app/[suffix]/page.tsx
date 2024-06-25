"use client"
import styles from "./styles.module.css"
import { useParams } from "next/navigation";
import { useURL } from "@/lib/hooks/useUrl";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "@/components";
import { Button } from "@/ui";
export default function Page() {
    const router = useRouter();
    const params = useParams();
    const suffix = params?.suffix
    const {isLoading, error, data, getURL} = useURL()
    useEffect(()=>{
        if(suffix) {
            getURL(String(suffix))
        }
    }, [suffix])
    if(data) window.location.href = data
    return (
        <main className={styles.redirecting_page}>
            {isLoading ? <Loading text="Redirecting"/> : error ? (
                <>
                    <p className={styles.message}>Server error ocurred.</p>
                    <Button type="button" style="main" onClick={()=>router.back()}>Go back</Button>
                </>
            ) : null}
        </main>
    )
}
