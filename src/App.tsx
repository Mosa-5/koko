import {lazy, Suspense} from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import Layout from "./layout"
import Loader from "./components/ui/loader"

const HomePage = lazy(() => import("./pages/homePage"))
const LanguageCatalog = lazy(() => import("./pages/catalog"))
const LanguageExercises = lazy(() => import("./pages/languagePage"))
const ExerciseOnePage = lazy(() => import("./pages/exerciseOnePage"))
const ExerciseTwoPage = lazy(() => import("./pages/exerciseTwoPage"))
const AboutUs = lazy(() => import("./pages/aboutUsPage"))


function App() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center h-screen">
                <Loader/>
            </div>
        }>
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<Navigate to={'/home'}/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/catalog' element={<LanguageCatalog/>}/>
                <Route path='/catalog/:lang' element={<LanguageExercises/>}/>
                <Route path='/catalog/:lang/level1/:ex' element={<ExerciseOnePage/>}/>
                <Route path='/catalog/:lang/level2/:ex' element={<ExerciseTwoPage/>}/>
                <Route path='/catalog/:lang/level3/:ex' element={<ExerciseOnePage/>}/>
                <Route path="/aboutUs" element={<AboutUs/>}/>
            </Route>

            <Route path='*' element={
                <div className='flex w-screen h-screen justify-center items-center'>
                    <h1 className='text-8xl text-center'>404 Page Not Found</h1>
                </div>
            }/>
        </Routes>
        </Suspense>
    )

  }

  export default App;