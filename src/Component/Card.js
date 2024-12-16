import React from "react";
import './Card.css';
import { Link } from 'react-router-dom';


function Card(props) {
    return (

        <div className="w-[200px] bg-white shadow-2xl shadow-black rounded-md border border-gray-200  card text-gray-800 hover:text-white">
        <div className="flex px-2">
          {/* Logo Section (1/3) */}
          <div className="lg:w-2/5 w-1/3 flex items-center justify-center py-2 px-1 ">
            <img
              src={props.val.image}
              alt="Logo"
              className=" pt-4 imgc mb-6"
            />
          </div>
          {/* Title and Tagline Section (2/3) */}
          <div className="w-2/3 py-3 pl-2 text-left justify-center my-auto  border-blue-800">
            <h3 className="titlec font-semibold ">{props.val.title}</h3>
            <p className="text-base tagc  mt-1 ">{props.val.tagline}</p>
          </div>
        </div>
        {/* Footer Section */}
        <div className="h-18 pb-2 absolute w-full bottom-0 fcolor ">
          <p className="text-[14px] text-center text-white footerc ">Last Update Date: 07/12/2024</p>
        </div>
        <Link to={`../${props.val.route}`} class="stretched-link"></Link>
      </div>


        // <div className="card">
        //     <img src={props.val.image} alt="Frame 24 (2)" name="OneViewExecutive.png" class="card-img" />
        //     <div class="card-body">
        //         <h5 class="card-title">{props.val.title}</h5>
        //         <p class="card-text text-gray-500">{props.val.tagline}</p>
        //         <Link to={`../${props.val.route}`} class="stretched-link"></Link>
        //     </div>
        // </div>


    );
}

export default Card;