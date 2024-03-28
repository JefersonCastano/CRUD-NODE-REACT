import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from "react";
import Axios from "axios";
import { ProductContext } from './CRUD'; // Importar el contexto desde el archivo CRUD.js
import Swal from 'sweetalert2'

function ProductList() {

    // Utilizar useContext para acceder al contexto
    const {
        setProdName, setProdId,
        setBrandId, setCatId,
        setModYear, setPrice,
        getProductos, productosList,
        setEditar
    } = useContext(ProductContext);

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

    return (
        <div className="App">
            {/* Div principal de la aplicación*/}
            <div className="App-products">

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
                                    <th scope="col">ID</th>
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

export default ProductList;


