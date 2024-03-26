import React from 'react';
import { useState } from "react";
import Axios from "axios";

function ReadProduct() {

    const [productosList,setProductos] = useState([]);

    const getProductos = ()=>{
        Axios.get("http://localhost:3001/bikes").then((response)=>{
          setProductos(response.data);
        });
    }

    return (
        <div className="container">

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Marca</th>
                        <th scope="col">Origen</th>
                        <th scope="col">Categoria</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        productosList.map((val, key) => {
                            return <tr key={val.product_id}>
                                <th>{val.product_id}</th>
                                <td>{val.product_name}</td>
                                <td>{val.model_year}</td>
                                <td>{val.list_price}</td>
                                <td>{val.brand_name}</td>
                                <td>{val.brand_home_country}</td>
                                <td>{val.category_name}</td>
                            </tr>

                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
  
export default ReadProduct;
/**
 * <div className="btn-group" role="group" aria-label="Basic example">
                      <button type="button"
                      onClick={()=>{
                        editarEmpleado(val);
                      }}
                      className="btn btn-info">Editar</button>
                      <button type="button" onClick={()=>{
                        deleteEmple(val);
                      }} className="btn btn-danger">Eliminar</button>
                    </div>
 */