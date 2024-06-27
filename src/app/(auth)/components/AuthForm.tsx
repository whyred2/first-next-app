'use client';

import InputField from "@/Components/InputField/InputField";
import { useRouter, usePathname } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState, type FormEventHandler } from "react";
import { toast } from 'react-toastify';
import { LoaderCircle } from 'lucide-react';
import axios from 'axios';
import styles from '../styles/Auth.module.css';

export const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', username: '', confirmPassword: '' });
    const [submit, setSubmit] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isSignUp = pathname === '/sign-up';

    const validateForm = () => {
        const newErrors = { email: '', password: '', username: '', confirmPassword: '' };

        if (!email) {
            newErrors.email = 'Заполните поле';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Заполните поле';
        }

        if (!password) {
            newErrors.password = 'Заполните поле';
        } else if (password.length < 6) {
            newErrors.password = 'Пароль должен содержать не менее 6 символов';
        }

        if (isSignUp) {
            if (!username) {
                newErrors.username = 'Заполните поле';
            }
            if (!confirmPassword) {
                newErrors.confirmPassword = 'Заполните поле';
            } else if (password !== confirmPassword) {
                newErrors.confirmPassword = 'Пароли не совпадают';
            }
        }

        setErrors(newErrors);
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        setSubmit(true);
        if (!validateForm()) {
            setSubmit(false);
            return;
        }

        if (isSignUp) {
            // Handle registration
            try {
                await axios.post('/api/auth/register', { email, username, password });
                toast.success('Регистрация успешна!');
                router.replace('/sign-in');
            } catch (error: any) {
                toast.error(error.response?.data?.message || 'Ошибка регистрации');
            }
        } else {
            // Handle login
            const res = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (res && !res.error) {
                router.replace('/profile');
                toast.success('Успех!');
            } else if (res?.status === 401) {
                toast.error('Неправильный логин или пароль');
            } else {
                toast.error(res?.error || 'Ошибка авторизации');
            }
        }

        setSubmit(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {isSignUp && (
                <InputField 
                    label="Имя пользователя"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={errors.username}
                />
            )}
            <InputField 
                label="Почта"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
            />
            <InputField 
                label="Пароль"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
            />
            {isSignUp && (
                <InputField 
                    label="Подтвердите пароль"
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={errors.confirmPassword}
                />
            )}
            <button type="submit" className="main_btn gap-2 mt-3">
                {submit && <LoaderCircle className={styles.loader} />}
                {isSignUp ? 'Зарегистрироваться' : 'Войти'}
            </button>
        </form>
    );
};
