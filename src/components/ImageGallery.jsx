
import { ImageGalleryItem } from './ImageGalleryItem'
import css from './styles.module.css'
export const ImageGallery = ({ img, openModal }) => {
    const showImg = Boolean((img) && img.length)
    return (

        <ul className={css.ImageGallery} >
            {showImg && img.map(images => {
                return (
                    <ImageGalleryItem openModal={openModal} id={images.id} webformatURL={images.webformatURL} largeImageURL={images.largeImageURL} key={images.id} />)
            })}
        </ul >
    )

}