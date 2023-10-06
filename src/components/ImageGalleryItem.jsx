import css from './styles.module.css'
export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, openModal }) => {
    return (<li key={id} className={css.ImageGalleryItem} >
        <img src={webformatURL} alt="" data-large={largeImageURL} onClick={openModal} />
    </li>)
}