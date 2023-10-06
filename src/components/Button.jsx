
import css from './styles.module.css'
export const Button = ({ handelChangePage, page, totalHits }) => {
    const isDisabled = page * 12 >= totalHits
    return (<div> <button type="button" onClick={handelChangePage} className={css.Button} disabled={isDisabled}>Load more</button></div>

    )

}
