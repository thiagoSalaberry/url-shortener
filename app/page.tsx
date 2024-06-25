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
import { Loading, UrlResult } from "@/components";
/* UI ATOMS */
import { Input, Button, ArrowIcon, CopyIcon, ExternalIcon } from "@/ui";
const BASE_URL = process.env.BASE_URL;
const URL_TO_CALL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : BASE_URL;

export default function Home() {
  const {longUrl, setLongUrl, missing, setMissing, submitting, setSubmitting} = useForm()
  const {isLoading, error, data, createUrl} = useCreateUrl();
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
  return (
    <main className={styles.main}>
      <h1 className={`${styles.title} ${pressStart2p.className}`}>TEOXYS URL SHORTENER</h1>
      <h3 className={`${styles.subtitle} ${pressStart2p.className}`}>The quickest and coolest, worldwide.</h3>
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
          <Button type="button" style="mainIcon" onClick={()=>{data && copy(`${URL_TO_CALL}/${data.url}`)}}><CopyIcon size={16}/></Button>
          <Button type="button" style="mainIcon" onClick={()=>data && router.push(data?.url)}><ExternalIcon size={20}/></Button>
        </div>
      </section>
    </main>
  );
}
