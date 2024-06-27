'use client';

import Link from 'next/link';
import styles from '../styles/Auth.module.css';
import { usePathname } from 'next/navigation';

export const AuthBottom = () => {
    const pathname = usePathname();
    const login = pathname === '/sign-in';

    return (
        <div className={styles.auth_footer}>
            <div className={`${styles.footer_action} flex items-center justify-center gap-2`}>
                {login ? (
                    <>
                        <span>Нет аккаунта?</span>
                        <Link href='/sign-up' className={styles.link}>Зарегистрироваться</Link>
                    </>
                ) : (
                    <>
                        <span>Есть аккаунт?</span>
                        <Link href='/sign-in' className={styles.link}>Войти</Link>
                    </>
                )}

            </div>
        </div>
    )
}