"use client";
import styles from "./page.module.css";
/* HOOKS */
import { useRouter } from "next/navigation";
import { useForm } from "@/lib/hooks/useForm";
import { useCreateUrl } from "@/lib/hooks/useCreateUrl";
/* UTILITIES */
import copy from "copy-to-clipboard";
/* FONTS */
import { vt323, pressStart2p } from "@/lib/fonts";
/* COMPONENTS */
import { Loading, UrlResult, Toast } from "@/components";
/* UI ATOMS */
import { Input, Button, ArrowIcon, CopyIcon, ExternalIcon, GithubIcon, LinkedInIcon, Navigation } from "@/ui";
import { ButtonRef } from "@/ui/buttons";
import { useEffect, useRef, useState } from "react";
// const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL = "https://teoxys-url.vercel.app";
const URL_TO_CALL =
  process.env.NODE_ENV == "production"
    ? BASE_URL
    : "http://localhost:3000"
export default function Home() {
  const {longUrl, setLongUrl, missing, setMissing, submitting, setSubmitting} = useForm()
  const {isLoading, error, data, createUrl} = useCreateUrl();
  const [toastPos, setToastPos] = useState<{top:number, left:number} | null>(null)
  const copyButtonRef = useRef<ButtonRef>(null)
  const router = useRouter()
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUrl(longUrl)
  }
  const handleInvalid = (e:React.FormEvent<HTMLFormElement>):void => {
    e.preventDefault();
    setMissing(true)
  }
  const handleChange = (value:string):void => {
    setLongUrl(value)
    setMissing(false)
  }
  const showToast = (top:number, left:number) => {
    if(copyButtonRef.current) {
      copyButtonRef.current.focus();
      setToastPos({
        top,
        left
      })
    }
  }
  const handleCopyClick = (text:string, top:number, left:number) => {
    copy(text);
    showToast(top, left)
  }
  useEffect(()=>{
    if(toastPos) {
      const timer = setTimeout(() => {
        setToastPos(null)
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastPos])
  console.log(data);
  
  return (
    <main className={styles.main}>
      <div className={styles.hs_container}>
        <h1 className={`${styles.title} ${pressStart2p.className}`}>TEOXYS URL<br/> SHORTENER</h1>
        <h3 className={`${styles.subtitle} ${pressStart2p.className}`}>The quickest and coolest, worldwide.</h3>
      </div>
      <section className={styles.content}>
        <form onInvalid={handleInvalid} onSubmit={handleSubmit} className={styles.creation_form}>
          <Input
            type="text"
            name="long_url"
            value={longUrl}
            onChange={(value)=>handleChange(value)}
            placeholder="Place your long URL here..."
            required={true}
            missing={missing}
            disabled={submitting}
            />
          <Button onClick={()=>handleSubmit} type="submit" style="main" disabled={submitting}>Shorten URL</Button>
        </form>
        <p className={`${styles.info_message} ${isLoading && styles.loading} ${missing && styles.missing} ${error && styles.error} ${data && !isLoading && styles.success} ${vt323.className}`}>
          {isLoading ? <Loading/> : error ? "Server error occurred" : data ? <span><ArrowIcon size={14} color="#46d21b"/> Here is your shortened URL <ArrowIcon size={14} color="#46d21b"/></span> : null}
        </p>
        <div className={styles.result_container}>
          <UrlResult result={data && !isLoading ? `${URL_TO_CALL}/${data.url}` : ""}/>
          <Button ref={copyButtonRef} type="button" style="mainIcon" onClick={(top,left)=>{data && handleCopyClick(`${URL_TO_CALL}/${data.url}`, top!, left!)}}><CopyIcon size={16}/></Button>
          <Button type="button" style="mainIcon" onClick={()=>data && router.push(data?.url)}><ExternalIcon size={20}/></Button>
        </div>
      </section>
      <footer className={styles.sm_container}>
        <p className={styles.made_by}>Made by: Thiago Salaberry</p>
          <Navigation href="https://github.com/thiagoSalaberry"><GithubIcon size={20}/></Navigation>
          <Navigation href="https://www.linkedin.com/in/thiago-salaberry/"><LinkedInIcon size={20}/></Navigation>
      </footer>
      {toastPos && (
        <Toast duration={3000} position={toastPos}>Copied!</Toast>
      )}
    </main>
  );
}