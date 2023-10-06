import { Component } from 'react';


import React from 'react';

import { fetchImg } from "./get_api";

import { Searchbar } from './Searchbar'
import { ImageGallery } from './ImageGallery'
import { Loader } from './Loader'
import { Button } from './Button';
import { Modal } from './Modal';
export class App extends Component {
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

    return (
      <div>
        <Searchbar handelSubmit={this.handelSubmit} />
        {this.state.isLoading && <Loader />}
        <ImageGallery img={this.state.img} openModal={this.openModal} />
        < Button handelChangePage={this.handelChangePage} showModal={this.state.showModal} clouseModal={this.clouseModal} bigImg={this.state.bigImg} page={this.state.page} totalHits={this.state.totalHits} />
        <Modal showModal={this.state.showModal} clouseModal={this.clouseModal} bigImg={this.state.bigImg} onKeydoun={this.onKeydoun} />
      </div >
    );
  }

};
