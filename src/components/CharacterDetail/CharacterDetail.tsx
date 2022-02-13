import { useState } from 'react'
// Styles
import './style.scss'

// Router
import { useLocation } from 'react-router-dom'

// Mock Data
// import mockData from './mockData'

// Router
import { useNavigate } from "react-router"

// Redux
import { useAppSelector } from 'redux/hooks'
import { selectComicListById } from 'redux/store/charactersSlice'
import { useEffect } from 'react'

// Types
type LocationTypes = {
  state: {
    character: {}
  } | any
}

// Components
import Loading from "components/root/Loading/Loading"

export default function CharacterDetail() {
  let location: LocationTypes = useLocation()

  // State
  const comicListById = useAppSelector(selectComicListById)
  const loading = useAppSelector(state => state.characters.loading)
  const character = location.state

  // Local State
  const [sortedComics, setSortedComics] = useState([])

  // router
  const navigate = useNavigate()

  // const sortedMockData = mockData.results.sort((a, b) => +new Date(b.dates[0].date) - +new Date(a.dates[0].date))
  // console.log(sortedMockData)

  useEffect(() => {
    let clone = Object.assign([], comicListById?.results)
    const _sortedComics = clone?.sort((a: any, b: any) => +new Date(b.dates[0].date) - +new Date(a.dates[0].date))
    setSortedComics(_sortedComics)
  }, [comicListById])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className='character-detail-container'>
      <div className='back' onClick={handleBack}>
        <i className="fa fa-solid fa-angle-left" />
        <span>
          Go back to List
        </span>
      </div>
      <div className='character-detail'>
        <div
          className='main-image'
          style={{
            backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})`
          }}
        ></div>
        <div className='card'>
          <h3>
            {character.name}
          </h3>
          <span>
            {character.description}
          </span>
        </div>
      </div>

      <div className='comics'>
        <div className='header'>
          <h3>
            comics
          </h3>
          <span>
            by published date
          </span>
        </div>
        {
          sortedComics && sortedComics.length > 0 ? sortedComics.map((comic: any, index: number) => (
            // sortedMockData && sortedMockData.length > 0 ? sortedMockData.map((comic: any, index: number) => (
            <div
              className='comic'
              key={index}
            >
              <div className='comic-image'>
                <img
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={`comic-${comic.id}`}
                />
              </div>

              <div className='card'>
                <h2>
                  {comic.title}
                </h2>
                <h3>
                  {`${comic.prices[0].price} $`}
                </h3>
                <p>
                  {comic.description}
                </p>
                <span>
                  {new Date(comic.dates[0].date).toDateString()}
                </span>
              </div>
            </div>
          ))
            :
            <div>
              {
                loading ?
                  <Loading />
                  :
                  <h3>
                    No Comics Found
                  </h3>
              }
            </div>
        }
      </div>
    </div>
  )
}
