import { Suspense, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Sidebar from "../../../components/Sidebar/Sidebar";
import TopBar from "../../../components/TopBar/TopBar";
import { FaEdit } from "react-icons/fa";
import { MdDelete, MdPreview } from "react-icons/md";
import FormExam from "../../../components/FormExam/FormExam";

export default function Exam(){
    const [show, setShow] = useState(false)
    const [btn, setBtn] = useState(false)
    const onMenu = () =>{
        show? setShow(false) : setShow(true)
    }
    const onButton = () =>{
        btn? setBtn(false) : setBtn(true)
    }
    return (
        <Suspense fallback={<Loading />}>
            <section className="bg-[#222831] w-full md:h-screen flex relative">
                <Sidebar hidden={show}/>
                <div className="md:basis-4/5 basis-full">
                    <TopBar button={onMenu} />
                    <div className="grid grid-cols-2">
                        <div>
                            <div className="flex">
                                <button className={`text-[#EEEEEE] hover:underline ${!btn? "font-bold" : "font-light"} px-4 my-4 text-2xl`} onClick={onButton}>Add Exam</button>
                                <button className={`text-[#EEEEEE] hover:underline ${!btn? "font-light" : "font-bold"} px-4 my-4 text-2xl`} onClick={onButton}>Update Exam</button>
                            </div>
                            <div className="bg-[#393E46] m-4 p-8 rounded-xl">
                                {
                                    !btn? <FormExam name="Add Exam" /> : <FormExam name="Update Exam" />
                                }
                            </div>
                        </div>
                        <div>
                            <h1 className="text-[#EEEEEE] font-bold px-4 my-4 text-2xl">List of Exams Fields</h1>
                            <div className="bg-[#393E46] m-4 p-4 rounded-xl">
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <td className="md:text-base text-xs text-[#00ADB5] font-bold">No</td>
                                            <td className="md:text-base text-xs text-[#00ADB5] font-bold">Name</td>
                                            <td className="md:text-base text-xs text-[#00ADB5] font-bold">Description</td>
                                            <td className="md:text-base text-xs text-[#00ADB5] font-bold">Status</td>
                                            <td className="md:text-base text-xs text-[#00ADB5] font-bold">Action</td>
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
                    </div>
                </div>
            </section>
        </Suspense>
    )
}