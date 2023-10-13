import { useCallback, useEffect } from 'react'
import css from './styles.module.css'

export const Modal = ({ closeModal, bigImg }) => {
    const handleClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal()
        }
    }
    const onKeydoun = useCallback((event) => {
        if (event.code === 'Escape') {
            closeModal()
        }
    }, [closeModal])
    useEffect(() => {
        window.addEventListener('keydown', onKeydoun)
        return window.removeEventListener('keydown', onKeydoun)
    }, [onKeydoun])
    return (<div className={css.Overlay} onClick={handleClick}>
        <div className={css.Modal}>
            <img src={bigImg.largeImageURL} alt={bigImg.alt} />
        </div>
    </div>

    )
}