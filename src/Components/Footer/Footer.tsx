import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import Logo from './../../../public/anima.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTiktok, faXTwitter } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.top}>

                <Logo className={styles.logo_img} />

                <div className={styles.social}>
                    <Link href='/' className={styles.item}>
                        <FontAwesomeIcon icon={faDiscord} className='footer__icon-large' />
                    </Link>

                    <Link href='/' className={styles.item}>
                        <FontAwesomeIcon icon={faTiktok} className='footer__icon-large' />
                    </Link>

                    <Link href='/' className={styles.item}>
                        <FontAwesomeIcon icon={faXTwitter} className='footer__icon-large' />
                    </Link>
                </div>
            </div>
            <div className={styles.line} />
            <div className={styles.bottom}>
                <div className={styles.copyright}>
                    <p>© 2024. Все права защищены.</p>
                </div>
                <div className={styles.links}>
                    <Link href='/'>Условия обслуживания</Link>
                    {' | '}
                    <Link href='/'>Конфиденциальность</Link>
                </div>
            </div>
        </footer>
    )
}
