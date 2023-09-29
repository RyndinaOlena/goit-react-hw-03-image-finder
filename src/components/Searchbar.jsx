import css from './styles.module.css'
import { fetchImg } from "./form";




export const Searchbar = (onSubmit) => {

    return <header className={css.Searchbar
    } >
        <form className={css.SearchForm}>
            <button type="submit" onSubmit={console.log(fetchImg())}>
                <span className={css.SearchFormButtonLabel}>Search</span>
            </button>

            <input
                className={css.SearchForInput}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
            />
        </form >
    </header >

}