import { Suspense } from "react"

// Router
import { Route, Routes } from "react-router-dom"

// Components
import Loading from "components/root/Loading/Loading"
import Characters from "components/Characters/Characters"
import CharacterDetail from "components/CharacterDetail/CharacterDetail"

const Router = () => {
    return (
        <Suspense fallback={Loading}>
            <Routes>
                <Route path="/" element={<Characters />}>
                    <Route path=":id" element={<CharacterDetail />} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default Router
