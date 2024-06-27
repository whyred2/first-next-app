"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHouse, faUser } from '@fortawesome/free-solid-svg-icons'
import Search from '../SearchComponent/Search';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {

    const session = useSession();
    console.log(session)

    return (
        <header className={styles.header}>
    
            <div className={styles.left}>
                <div className={styles.menu_btn}>
                    <FontAwesomeIcon icon={faBars} className='footer__icon-large' />
                </div>
                <div className={styles.menu_btn}>
                    <Link href='/'>
                        <FontAwesomeIcon icon={faHouse} className='footer__icon-large' />
                    </Link>
                </div>
            </div>
            
            <div className={styles.right}>
                <Search />
                <div className={styles.auth}>
                    {session.data ? (
                        <>
                            <Link href='' className='main_btn' onClick={() => signOut({callbackUrl: '/'})}>Выйти</Link>
                        </>
                    ) : (
                        <>
                            <button className='main_btn' style={{gap: '15px'}}>
                                <Link href='/sign-in'>
                                    Гость <FontAwesomeIcon icon={faUser} className='footer__icon-large' />
                                </Link>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}