
import css from './styles.module.css'
export const Button = ({ handelChangePage, isDisabled }) => {

    return (<button type="button" onClick={handelChangePage} className={css.Button} disabled={isDisabled}>Load more</button>

    )

}
