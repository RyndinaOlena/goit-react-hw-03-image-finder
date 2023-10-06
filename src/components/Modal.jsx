import css from './styles.module.css'
export const Modal = ({ showModal, clouseModal, bigImg, onKeydoun }) => {
    return (<div>{showModal && <div> className={css.Overlay} onClick={clouseModal}
        <div>className={css.Modal}
            <img src={bigImg} alt="" />
        </div>
    </div>}</div>

    )
}