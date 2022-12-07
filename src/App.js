import React, { useState, useEffect } from "react";
import axios from "axios";
import comms from "./comms";
import "./App.css";

const StoreSection = (props) => {
  return <div className="store">{props.children}</div>;
};

const ContainerSection = (props) => {
  return <div className="container">{props.children}</div>;
};

const HeaderSection = (props) => {
  return <div className="header">{props.children}</div>;
};

const SidebarSection = (props) => {
  return <div className="sidebar">{props.children}</div>;
};

const ProductOverlay = (props) => {
  return (
  <div className="productOverlay">
    <h3>{props.product.title}</h3>
    <h4>{"$"+props.product.price}</h4>
    <h5>{"rating: "+props.product.rating + "/5"}</h5>
  </div>
  )
};

const ProductDisplay = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className="productDiv"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="productImageDiv"
        style={{
          backgroundImage: "url(" + props.product.images[0] + ")",
          backgroundSize:"100% 100%"
        }}
      >
        {isHovering && (
         
         <ProductOverlay product={props.product} />

        )}
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    console.log("Starting effect");
    comms.getAll().then((initialProducts) => {
      console.log("promise fulfilled");
      console.log(initialProducts);
      setAllProducts(initialProducts);
    });
  }, []);

  const [allProducts, setAllProducts] = useState([]);

  return (
    <ContainerSection>
      <HeaderSection>
        <h2>Header</h2>
      </HeaderSection>

      <SidebarSection>
        <h2>Sidebar</h2>
      </SidebarSection>

      <StoreSection>
        {allProducts.map((product) => (
          <ProductDisplay product={product} />
        ))}
      </StoreSection>
    </ContainerSection>
  );
}

export default App;
