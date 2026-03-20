import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchFavorite } from '../redux/favorites/slice'
import FavoriteSection from '../components/FavoriteSection/FavoriteSection'

const FavoritesPage = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFavorite())
  },[dispatch])



  return (
    <div>
      <FavoriteSection/>
    </div>
  )
}

export default FavoritesPage
