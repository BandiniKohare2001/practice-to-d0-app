import React from "react";
import "./Card.css";

export default function Card({ id , title , description, priority, taskaRemoveFromList, editTask }){
    return(
        <div className="card">
            <h1>{title}</h1>
            <p>{description}</p>
            <span className="priority">{priority}</span>
            <div className="activities">
                <span className="delete" onClick={()=>{
                    taskaRemoveFromList(id);
                }}>
                    ❌
                </span>
                <span className="delete" onClick={(id)=>{
                    editTask(id);
                }}>
                    ✏️
                </span>
            </div>
        </div>
    )
}




