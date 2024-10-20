import { useEffect, useState } from "react";
import { BiShoppingBag } from "react-icons/bi";
import './Card.css'

function Card () {
    const [cardOpen, setCardOpen] = useState (false)

    
    return (
        <>
            <div className="card" onClick={() => setCardOpen(!cardOpen)}>
                <BiShoppingBag size={25} />
                <span className="flexCenter">2</span>
            </div>
            <div className={cardOpen ? "overlay" : "nonoverlay"}></div>
        </>
    )
}

export default Card;