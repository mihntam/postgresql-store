import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import axios from "axios";

import { getOneProductUrl } from "../urls";

function ProductEdit() {
  const location = useLocation();
  const path = location.pathname.split("/")[4];

  const [id, setId] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [img, setImg] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();

  useEffect(() => {
    const allProducts = async () => {
      try {
        const res = await axios.get(getOneProductUrl(path));
        setId(res.data.id);
        setName(res.data.name);
        setCategory(res.data.category);
        setImg(res.data.img);
        setDescription(res.data.description);
        setPrice(res.data.price);
        setRating(res.data.rating);
      } catch (e) {
        alert(e.message);
      }
    };
    allProducts();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updateProduct = {
      name,
      category,
      img,
      description,
      price,
      rating,
    };
    console.log(updateProduct);
    try {
      const res = await axios.put(
        `http://localhost:5000/products/edit/${id}`,
        updateProduct
      );
    } catch (error) {
      alert(error.response);
    }
  };

  return (
    <div className="productEdit" style={{ margin: "50px" }}>
      <h1>Edit</h1>
      <h4>Product</h4>
      <hr />
      <div className="row">
        <div className="col-md">
          <div>
            {img && (
              <img
                src={img}
                className="rounded float-left"
                alt="product img"
                style={{
                  width: "300px",
                  height: "300px",
                  objectFit: "cover",
                }}
              />
            )}
          </div>
          <form className="row" onSubmit={handleUpdate}>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Id</label>
                <label className="form-control">{id}</label>
              </div>
              <div className="form-group">
                <label className="control-label">Name</label>
                <input
                  className="form-control"
                  placeholder="Enter product name..."
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Category</label>
                <input
                  className="form-control"
                  placeholder="Enter product category..."
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Image link</label>
                <input
                  className="form-control"
                  placeholder="Enter product image link..."
                  value={img}
                  onChange={(e) => {
                    setImg(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <label className="control-label" type="text">
                  Description
                </label>
                <textarea
                  className="form-control"
                  placeholder="Enter product description..."
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="form-group">
                <label className="control-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter product price..."
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Rating</label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  className="form-control"
                  placeholder="Enter product rating..."
                  value={rating}
                  onChange={(e) => {
                    setRating(e.target.value);
                  }}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Link to="/admin/products">Back to List</Link>
    </div>
  );
}

export default ProductEdit;
