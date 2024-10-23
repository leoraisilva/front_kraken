import './category.css'
import React, { Component, useState } from "react";
import { Carpenter, Cleaning, Food, HomeAppliance } from "../../assets/Data"

function Category() {
    const [data, setData] = useState (Carpenter)
    return (
        <>
            <div className="categoria" >
                <div className="home-appliance" >
                    <div className="text-categoria">
                        <h3>Eletrodomestico</h3>
                        <p>Iluystp sdnbcadf asdfbs, wnqdbj sklrnaofae</p>
                        <div className="btn" onClick={() => setData(HomeAppliance)} >View</div>
                    </div>
                </div>
                <div className="food">
                    <div className="text-categoria">
                        <h3>Alimentos</h3>
                        <p>Iluystp sdnbcadf asdfbs, wnqdbj sklrnaofae</p>
                        <div className="btn" onClick={() => setData(Food)}>View</div>
                    </div>
                </div>      
                <div className="carpenter">
                    <div className="text-categoria">
                        <h3>Serviços</h3>
                        <p>Iluystp sdnbcadf asdfbs, wnqdbj sklrnaofae</p>
                        <div className="btn" onClick={() => setData(Carpenter)}>View</div>
                    </div>
                </div>
                <div className="cleaning">
                    <div className="text-categoria">
                        <h3>Limpeza</h3>
                        <p>Iluystp sdnbcadf asdfbs, wnqdbj sklrnaofae</p>
                        <div className="btn" onClick={() => setData(Cleaning)}>View</div>
                    </div>
                </div>
            </div>
            <section className="slick">
                <div className="container-slick">
                    {data.map((item) =>(
                        <div className="boxs-slick" key={item.id}>
                            <div className="box boxItem">
                                <img src={item.image} />
                                <p>{item.title}</p>
                            </div>
                        </div>    
                        )
                    )}
                </div>
            </section>
        </>
    )
}

export default Category;