"use client"

import Link from "next/link";
import styles from "./navigation.module.css";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthenticationContext } from "../../context/auth-context";
import CONSTANTS from "../../../data/constants";

export default function Navigation() {

    const {user, loading} = useContext(AuthenticationContext);

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
                    {loading? null :(
                    <>
                    {user?(
                        <>
                        {user.role === CONSTANTS.USER_ROLE.ADMIN ?(
                            <>
                            <li> <Link href='/admin/post/create' className={styles['nav-link']}>
                                Create Post
                                </Link>
                            </li>
                            </>
                        ):(
                            <>
                            <li> <Link href="/posts" className={styles["nav-link"]}>Posts </Link></li>
                            </>
                        )}
                         <li> <Link href='/user/change-password' className={styles['nav-link']}>
                            Change Password
                            </Link>
                        </li>
                        <li>
                            <span onClick={signOutHandler}
                                    className={styles['nav-link']}>
                                    Sign Out
                            </span>
                        </li>
                        </>
                    ):(
                        <>
                        <li> <Link href="/login" className={styles["nav-link"]}> SignIn</Link></li>
                        </>
                    )}
                    </>)}

                </ul>
            </nav>
        </header>
     )

}
