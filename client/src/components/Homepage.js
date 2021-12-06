import React, { useState, useEffect } from "react";
import Carousel from "./Silder";
import Card from "./Card";
import Loading from "./Loading";
import Footer from "./Footer";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { allProductsUrl } from "./../urls";
import "../css/Homepage.css";
import "bootstrap/dist/css/bootstrap.css";

function Homepage(props) {
  const { DisplaySetFlex } = props;
  const [state, setState] = useState({ status: undefined });

  DisplaySetFlex();

  useEffect(() => {
    const allProducts = async () => {
      try {
        let { data, status } = await axios.get(allProductsUrl());
        const arrEle = splittingArr(data);
        setState({ data, status, arrEle });
      } catch (e) {
        alert(e.message);
      }
    };
    allProducts();
  }, []);

  function splittingArr(arr) {
    const arrEle = arr.splice(0, 100);
    return arrEle;
  }

  const { arrEle, status } = state;

  return (
    <>
      {status ? (
        <>
          <Carousel />
          <div className="Homepage ">
            <div className="ItemContainer middleItemContainer mt-2">
              {arrEle.map((arg) => (
                <Card key={uuidv4()} {...arg} />
              ))}
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Homepage;
