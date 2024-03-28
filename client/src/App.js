import './App.css';
import { useState, createContext } from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProduct from './CreateProduct.js';
import Swal from 'sweetalert2'

// Crear un contexto
export const ProductContext = createContext();

function App() {

  const [product_name, setProdName] = useState('');
  const [product_id, setProdId] = useState(0);
  const [brand_id, setBrandId] = useState(0);
  const [category_id, setCatId] = useState(0);
  const [model_year, setModYear] = useState('');
  const [list_price, setPrice] = useState('');

  const [productosList, setProductos] = useState([]);
  const [categoriasList, setCategorias] = useState([]);
  const [marcasList, setMarcas] = useState([]);

  const [editar, setEditar] = useState(false);

  const getProductos = () => {
    Axios.get("http://localhost:3001/bikes").then((response) => {
      setProductos(response.data);
    });
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

   // Función para editar un producto
   const editarProducto = (val) => {
    setEditar(true);
    setProdName(val.product_name);
    setProdId(val.product_id);
    setBrandId(val.brand_id);
    setCatId(val.category_id);
    setModYear(val.model_year);
    setPrice(val.list_price);
  }

  const deleteProducto = (val) => {

    Swal.fire({
      title: "Estas seguro?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.product_id}`).then(() => {
          getProductos();
          Swal.fire({
            title: 'Producto eliminado',
            text: 'El producto: ' + val.product_name + ' ha sido eliminado exitosamente.',
            icon: 'success',
            timer: 5000
          });
        }).catch(function (error) {
          Swal.fire({
            title: 'Eliminación fallida',
            text: 'No se pudo eliminar el producto ' + val.product_name + '. Intente de nuevo.',
            icon: 'error',
            footer: JSON.parse(JSON.stringify(error)).message,
            timer: 5000
            })
        });
      }
    });
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

 // Pasar los estados y la función de limpiar campos al proveedor de contexto
  const contextValue = {
    product_name, setProdName,
    product_id,
    brand_id, setBrandId,
    category_id, setCatId,
    model_year, setModYear,
    list_price, setPrice,
    categoriasList,  marcasList,
    limpiarCampos, getProductos,
    getMarcas, getCategorias, 
    editar, setEditar
  };

  return (
    <div className="App">
      {/* Div principal de la aplicación*/}
      <div className="App-products">

        {/* Barra de navegación */}
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <img src="/bici.jpg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />BikeStore
            </a>
          </div>
        </nav>

        {/* Proveedor de contexto */}
        <ProductContext.Provider value={contextValue}>
          {/* Div para el componente CreateProduct */}
          <div className='Product-post'>
            {/* Componente CreateProduct tendrá acceso al contexto */}
            <CreateProduct />
          </div>
        </ProductContext.Provider>

        {/* Div para el obtener la información de los productos (bicicletas) registrados */}
        <div className='Product-read'>
          <div className="container">

            <h1>Lista de bicicletas</h1>

            {/* Botón para listar las bicicletas */}
            <button type="button"
              onClick={() => {
                getProductos();
              }} className="btn btn-primary m-2">
              Consultar
            </button>

            {/* Tabla para mostrar la información de las bicicletas */}
            <table className="table table-striped">

              {/* Encabezado de la tabla */}
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Modelo</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Marca</th>
                  <th scope="col">Origen</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>

              {/* Cuerpo de la tabla */}
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
                      <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button"
                            onClick={() => {
                              editarProducto(val);
                            }}
                            className="btn btn-info">Editar</button>
                          <button type="button"
                            onClick={() => {
                              deleteProducto(val);
                            }}
                            className="btn btn-danger">Eliminar</button>
                        </div>
                      </td>
                    </tr>

                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;


