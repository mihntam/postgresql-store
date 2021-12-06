import { Link } from "react-router-dom";

function ProductEdit() {
  return (
    <div className="productEdit" style={{ margin: "50px" }}>
      <h1>Edit</h1>
      <h4>Product</h4>
      <hr />
      <div className="row">
        <div className="col-md">
          <div>
            <img
              src="https://images.pexels.com/photos/1066116/pexels-photo-1066116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              className="rounded float-left"
              alt="product img"
              style={{
                width: "300px",
                height: "300px",
                objectFit: "cover",
              }}
            />
          </div>
          <form className="row">
            <div className="col">
              <div className="form-group">
                <label className="control-label">Id</label>
                <label className="form-control">aksldfjlaj</label>
              </div>
              <div className="form-group">
                <label className="control-label">Name</label>
                <input
                  className="form-control"
                  placeholder="Enter product name..."
                />
              </div>
              <div className="form-group">
                <label className="control-label">Category</label>
                <input
                  className="form-control"
                  placeholder="Enter product category..."
                />
              </div>
              <div className="form-group">
                <label className="control-label">Image link</label>
                <input
                  className="form-control"
                  placeholder="Enter product image link..."
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
                ></textarea>
              </div>
              <div className="form-group">
                <label className="control-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter product price..."
                />
              </div>
              <div className="form-group">
                <label className="control-label">Rating</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter product rating..."
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