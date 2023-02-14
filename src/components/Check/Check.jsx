import React, {useEffect, useState} from 'react';
import Products from "./Products/Products";
import Project from "./Project/Project";
import axios from "axios";
import {RiShoppingBasketFill} from "react-icons/ri";
import Basket from "../Header/Basket/Basket";

const Check = () => {
    const [count,setCount] = useState(1)
    const [search, setSearch] = useState('')
    const [openOne,setOpenOne] = useState(false)
    const [products,setProduct] = useState([])
    const [options,setOptions] = useState('')
    const [basketTrue,setBasketTrue] = useState(false)
    const [countBasket,setCountBasket] = useState(0)

    const axiosGet = () => {
        axios(`http://localhost:8080/products`)
            .then(({data}) => (setProduct(data)))
            .catch((err) => console.log(err.message))
    }

        useEffect(() => {
            axiosGet()
        },[])

    const filterSearch = products.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))

        useEffect(() => {
            axios(`http://localhost:8080/products?${options? 'categories='+options: ''}`)
                .then(({data}) => setProduct(data))
        },[options])


    const editBasket = (item) => {

            axios.patch(`http://localhost:8080/products/${item.id}`,{count: countBasket ,basket:true})
                .then(({data}) => {
                    setCountBasket(data.count +1)
                    setCountBasket(1)
                })
                .catch((err) => console.log(err.message))
    }

    const [basketLength,setBasketLength] = useState(0)

    axios('http://localhost:8080/products?basket=true')
        .then(({data}) =>setBasketLength(data.length) )
        .catch((err) => console.log(err.message))

    return (
        <section className="check">
            <p className="App__box-basket" onClick={() => setBasketTrue(true)}>
                <RiShoppingBasketFill className="App__basket"/>
                <p className="App__count">{basketLength}</p>
            </p>
            <div className="container">
                <div className="check__content">
                    <div className="check__top">
                        <h2 className="check__title">Check also</h2>

                        <input value={search} placeholder="Search..." className="check__search" type="search" onChange={(e) => setSearch(e.target.value)}/>

                        <button className="check__card-btn" onClick={() => setOpenOne(true)}>
                            Add
                        </button>

                        <select onChange={(e) => setOptions(e.target.value)} className="check__categories">
                            <option className="check__option" value=''>Categories</option>
                            <option className="check__option" value="headphones">Headphones</option>
                            <option className="check__option" value="phone">Phone</option>
                            <option className="check__option" value="gadget">Gadgets</option>
                            <option className="check__option" value="ipad">Ipad</option>
                            <option className="check__option" value="mac">Mac</option>
                            <option className="check__option" value="accessory">Accessory</option>
                        </select>

                        <a className="check__link" onClick={() => setCount(products.length)}>See all
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2_113)">
                                        <path d="M15.7741 12.5941L10.6143 17.7537C10.2861 18.0821 9.75389 18.0821 9.42582 17.7537C9.09773 17.4256 9.09773 16.8935 9.42582 16.5654L13.9915 11.9999L9.42595 7.43457C9.09786 7.10635 9.09786 6.57426 9.42595 6.24617C9.75405 5.91794 10.2862 5.91794 10.6144 6.24617L15.7742 11.4059C15.9383 11.57 16.0202 11.7849 16.0202 11.9999C16.0202 12.215 15.9381 12.43 15.7741 12.5941Z" fill="#1890FF"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2_113">
                                            <rect width="12" height="12" fill="white" transform="translate(6.59998 6)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                        </a>
                    </div>

                    <div className="check__row">
                        {
                            filterSearch.reverse().filter((item,idx) => idx < 4 * count).map(item => (
                                <Products editBasket={editBasket} id={item.id}  key={item.id} axiosGet={axiosGet} item={item}/>
                            ))
                        }
                    </div>
                    {
                        count * 4 >= products.length?
                            <a  className="check__link-more" onClick={() => setCount(1)}>
                                Hide
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_2_113)">
                                    <path d="M15.7741 12.5941L10.6143 17.7537C10.2861 18.0821 9.75389 18.0821 9.42582 17.7537C9.09773 17.4256 9.09773 16.8935 9.42582 16.5654L13.9915 11.9999L9.42595 7.43457C9.09786 7.10635 9.09786 6.57426 9.42595 6.24617C9.75405 5.91794 10.2862 5.91794 10.6144 6.24617L15.7742 11.4059C15.9383 11.57 16.0202 11.7849 16.0202 11.9999C16.0202 12.215 15.9381 12.43 15.7741 12.5941Z" fill="#1890FF"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_113">
                                        <rect width="12" height="12" fill="white" transform="translate(6.59998 6)"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            </a>
                            :
                            <a style={{display: count *4 >= filterSearch.length? "none": "flex"}} className="check__link-more" onClick={() => {
                                setCount((prev) => prev + 1)
                            }}>
                                See more
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_2_113)">
                                        <path d="M15.7741 12.5941L10.6143 17.7537C10.2861 18.0821 9.75389 18.0821 9.42582 17.7537C9.09773 17.4256 9.09773 16.8935 9.42582 16.5654L13.9915 11.9999L9.42595 7.43457C9.09786 7.10635 9.09786 6.57426 9.42595 6.24617C9.75405 5.91794 10.2862 5.91794 10.6144 6.24617L15.7742 11.4059C15.9383 11.57 16.0202 11.7849 16.0202 11.9999C16.0202 12.215 15.9381 12.43 15.7741 12.5941Z" fill="#1890FF"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2_113">
                                            <rect width="12" height="12" fill="white" transform="translate(6.59998 6)"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </a>
                    }
                    <span className="check__link-length">
                       shown {count * 4 >= filterSearch.length? filterSearch.length : count *4} of {filterSearch.length}
                    </span>

                </div>
            </div>
            <Project  products={products} axiosGet={axiosGet} openOne={openOne} setOpenOne={setOpenOne}/>
            <Basket countBasket={countBasket} setCountBasket={setCountBasket} editBasket={editBasket} basketTrue={basketTrue} setBasketTrue={setBasketTrue}/>
        </section>
    );
};

export default Check;