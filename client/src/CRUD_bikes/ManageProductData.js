import React from 'react';
import { useContext, useEffect } from "react";
import Axios from "axios";
import { ProductContext } from './CRUD'; // Importar el contexto desde el archivo CRUD.js
import Swal from 'sweetalert2'


function ManageProductData() {

  // Utilizar useContext para acceder al contexto
  const {
    product_name, setProdName,
    product_id, setProdId,
    brand_id, setBrandId,
    category_id, setCatId,
    model_year, setModYear,
    list_price, setPrice,
    setCategorias, setMarcas,
    categoriasList,  marcasList,
    getProductos, editar, setEditar
  } = useContext(ProductContext);


  useEffect(() => {
    getCategorias(); // Llama a getCategorias al montar el componente
    getMarcas(); // Llama a getMarcas al montar el componente
  }, []); // El segundo argumento [] asegura que este efecto solo se ejecute una vez al montar el componente

  const verificarCamposCorrectos = () => {
    if (product_name === "" || !category_id || !brand_id || model_year === "" || list_price === "") {
      Swal.fire({
        title: 'Campos vacíos',
        text: 'Por favor, llene todos los campos.',
        icon: 'warning',
        timer: 5000
      });
      return false;
    }
    if(model_year<1900 || model_year>2024){
      Swal.fire({
        title: 'Valor no válido',
        text: 'Año de modelo inválido. Ingrese uno válido.',
        icon: 'warning',
        timer: 5000
      });
      return false;
    }
    if(list_price<0){
      Swal.fire({
        title: 'Valor no válido',
        text: 'Precio inválido. No puede ser menor a 0.',
        icon: 'warning',
        timer: 5000
      });
      return false;
    }
    return true;
  }

  const limpiarCampos = () => {
    setProdName("");
    setProdId("");
    setBrandId("");
    setCatId("");
    setModYear("");
    setPrice("");
    setEditar(false);
  }

  const getCategorias = () => {
    Axios.get("http://localhost:3001/bikes/categories").then((response) => {
      setCategorias(response.data);
    });
  }

  const getMarcas = () => {
    Axios.get("http://localhost:3001/bikes/brands").then((response) => {
      setMarcas(response.data);
    });
  }

  const addProduct = () => {

    if (verificarCamposCorrectos() === false) {
      return;
    }

    Axios.post("http://localhost:3001/create", {
      product_name: product_name,
      product_id: product_id,
      brand_id: brand_id,
      category_id: category_id,
      model_year: model_year,
      list_price: list_price
    }).then(() => {
      getProductos();
      limpiarCampos();
      Swal.fire({
        title: 'Registro exitoso',
        text: 'La bicicleta ' + product_name + ' se añadió correctamente.',
        icon: 'success',
        timer: 5000
      });
    }).catch(function (error) {
      Swal.fire({
        title: 'Registro fallido',
        text: 'Sucedió un error al añadir la bicicleta ' + product_name + '. Por favor, intente de nuevo.',
        icon: 'error',
        footer: JSON.parse(JSON.stringify(error)).message,
        timer: 5000
      });
    });
  }
  
  const updateProduct = () => {
    if (verificarCamposCorrectos() === false) {
      return;
    }

    Axios.put("http://localhost:3001/update", {
      product_name: product_name,
      product_id: product_id,
      brand_id: brand_id,
      category_id: category_id,
      model_year: model_year,
      list_price: list_price
    }).then(() => {
      getProductos();
      limpiarCampos();
      Swal.fire({
        title: 'Producto actualizado',
        text: 'El producto: ' + product_name + ' ha sido actualizado exitosamente.',
        icon: 'success',
        timer: 5000
      });
    }).catch(function (error) {
      Swal.fire({
        title: 'Actualización fallida',
        text: 'No se pudo actualizar el producto ' + product_name + '. Intente de nuevo.',
        icon: 'error',
        footer: JSON.parse(JSON.stringify(error)).message,
        timer: 5000
        })
    });
  }

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE BICICLETAS
        </div>
        <div className="card-body">
          {/* Título y descripción del formulario */}
          {
          editar ? 
          <div>
            <h5 className="card-title">Editar bicicleta</h5> 
            <p className="card-text">Ingrese los datos de la bicicleta a editar.</p>
          </div>
          :
          <div>
          <h5 className="card-title">Añadir bicicleta</h5>
          <p className="card-text">Ingrese los datos de la bicicleta a añadir.</p>
          </div>
          }

          {/* Input de lectura del nombre de la bicicleta */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Nombre:</span>
            <input type="text"
              onChange={(event) => {
                setProdName(event.target.value);
              }}
              className="form-control" value={product_name} placeholder="Ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          {/* Select de categorías */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Categoría:</span>
            <select className="form-select" value={category_id} onChange={(event) => setCatId(event.target.value)}>
              <option value="">Selecciona una categoría</option>
              {categoriasList.map((categoria) => (
                <option key={categoria.category_id} value={categoria.category_id}>{categoria.category_name}</option>
              ))}
            </select>
          </div>

          {/* Select de marcas */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Marca:</span>
            <select className="form-select" value={brand_id} onChange={(event) => setBrandId(event.target.value)}>
              <option value="">Selecciona una marca</option>
              {marcasList.map((marca) => (
                <option key={marca.brand_id} value={marca.brand_id}>{marca.brand_name}</option>
              ))}
            </select>
          </div>

          {/* Input de lectura del año de modelo */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Año de modelo:</span>
            <input type="number" value={model_year}
              onChange={(event) => {
                setModYear(event.target.value);
              }}
              className="form-control" placeholder="Ingrese el año del modelo" aria-label="Username" aria-describedby="basic-addon1" />
          </div>

          {/* Input de lectura del precio de lista */}
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">Precio:</span>
            <input type="number" value={list_price}
              onChange={(event) => {
                setPrice(event.target.value);
              }}
              className="form-control" placeholder="Ingrese el precio de lista" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>

        {/* Botón de registrar */}
        <div className="card-footer text-muted">
          {
            editar ? 
            <div>
            <button className='btn btn-warning m-2' onClick={updateProduct}>Actualizar</button> 
            <button className='btn btn-info m-2' onClick={limpiarCampos}>Cancelar</button>  
            </div>
            :<button className='btn btn-success' onClick={addProduct}>Registrar</button>
          }
        </div>
      </div>
    </div>
  );
}

export default ManageProductData;
