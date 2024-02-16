import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import Sidebar from "../../../components/Sidebar/Sidebar";
import MenuTable from "../../../components/MenuTable/MenuTable";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdPreview } from "react-icons/md";
import { Suspense, useEffect, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import TopBar from "../../../components/TopBar/TopBar";
import useLogin from "../../../store/user/useLogin";
import useAdmin from "../../../store/exam/useAdmin";
import { useNavigate } from "react-router-dom";

interface user{
    name: string,
    email: string
}

export default function AdminDashboard(){
    const [show, setShow] = useState(false)
    const [user, setUser] = useState([])
    const { token } = useLogin()
    const { getUser } = useAdmin()
    const navigate = useNavigate()
    const onMenu = () =>{
        show? setShow(false) : setShow(true)
    }
    const GetUser = async () => {
        try {
            if(!token){
                navigate("/")
            }
            const user = await getUser(token)
            setUser(user)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        GetUser()
    }, [])
    return(
        <>
            <Suspense fallback={<Loading />}>
                <section className="bg-[#222831] w-full md:h-screen flex relative">
                    <Sidebar hidden={show} />
                    <div className="md:basis-4/5 basis-full">
                        <TopBar button={onMenu} />
                        <h1 className="text-[#EEEEEE] font-bold px-4 my-4 text-2xl">Dashboard</h1>
                        <MenuTable />
                        <main className="grid md:grid-cols-2 grid-cols-1 gap-4 px-4">
                            <div>
                                <p className="text-[#EEEEEE] text-2xl mb-3 font-bold">List of exam participants</p>
                                <div className="bg-[#393E46] p-4 rounded-xl">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <td className="md:text-base text-xs text-[#00ADB5] font-bold">No</td>
                                                <td className="md:text-base text-xs text-[#00ADB5] font-bold">Nama</td>
                                                <td className="md:text-base text-xs text-[#00ADB5] font-bold">Email</td>
                                                <td className="md:text-base text-xs text-[#00ADB5] font-bold">Aksi</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {   
                                                user?.length == 0? 
                                                <tr>
                                                    <td colSpan={4} className="text-center text-[#EEEEEE]">No data available</td>
                                                </tr> :
                                                user?.map((a: user,i)=>(
                                                    <tr key={i}>
                                                        <td className="md:text-base text-xs text-[#EEEEEE]">{i+1}</td>
                                                        <td className="md:text-base text-xs text-[#EEEEEE]">{a?.name}</td>
                                                        <td className="md:text-base text-xs text-[#EEEEEE]">{a?.email}</td>
                                                        <td className="md:text-xl text-xs text-[#EEEEEE] flex gap-2">
                                                            <button><FaEdit /></button>
                                                            <button><MdPreview /></button>
                                                            <button><MdDelete /></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="md:mb-0 mb-8">
                                <p className="text-[#EEEEEE] text-2xl mb-3 font-bold">List of exam fields</p>
                                <div className="bg-[#393E46] p-4 rounded-xl">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <td className="md:text-base text-xs text-[#00ADB5] font-bold">No</td>
                                                <td className="md:text-base text-xs text-[#00ADB5] font-bold">Name</td>
                                                <td className="md:text-base text-xs text-[#00ADB5] font-bold">Description</td>
                                                <td className="md:text-base text-xs text-[#00ADB5] font-bold">Status</td>
                                                <td className="md:text-base text-xs text-[#00ADB5] font-bold">Aksi</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                [1,2,3,4,5].map((a,i)=>(
                                                    <tr key={a}>
                                                        <td className="md:text-base text-xs text-[#EEEEEE]">{i}</td>
                                                        <td className="md:text-base text-xs text-[#EEEEEE]">Physics</td>
                                                        <td className="md:text-base text-xs text-[#EEEEEE]">Classic mechanics</td>
                                                        <td className="md:text-base text-xs text-[#EEEEEE]">Active</td>
                                                        <td className="md:text-xl text-xs text-[#EEEEEE] flex gap-2">
                                                            <button><FaEdit /></button>
                                                            <button><MdPreview /></button>
                                                            <button><MdDelete /></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </main>
                    </div>
                </section>
            </Suspense>
            <ToastContainer />
        </>
    )
}