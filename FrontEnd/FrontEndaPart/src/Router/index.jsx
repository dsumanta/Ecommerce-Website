import {createBrowserRouter} from 'react-router-dom'
import App from '../App'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import ForgotPassword from '../Pages/ForgotPassword'
import SignIn from '../Pages/SignUp'
import AdminPanel from '../Pages/AdminPanel'
import Alluser from '../Pages/AllUser'
import AllProducts from '../Pages/AllProducts'
import CatagoryProduct from '../Pages/CatagoryProduct'
import ProductDetails from '../Pages/ProductDetails'

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
                path:'catagory-product/:catagoryName',
                element:<CatagoryProduct/>
            },
            {
               path:'product/:id',
               element:<ProductDetails/>
            },
            {
                path:'admin-pannel',
                element:<AdminPanel/>,
                children:[
                    {
                        path:'all-users',
                        element:<Alluser/>
                    },
                    {
                        path:'all-product',
                        element:<AllProducts/>
                    }
                ]
            }
        ]
    },
    

])

export default routes