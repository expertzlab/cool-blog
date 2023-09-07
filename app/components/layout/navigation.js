"use client"

import Link from "next/link";
import styles from "./navigation.module.css";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Navigation() {

    const {signout} = useAuth();
    const router = useRouter()

    const signOutHandler = () => {
        signout();
        router.push('/');
    }

    return ( 
                <header className={styles.header}> 
            <Link href="/" className={styles["nav-link"]}> HOME </Link>
            <nav> 
                <ul> 
                    <li> <Link href="/posts" className={styles["nav-link"]}>Posts </Link></li> 
                    <li> <Link href="/login" className={styles["nav-link"]}> SignIn</Link></li>
                    <li> <Link href='/admin/post/create' className={styles['nav-link']}>
                         Create Post
                        </Link>
                    </li>
                    <li> 
                        <span onClick={signOutHandler} 
                        className={styles['nav-link']}>
                         Sign Out
                        </span>
                    </li>
                </ul>
            </nav>
        </header>
     )

}
