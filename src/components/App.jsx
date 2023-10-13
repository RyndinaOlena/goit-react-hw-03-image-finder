import { useEffect, useState } from 'react';


import React from 'react';

import { fetchImg } from "./get_api";

import { Searchbar } from './Searchbar'
import { ImageGallery } from './ImageGallery'
import { Loader } from './Loader'
import { Button } from './Button';
import { Modal } from './Modal';

export const App = () => {
  const [img, setImg] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState(null)
  const [searchName, setSearchName] = useState(null)
  const [page, setPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [totalHits, setTotalHits] = useState(0)
  const [bigImg, setbigImg] = useState(null)

  //пошук картинок



  const handelSubmit = (searchName) => {
    setSearchName(searchName)
  }


  const fetchByName = async ({ searchName, page }) => {

    try {
      setIsLoading(true)
      const { hits, totalHits } = await fetchImg({ searchName, page })
      setImg(hits)
      setTotalHits(totalHits)
    } catch ({ error }) { }
    finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (!searchName) return
    fetchByName({ searchName, page })
  }, [searchName, page])


  const handelChangePage = () => {
    setPage(prev => prev + 1)
  }

  const openModal = (bigImg) => {
    setbigImg(bigImg)
    setShowModal(true)
  }


  const closeModal = () => {
    setbigImg(null)
    setShowModal(false)
  }

  return (

    <div>
      <Searchbar onSubmit={handelSubmit} />
      {isLoading && <Loader />}
      {Boolean(img && img.length) && <ImageGallery img={img} openModal={openModal} />}
      < Button handelChangePage={handelChangePage} isDisabled={page >= Math.ceil(totalHits / 12)} />
      {showModal && <Modal closeModal={closeModal} bigImg={bigImg} />}
    </div >
  );
}

