import styles from './Search.module.css';
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Search() {
    const [showSearch, setShowSearch] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchBtnRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setShowSearch(prevState => !prevState);
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (
            searchInputRef.current && 
            searchInputRef.current !== e.target && 
            !searchInputRef.current.contains(e.target as Node) &&
            searchBtnRef.current &&
            !searchBtnRef.current.contains(e.target as Node)
        ) {
            setShowSearch(false);
        }
    };

    useEffect(() => {
        if (showSearch) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.body.style.overflow = '';
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSearch]);

    return (
        <div className={styles.search}>
            <div className={`${styles.search_input} ${showSearch ? styles.show : ''}`}>
                <input 
                    type='text'
                    placeholder='Поиск...'
                    ref={searchInputRef}
                />
            </div>
            <div 
                className={`${styles.search_btn}`}
                onClick={handleClick}
                ref={searchBtnRef} 
            >
                <FontAwesomeIcon icon={faSearch} />
            </div>
        </div>
    )
}
