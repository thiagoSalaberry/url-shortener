import styles from "./styles.module.css"
export function Loading({text}:{text?:string}) {
    return (
        <span className={styles.loading}>
            {text ? text : "Loading"}
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
            <span className={styles.dot}>.</span>
        </span>
    )
}