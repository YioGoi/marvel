import { useRef, useEffect, useCallback } from 'react'

// Styles
import './style.scss'

// Mock Data
// import mockData from './mockData'

// Redux
import { useAppSelector, useAppDispatch } from 'redux/hooks'
import { 
    selectCharacterList, 
    getCharacters, 
    setLimit, 
    setOffset 
} from 'redux/store/charactersSlice'

// Models
import { charactersQueryParamTypes, characterListResultItemType } from 'models'

const Characters = () => {
    // Global State
    const dispatch = useAppDispatch()
    const characterList = useAppSelector(selectCharacterList)
    const limit = useAppSelector(state => state.characters.limit)
    const offset = useAppSelector(state => state.characters.offset)

    // add loader refrence 
    const loader = useRef<HTMLHeadingElement>(null)

    const handleObserver = useCallback((entities: any) => {
        const target = entities[0]
        if (target.isIntersecting) {
            dispatch(setLimit(limit + 30))
            dispatch(setOffset(offset + 30))

            let newParams: charactersQueryParamTypes = {
                apikey: process.env.REACT_APP_API_KEY,
                limit: limit + 30,
                offset: offset + 30
            }
            console.log('reached next scroll', newParams)
            dispatch(getCharacters(newParams))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
            <div className="loading" ref={loader}></div>
        </div>
    </div>)
}

export default Characters