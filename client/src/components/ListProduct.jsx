import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { allProductsUrl } from "../urls";
import axios from "axios";

function ListProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const allProducts = async () => {
      try {
        const res = await axios.get(allProductsUrl());
        setProducts(res.data);
      } catch (e) {
        alert(e.message);
      }
    };
    allProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/delete/${id}`);
      alert("Product has been delete");
    } catch (e) {
      alert(e);
    }
    console.log(id, "has been selected");
  };

  return (
    <div className="listProduct" style={{ margin: "50px" }}>
      <h1>List Product</h1>
      <Link to="/admin/products/create">create new</Link>
      <hr />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.rating}</td>
              <td>
                <Link
                  to={`/admin/products/edit/${product.id}`}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Edit
                </Link>
                &nbsp;|&nbsp;
                <a
                  style={{
                    color: "Red",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListProduct;
