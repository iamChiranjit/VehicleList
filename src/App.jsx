import { BrowserRouter, Route, Routes } from "react-router-dom"
import Nav from "./Component/Nav"
import Home from "./Component/Home"
import LikeList from "./Component/LikeList"


const App = () =>{
    return(
        <div>
            <BrowserRouter>
            <Nav/>
            <Routes>
                <Route element={<Home/>} path="/home"/>
                <Route element={<LikeList/>} path="/likeList"/>
            </Routes>
            </BrowserRouter>
        </div>
    )
}
export default App