import css from './styles.module.css'
import React from 'react';

export const Searchbar = ({ handelSubmit }) => {
    return (
        <header className={''} >
            <form onSubmit={handelSubmit} className={css.Searchbar}>
                <button type="submit" className={css.btn}>
                    <span >Search</span>
                </button>

                <input
                    className={css.SearchForm}
                    name="searchForm"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form >
        </header >
    )
}
