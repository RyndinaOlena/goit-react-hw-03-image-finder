
import { ImageGalleryItem } from './ImageGalleryItem'
import css from './styles.module.css'
export const ImageGallery = ({ img, openModal }) => {

    return (

        <ul className={css.ImageGallery} >
            {img.map(images => {
                return (
                    <ImageGalleryItem openModal={openModal} id={images.id} webformatURL={images.webformatURL} largeImageURL={images.largeImageURL} key={images.id} alt={images.tags} />)
            })}
        </ul >
    )

}