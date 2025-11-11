import { useState } from "react";
import Header from "../../../components/admin/header/Header";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import './Style-Report.css'

const Report = () => {
    return (
        <div className="page">
            <Header/>
            <div className="main">
                <Sidebar/>
                <div className="content">
                    {/* Report content will be added here */}
                </div>
            </div>
        </div>
    )
}
export default Report;
