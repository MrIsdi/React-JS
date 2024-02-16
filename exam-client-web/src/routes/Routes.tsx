import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard";
import Exam from "../pages/Admin/Exam/Exam";

const Routes = createBrowserRouter([
    {
        path    : "/",
        element : <Login />
    },
    {
        path    : "/register",
        element : <Register />
    },
    {
        path    : "/admin",
        element : <AdminDashboard />
    },
    {
        path    : "/admin/add-exam",
        element : <Exam />
    },
    {
        path    : "/:nameUser",
        element : <p>Halaman user</p>
    }
])

export default Routes