import { GoogleButton } from '../components/GoogleButton';
import { AuthForm } from '../components/AuthForm';
import { AuthBottom } from '../components/AuthBottom';
import styles from '../styles/Auth.module.css';

export default async function Login() {
    return (
        <div className='flex items-center justify-center flex-col h-screen'>
            <div className={`${styles.auth} flex flex-col gap-8`} >
                <header className='flex flex-col justify-center gap-2'>
                    <h1 className='text-center text-xl font-semibold'>Войти на Anima</h1>
                    <p className={`${styles.header_p} text-center text-base font-normal`}>Добро пожаловать! Пожалуйста, войдите, чтобы продолжить</p>
                </header>
                
                <GoogleButton />

                <div className='relative'>
                    <hr className={`${styles.line}`} />
                    <span className={`${styles.span} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+1px)] text-center
                        px-4 py-0.5 text-base leading-none`}>или</span>
                </div>

                <AuthForm />
            </div>
            <AuthBottom />
        </div>
    )
}