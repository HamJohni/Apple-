import React, {useEffect, useState} from 'react';
import axios from "axios";
import {AiOutlineClose} from 'react-icons/ai'



const Basket = ({basketTrue,setBasketTrue,editBasket}) => {

    const [basketItem,setBasketItem] = useState([])

    const [deleteItem,setDeleteItem] = useState({})

    const deleteBasket = (item) => {
        axios.patch(`http://localhost:8080/products/${item.id}`,{count: 0,basket:false})
            .then(({data}) => {
                setDeleteItem(data)
            })
            .catch((err) => console.log(err.message))
    }

    let total = 0

    let percent = 0

    useEffect(() => {
        axios('http://localhost:8080/products?basket=true')
            .then(({data}) => setBasketItem(data))
            .catch((err) => console.log(err.message))
    },[editBasket,deleteItem])



    basketItem.map((item) => {
        total += item.price * item.count
        percent = ((total * 5) / 100) + total
    })

    return (
        <div className={basketTrue?"overlayBasket active": "overlayBasket"} onClick={() => setBasketTrue(false)}>
                <div className="basket" onClick={(e) => e.stopPropagation()}>
                        <h1 className="basket__title">
                            Basket of items
                        </h1>
                    <div className="basket__field">

                        <p className="basket__field-name">
                            Your items:
                        </p>
                    </div>

                    <div className="basket__items">
                        {
                              basketItem.map(item => (
                                <div key={item.id} className="basket__item">
                                    <span onClick={() => deleteBasket(item)} className="basket__item-delete"><AiOutlineClose size={20}/></span>
                                    <div className="basket__item-box">
                                      <img className="basket__item-box-img" src={item.image} alt={item.title}/>
                                    </div>
                                    <h2 className="basket__item-title">{item.title}</h2>
                                    <p className="basket__item-price">${item.price}</p>

                                </div>
                            ))
                        }

                    </div>

                            <div className="basket__prices">

                                <div className="basket__price">
                                    <p className="basket__price-text">
                                        Total:
                                    </p>
                                    <p className="basket__price-num">
                                        $ {total}.00
                                    </p>
                                </div>

                                <div className="basket__price">
                                    <p className="basket__price-text">
                                        TAX 5%:
                                    </p>
                                    <p className="basket__price-num">
                                       $ {percent}
                                    </p>
                                </div>

                            </div>

                    <button className="basket__btn">
                        Checkout
                    </button>
            </div>
        </div>
    );
};

export default Basket;