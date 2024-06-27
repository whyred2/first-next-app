import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
    label: string;
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, value, onChange, error }) => {
    return (
        <div className="flex flex-col">
            <label htmlFor={name}>{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                className={`${styles.input} ${error ? styles.input_error : ''}`}
            />
            {error && <span className={styles.error }>{error}</span>}
        </div>
    );
};

export default InputField;
