import { BiHappyAlt } from "react-icons/bi"; 
import { MdCardMembership } from "react-icons/md"; 
import { FaHospitalSymbol } from "react-icons/fa"; 
import { FaUserNurse } from "react-icons/fa"; 
import React from 'react'
import './Banner.css'

export default function Banner() {
  return (
    <div class="statsss-banner">
        <div class="stat">
            <FaUserNurse/>
            <h1>39</h1>
            <p>Best Nurse</p>
        </div>
        <div class="stat">
            <BiHappyAlt />
            <h1>129k</h1>
            <p>Happy Senior</p>
        </div>
        <div class="stat">
           <FaHospitalSymbol /> 
            <h1>29</h1>
            <p>Expert Doctor</p>
        </div>
        <div class="stat">
       <MdCardMembership />
            <h1>289k</h1>
            <p>Seniors Club Members</p>
        </div>
    </div>
  )
}
