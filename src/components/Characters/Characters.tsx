import { useState, useRef, useEffect } from 'react'

// Styles
import './style.scss'

// Mock Data
// import mockData from './mockData'

// Redux
import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { selectCharacterList, getCharacters, setLimit, setOffset } from 'redux/store/charactersSlice'

// Models
import { charactersQueryParamTypes, characterListResultItemType } from 'models'

const Characters = () => {
    // Global State
    const dispatch = useAppDispatch()
    const characterList = useAppSelector(selectCharacterList)
    const limit = useAppSelector(state => state.characters.limit)
    const offset = useAppSelector(state => state.characters.offset)

    // tracking on which page we currently are
    const [page, setPage] = useState(1)

    // add loader refrence 
    const loader = useRef<HTMLHeadingElement>(null)

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        }
        // initialize IntersectionObserver
        // and attaching to Load More div
        const observer = new IntersectionObserver(handleObserver, options)
        if (loader.current) {
            observer.observe(loader.current)
        }
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let newParams: charactersQueryParamTypes = {
            apikey: process.env.REACT_APP_API_KEY,
            limit: limit,
            offset: offset
        }
        console.log('reached next scroll', newParams)
        dispatch(getCharacters(newParams))
        // eslint-disable-next-line
    }, [page, dispatch])

    const handleObserver = (entities: any) => {
        const target = entities[0]
        if (target.isIntersecting) {
            setPage((page) => page + 1)
            dispatch(setLimit(limit + 30))
            dispatch(setOffset(offset + 30))
        }
    }

    return (<div className="container">
        <div className="character-list">
            {
                characterList?.results.map((character: characterListResultItemType, index: number) => {
                // mockData.map((character: characterListResultItemType, index: number) => {
                    return (
                        <div
                            key={index}
                            className="character"
                        >
                            <div className='thumb-frame'>
                                <img
                                    src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                                    alt={`thumbnail-${character.id}`}
                                />
                            </div>
                            <div className='card-body'>
                                <p>{character.name}</p>
                            </div>

                        </div>
                    )
                })
            }
            <div className="loading" ref={loader}>
                <h2>Load More</h2>
            </div>
        </div>
    </div>)
}

export default Characters