import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Products from "./Admin/Products";
import Data from "./Admin/Data";
import Password from "./Admin/Password";
import List from "./Admin/List";
import { deleteProduct, getItems } from "./productsApi";
const userAvatar =
  "https://th.bing.com/th/id/OIP.N9HFrFNrDQPDf4_MWezzCAHaHa?w=192&h=192&c=7&r=0&o=5&dpr=2&pid=1.7";
const initialState = {
  products: true,
  data: false,
  password: false,
  links: false,
};

const user =
  localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).user;

export const saveData = (data) => {
  localStorage.setItem("user", JSON.stringify(data));
};

// const config = {
//   headers: {
//     "Content-Type": "application/json",
//     token: "Bearer " + token,
//   },
// };

// console.log(user);

const reducer = (state, action) => {
  switch (action.type) {
    case "links":
      return { links: true };
    case "products":
      return { products: true };
    case "data":
      return { data: true };
    case "password":
      return { password: true };
    case "close":
      return { ...state, products: false };
    default:
      return initialState;
  }
};

const Profile = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [flowers, setFlowers] = useState([]);
  const [cards, setCards] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
    dispatch({ type: "close" });
  };

  const handleLinks = () => {
    dispatch({ type: "links" });
  };
  const handleData = () => {
    dispatch({ type: "data" });
  };
  const handlePassword = () => {
    dispatch({ type: "password" });
  };
  const handleProducts = () => {
    dispatch({ type: "products" });
  };

  useEffect(() => {
    const callItems = async () => {
      const { flowers } = await getItems("/api/flowers");
      const { cards } = await getItems("/api/cards");
      const { users } = await getItems("/api/users");

      setFlowers(flowers);
      setCards(cards);
      setUsers(users);
    };

    callItems();
  }, []);

  const handleDelete = async (e) => {
    const type = e.target.dataset.pType;
    const id = e.target.dataset.pId;
    if (type === "flower") {
      await deleteProduct("/api/flowers/" + id);
    } else if (type === "card") {
      await deleteProduct("/api/cards/" + id);
    }
  };

  return (
    <div className="profile">
      <span className="profile__close" onClick={handleClose}>
        &larr;
      </span>
      <div className="profile__container">
        <span className="profile__edit" onClick={handleData}>
          Edit
        </span>
        <img
          className="profile__bg"
          src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VkZGluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60"
          alt=""
        />

        <div className="profile__info">
          <img
            className="profile__user-img"
            src={`/uploads/usersPhotos/${user?.photo}`}
            alt=""
          />
          <span className="profile__name">{user?.username}</span>
          <span className="profile__email">{user?.email}</span>
          {user.role === "admin" && (
            <span className="profile__email">owner</span>
          )}
        </div>

        <div className="profile__items">
          {user.role === "admin" && (
            <span
              onClick={handleProducts}
              className={`profile__product ${
                state.products && "profile__border-bottom"
              }`}
            >
              Your products
            </span>
          )}
          <span
            className={`profile__product ${
              state.password && "profile__border-bottom"
            }`}
            onClick={handlePassword}
          >
            password
          </span>
          <span
            className={`profile__product ${
              state.data && "profile__border-bottom"
            }`}
            onClick={handleData}
          >
            personal info
          </span>
          {/* <span className="profile__product profile__border-bottom">
            update your password
          </span> */}
          {user.role === "admin" && (
            <span
              className={`profile__product ${
                state.links && "profile__border-bottom"
              }`}
              onClick={handleLinks}
            >
              upload products
            </span>
          )}
        </div>
      </div>
      {user.role === "admin" && (
        <div className="profile__details">
          <ul>
            <li className="profile__item">
              <span>{flowers?.length}</span> Flowers
            </li>
            <li className="profile__item">
              <span>{cards?.length}</span> Gift Cards
            </li>
            <li className="profile__item">
              <span>{users?.length}</span> Users
            </li>

            {/* <li> <span>23</span> Flowers</li> */}
          </ul>
          {/* <div className="profile__settings">
            <span>Update Password</span>
            <span>Update data</span>
            <span>Upload/Post</span>
          </div> */}
        </div>
      )}
      <div className="data">
        {state.data && <Data />}
        {state.password && <Password />}
        {state.products && user.role === "admin" && (
          <Products products={state.products} onDelete={handleDelete} />
        )}
        {state.links && user.role === "admin" && <List />}
      </div>
    </div>
  );
};

export default Profile;
