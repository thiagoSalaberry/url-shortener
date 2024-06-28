import styles from "./styles.module.css"
import Link from "next/link";
type NavigationProps = {
    children: React.ReactNode;
    href: string;
}
export function Navigation(props:NavigationProps) {
    return (
        <div className={styles.navigation}>
            <Link href={props.href} target="_blank">{props.children}</Link>
        </div>
    )
}