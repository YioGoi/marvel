import { useRef, useEffect, useCallback } from 'react'

// Styles
import './style.scss'

// Mock Data
import mockData from './mockData'

// Redux
import { useAppSelector, useAppDispatch } from 'redux/hooks'
import {
    selectCharacterList,
    getCharacters,
    getCharacterComics
} from 'redux/store/charactersSlice'

// Router
import { useNavigate, Outlet } from "react-router"

// Models
import { charactersQueryParamTypes, characterListResultItemType, comicsQueryParamTypes } from 'models'

// Components
import Loading from "components/root/Loading/Loading"

const Characters = () => {
    // Global State
    const dispatch = useAppDispatch()
    const characterList = useAppSelector(selectCharacterList)
    const offset = useAppSelector(state => state.characters.offset)
    const loading = useAppSelector(state => state.characters.loading)

    // add loader refrence 
    const loader = useRef<HTMLHeadingElement>(null)
    const rootRef = useRef<HTMLHeadingElement>(null)

    // router
    const navigate = useNavigate()

    const handleObserver = useCallback((entities: any) => {
        const target = entities[0]
        if (target.isIntersecting && target.intersectionRatio > 0) {
            let newParams: charactersQueryParamTypes = {
                apikey: process.env.REACT_APP_API_KEY,
                limit: 30,
                offset: offset
            }
            dispatch(getCharacters(newParams))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        let options = {
            root: null,
            rootMargin: "50px",
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

    // Click a character to show detail page
    const handleClickCharacter = (e: React.MouseEvent<HTMLElement>, character: characterListResultItemType) => {
        e.preventDefault()
        let comicParams: comicsQueryParamTypes = {
            apikey: process.env.REACT_APP_API_KEY,
            id: character.id,
            limit: 10
        }
        dispatch(getCharacterComics(comicParams))
        navigate(`/${character.id}`, { state: character })
    }

    return (
        <div className="container" ref={rootRef}>
            <header>
                <h3>
                    marvel character list
                </h3>
            </header>
            <div className="character-list">
                {
                    // characterList?.results.map((character: characterListResultItemType, index: number) => {
                        mockData.map((character: characterListResultItemType, index: number) => {
                        return (
                            <div
                                key={index}
                                className="character"
                                onClick={(e) => handleClickCharacter(e, character)}
                            >
                                <div className='thumb-frame'>
                                    <div
                                        className='image'
                                        style={{
                                            backgroundImage: `url(${character.thumbnail.path}.${character.thumbnail.extension})`
                                        }}
                                    ></div>
                                </div>
                                <div className='card-body'>
                                    <p>{character.name}</p>
                                </div>

                            </div>
                        )
                    })
                }
                <div className="loading" ref={loader}>
                    {
                        loading && <Loading />
                    }
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Characters