import React, { useEffect, useState } from "react";
// import Pagination from "./components/Pagination";
// import Testimonial from "./components/Testimonial";
// // import Product from "./components/Product";
// import AllProducts from "./components/AllProducts";
import Products from "./Products";
import Testimonial from "./Testimonial";

const Home = () => {
  const [flowers, setFlowers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [count, setCount] = useState(1);
  const [result, setResult] = useState(0);
  const [remainder, setRemainder] = useState(0);
  // const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const getFlowers = async () => {
      try {
        const res = await fetch(
          `http://localhost:8800/api/flowers?page=${page}&limit=${limit}`
        );
        const data = await res.json();
        const { results, count: totalCount } = data;
        setCount(results);
        setFlowers(data);
        setResult(totalCount);
      } catch (error) {
        console.log(error);
      }
    };
    getFlowers();
  }, [count, limit, page, setResult]);
  // console.log(result);
  return (
    <>
      <div className="home">
        <div className="home__bg"></div>
        <div className="home__container">
          <img
            src="https://images.unsplash.com/photo-1602615576820-ea14cf3e476a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
            alt="image_name"
            className="home__photo"
          />
          <div className="home__content">
            <h1>Flowers for all kinds of occations</h1>
            <p>
              In as much as you're prepared to have all the things needed in
              life, flowers help in a way convey the kind of feelings and
              emotions.
              <span>
                sold over 1000+ amazing and beautiful flowers across the contry
              </span>
            </p>
            <button className="btn home__btn">Learn more</button>
          </div>
        </div>
      </div>
      <Products
        limit={limit}
        onSetLimit={setLimit}
        onSetPage={setPage}
        page={page}
        count={count}
        flowersData={flowers}
        onCount={count}
        onRemainder={remainder}
        onSetRemainder={setRemainder}
        onSetResult={setResult}
        onResult={result}
      />
      <Testimonial />
    </>
  );
};

export default Home;
