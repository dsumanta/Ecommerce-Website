import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import ForgotPassword from '../Pages/ForgotPassword'
import SignIn from '../Pages/SignUp'
import AdminPanel from '../Pages/AdminPanel'

const routes = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'login',
                element:<Login/>
            },
            {
                path:'forgot-password',
                element:<ForgotPassword/>
            },
            {
                path:'sign-up',
                element:<SignIn/>
            },
            {
                path:'admin-pannel',
                element:<AdminPanel/>
            }
        ]
    },
    

])

export default routes