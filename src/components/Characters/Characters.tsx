import { useState, useRef, useEffect } from 'react'

// Styles
import './style.scss'

const Characters = () => {
    // initialize list of characters
    const [postList, setPostList] = useState({
        list: [1, 2, 3, 4]
    })
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

    }, [])

    useEffect(() => {
        // here we simulate adding new posts to List
        const newList = postList.list.concat([1, 1, 1, 1])
        setPostList({
            list: newList
        })
    }, [page])

    const handleObserver = (entities: any) => {
        const target = entities[0]
        if (target.isIntersecting) {
            setPage((page) => page + 1)
        }
    }


    return (<div className="container">
        <div className="character-list">
            {
                postList.list.map((post, index) => {
                    return (
                        <div
                            key={index}
                            className="character"
                        >
                            <h2> {post} </h2>
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