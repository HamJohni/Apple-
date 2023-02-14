import React from 'react';
import axios from "axios";

const Project = ({openOne,setOpenOne,axiosGet,products}) => {


    const submitForm = (e) => {
        setOpenOne(false)
        e.preventDefault()
        axios.post('http://localhost:8080/products',{
            id: products.length+1,
            image: e.target[0].value,
            title: e.target[1].value,
            price: e.target[2].value,
            categories: e.target[3].value,
            count: 1,
            basket:false
        }).then(() => {
            axiosGet()
            const nulls = () => {
                e.target[0].value = ''
                e.target[1].value = ''
                e.target[2].value = ''
                e.target[3].value = ''
            }
            nulls()
        })
    }

    return (
        <div>
            <div className={openOne? "overlayProject active": "overlayProject"} onClick={() => setOpenOne(false)}>
                <div className={openOne? "project active": "project"} onClick={e => e.stopPropagation()}>

                    <h1 className="project__title">
                        Which product will you add?
                    </h1>

                    <form className="project__form" onSubmit={(e) => submitForm(e) }>

                        <label className="project__label"   >
                            <span className="project__label-span">
                                Products image
                            </span>
                            <input className="project__label-input" type="url" placeholder="img"/>
                        </label>

                        <label className="project__label">
                            <span className="project__label-span">
                                Which products?
                            </span>
                            <input className="project__label-input" type="text" placeholder="Products name..." minLength="3"/>
                        </label>

                        <label className="project__label">
                            <span className="project__label-span">
                                Products price
                            </span>
                            <input className="project__label-input" type="number" placeholder="How much?"/>
                        </label>

                        <select className="check__categories">
                            <option className="check__option" value=''>Categories</option>
                            <option className="check__option" value="headphones">Headphones</option>
                            <option className="check__option" value="phone">Phone</option>
                            <option className="check__option" value="gadget">Gadgets</option>
                            <option className="check__option" value="ipad">Ipad</option>
                            <option className="check__option" value="mac">Mac</option>
                            <option className="check__option" value="accessory">Accessory</option>
                        </select>

                        <button className="check__card-btn check__btn-margin" type="submit">
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Project;