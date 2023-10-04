import css from './styles.module.css'
import React from 'react';


import { fetchImg } from "./get_api";
import { Component } from 'react';



export class Searchbar extends Component {

    state = {
        img: [],
        isLoading: false,
        error: null,
        searchName: null,
        page: 1,
        showModal: false,
        totalHits: 0,
        bigImg: null

    }
    constructor(props) {
        super(props)
        this.handelChangePage = this.handelChangePage.bind(this)
    }

    //пошук картинок

    fatchAllImg = async () => {
        try {
            const { hits, totalHits } = await fetchImg()

            this.setState({ img: hits, totalHits: totalHits })

        } catch (error) { }
    }

    componentDidMount() {
        this.fatchAllImg()
        window.addEventListener('keydown', this.onKeydoun)
    }


    handelSubmit = (event) => {
        event.preventDefault();
        const searchForm = event.currentTarget.elements.searchForm.value
        this.setState({
            searchName: searchForm,
        })
    }


    fetchByName = async () => {

        try {
            this.setState({ isLoading: true })
            const { hits, totalHits } = await fetchImg(this.state.searchName)
            this.setState({ img: hits, totalHits: totalHits, page: 1 })

        } catch ({ error }) { } finally {
            this.setState({ isLoading: false })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.searchName !== this.state.searchName) {
            this.fetchByName()
        }
    }

    //paginate


    handelChangePage = async () => {
        const page = this.state.page + 1
        console.log(page)
        try {
            this.setState({ isLoading: true })
            const { hits, totalHits } = await fetchImg(this.state.searchName, page)
            console.log(hits, totalHits, this.state.img,)
            this.setState({ img: [...this.state.img, ...hits], page, totalHits: totalHits })
            console.log('qwe', this.state.img)
        } catch ({ error }) { } finally {
            this.setState({ isLoading: false })
        }
    }


    //modal


    onKeydoun = (event) => {
        if (event.code === 'Escape') {
            this.setState(({ showModal }) => ({
                showModal: !showModal
            }))
        }
    }

    openModal = (event) => {
        console.log(event)
        this.setState(({ showModal }) => ({
            showModal: !showModal,
            bigImg: event.target.getAttribute('data-large')
        }))
    }



    clouseModal = (event) => {
        if (event.currentTarget === event.target) {
            this.setState(({ showModal }) => ({
                showModal: !showModal
            }))
        }
    }


    render() {

        const showImg = Boolean((this.state.img) && this.state.img.length)
        const isDisabled = this.state.page * 12 >= this.state.totalHits
        return <header className={''} >
            <form onSubmit={this.handelSubmit} className={css.Searchbar}>
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
            {this.state.isLoading && <div>Загружаем....</div>}
            <ul className={css.ImageGallery}>
                {showImg && this.state.img.map(images => {
                    return (
                        <li key={images.id} className={css.ImageGalleryItem} >
                            <img src={images.webformatURL} alt="" data-large={images.largeImageURL} onClick={this.openModal} />
                        </li>
                    )

                })}
            </ul>
            <div> <button type="button" onClick={this.handelChangePage} className={css.Button} disabled={isDisabled}>Load more</button></div>
            {this.state.showModal && <div className={css.Overlay} onClick={this.clouseModal}>
                <div className={css.Modal}>
                    <img src={this.state.bigImg} alt="" />
                </div>
            </div>}

        </header >
    }
}