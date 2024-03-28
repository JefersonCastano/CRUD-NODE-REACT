import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, createContext } from "react";
import Axios from "axios";
import ManageProductData from './ManageProductData.js';
import ProductList from './ProductList.js';
import Swal from 'sweetalert2'

// Crear un contexto
export const ProductContext = createContext();

function CRUD() {

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
    }).catch(function (error) {
      Swal.fire({
        title: 'Consulta fallida',
        text: 'No se pudo realizar la consulta. Intente de nuevo.',
        icon: 'error',
        footer: JSON.parse(JSON.stringify(error)).message,
        timer: 5000
      })
    });
  }

  // Pasar los estados y la función de limpiar campos al proveedor de contexto
  const contextValue = {
    product_name, setProdName,
    product_id, setProdId,
    brand_id, setBrandId,
    category_id, setCatId,
    model_year, setModYear,
    list_price, setPrice,
    setCategorias, setMarcas,
    categoriasList, marcasList,
    getProductos, productosList,
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
            {/* Componente ManageProductData tendrá acceso al contexto */}
            <ManageProductData />

            {/* Componente ProductList para obtener la información de los productos (bicicletas) registrados */}
            <ProductList />
          </div>
        </ProductContext.Provider>
      </div>
    </div>
  );
}

export default CRUD;


