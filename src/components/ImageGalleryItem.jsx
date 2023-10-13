import css from './styles.module.css'
export const ImageGalleryItem = ({ id, webformatURL, largeImageURL, openModal, alt }) => {
    return (<li className={css.ImageGalleryItem} >
        <img src={webformatURL} alt={alt} onClick={() => openModal({ largeImageURL, alt })} />
    </li>)
}