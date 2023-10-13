import React, { useState } from "react";
import { useEffect } from "react";
import { getItems } from "./productsApi";

const Collection = () => {
  const [collection, setCollection] = useState([]);
  useEffect(() => {
    const getCollection = async () => {
      const info = await getItems("/api/gallery/");
      info && setCollection(info?.gallery);
    };
    getCollection();
  }, []);
  return (
    <div className="collection" id="collection">
      <main className="collection__main">
        <h2 className="collection__title">{collection[0]?.title}</h2>
        <div className="collection__box">
          {collection[0]?.pictures.map((pic, i) => (
            <img src={pic?.filepath} alt={i} key={i} />
          ))}
          Hey
        </div>
      </main>
    </div>
  );
};

export default Collection;
