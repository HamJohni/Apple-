import React from 'react';
import axios from "axios";

const Products = ({item,axiosGet,id,editBasket}) => {

    const del = () => {
            axios.delete(`http://localhost:8080/products/${id}`)
                .then(() => {
                    axiosGet()
                })
                .catch((err) => console.log(err.message))
    }
    return (
        <div className="check__card">
            <img className="check__card-img" src={item.image} alt=""/>
            <h3 className="check__card-title">{item.title}</h3>
            <p className="check__card-price">{item.price> 0? `$${item.price}.00`: 'Free'}</p>
            <div className="check__card-boxBtn">
                <button onClick={() => editBasket(item)}
                 style={{background:item.price > 0? '#1890FF' : 'orange' }}
                        className="check__card-btn" type="button">
                    {item.price> 0? 'Buy' : 'Apply'}
                </button>

                <button className="check__card-delete" onClick={del}>
                    Delete
                </button>
            </div>

        </div>
    );
};

export default Products;