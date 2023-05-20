import Login from './pages/Login';
import {Routes, Route} from "react-router-dom";
import Layout from "./pages/Layout";
import Register from "./pages/Register";
import LinkPage from "./pages/LinkPage";
import Unauthorized from "./pages/Unauthorized";
import HomePage from "./pages/HomePage";
import EditorPage from "./pages/EditorPage";
import AdminPage from "./pages/AdminPage";
import Lounge from "./pages/Lounge";
import Missing from "./pages/Missing";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./components/PersistLogin";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route path={"login"} element={<Login/>}/>
                <Route path={"register"} element={<Register/>}/>
                <Route path={"linkPage"} element={<LinkPage/>}/>
                <Route path={"unauthorized"} element={<Unauthorized/>}/>
                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={["Admin", "User", "Editor"]}/>}>
                        <Route path={"/"} element={<HomePage/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["Editor"]}/>}>
                        <Route path={"editorPage"} element={<EditorPage/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["Admin"]}/>}>
                        <Route path={"adminPage"} element={<AdminPage/>}/>
                    </Route>
                    <Route element={<RequireAuth allowedRoles={["Admin", "Editor"]}/>}>
                        <Route path={"lounge"} element={<Lounge/>}/>
                    </Route>
                </Route>
                <Route path={"*"} element={<Missing/>}/>
            </Route>
        </Routes>
    );
}

export default App;