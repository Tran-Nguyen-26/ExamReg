import { useState } from "react"
import Header from "../../../components/admin/header/Header"
import Sidebar from "../../../components/admin/sidebar/Sidebar"
import './Style-CourseManagement.css'

const CourseManagement = () => {
    return (
        <div className="page">
            <Header/>
            <div className="main">
                <Sidebar/>
            </div>
        </div>
    )
}
export default CourseManagement;

