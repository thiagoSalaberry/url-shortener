import styles from "./styles.module.css"
import { vt323 } from "@/lib/fonts"
export function UrlResult({result}: {result?:string}) {
    console.log("Esto viene del result: ", result);
    
    return (
        <div className={styles.result_container}>
            <p className={`${styles.result} ${vt323.className}`}>
                {result && result.split("").map((letter, index) => {
                    return (
                        <span
                        className={`${styles.letter} ${index % 2 == 0 ? styles.top : styles.bottom}`}
                        key={index}
                        style={{animationDelay: `${index * .1}s`}}
                        >{letter}</span>
                    )
                })}
            </p>
        </div>
    )
}