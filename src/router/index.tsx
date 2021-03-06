import { Suspense } from "react"

// Router
import { Route, Routes } from "react-router-dom"

// Components
import Loading from "components/root/Loading/Loading"
import Characters from "components/Characters/Characters"
import CharacterDetail from "components/CharacterDetail/CharacterDetail"
import NotFound from "components/root/NotFound/NotFound"

// Go to characters list by default
// Go to character details if you have the id
// Go to not found page if nothing matches
const Router = () => {
    return (
        <Suspense fallback={Loading}>
            <Routes>
                <Route path="/" element={<Characters />} />
                <Route path="/:id" element={<CharacterDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    )
}

export default Router
