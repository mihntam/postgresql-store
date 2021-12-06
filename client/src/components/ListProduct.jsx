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
              <td>{product.categories}</td>
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
                <text
                  style={{
                    color: "Red",
                  }}
                >
                  Delete
                </text>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListProduct;
