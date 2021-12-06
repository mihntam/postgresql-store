import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProductsCreate() {
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [img, setImg] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  const [rating, setRating] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      id,
      name,
      category,
      img,
      description,
      price,
      rating,
    };
    console.log(newProduct);
    try {
      const res = await axios.post(
        "http://localhost:5000/products/create",
        newProduct
      );
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="productCreate" style={{ margin: "50px" }}>
      <h1>Create</h1>
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
          <form className="row" onSubmit={handleSubmit}>
            <div className="col">
              <div className="form-group">
                <label className="control-label">Id</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter product id..."
                  onChange={(e) => setId(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Name</label>
                <input
                  className="form-control"
                  placeholder="Enter product name..."
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Category</label>
                <input
                  className="form-control"
                  placeholder="Enter product category..."
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Image link</label>
                <input
                  className="form-control"
                  placeholder="Enter product image link..."
                  onChange={(e) => setImg(e.target.value)}
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
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="form-group">
                <label className="control-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter product price..."
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="control-label">Rating</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter product rating..."
                  min="0"
                  max="5"
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="Create"
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

export default ProductsCreate;
