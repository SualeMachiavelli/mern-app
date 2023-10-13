import React from "react";

const Admin = () => {
  return (
    <div className="admin">
      <div className="admin__container">
        <div className="admin__sidebar">
          <div className="admin__home">Home Dashboard</div>
          <span className="admin__nav">Navigation</span>
          <ul>
            <li className="admin__list">settings</li>
            <li className="admin__list">data updates</li>
            <li className="admin__list">password updates</li>
            <li className="admin__list">emails</li>
            <li className="admin__list">Reviews</li>
          </ul>
        </div>
        <main className="admin__main">
          <div className="admin__items">
            <div className="admin__item admin__products">
              <span>Total products</span>
              <span className="admin__value">289</span>
            </div>
            <div className="admin__item admin__feedback">
              <span>Feedback</span>
              <span className="admin__value">234</span>
            </div>
            <div className="admin__item admin__orders">
              <span>Orders</span>
              <span className="admin__value">23</span>
            </div>
            <div className="admin__item admin__users">
              <span>Users</span>
              <span className="admin__value">213</span>
            </div>
          </div>
          <div className="admin__info">
            <div className="admin__newUsers">
              <h2 className="admin__title">New users</h2>
              <ul>
                <li className="admin__user">
                  <div className="admin__user-n">
                    <img
                      className="admin__user-photo"
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                      alt=""
                    />
                    <span>James Kiet</span>
                  </div>
                  <span className="admin__role">user</span>
                </li>
                <li className="admin__user">
                  <div className="admin__user-n">
                    <img
                      className="admin__user-photo"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60"
                      alt=""
                    />
                    <span>McGrath Ken</span>
                  </div>
                  <span className="admin__role admin__admin">admin</span>
                </li>
                <li className="admin__user">
                  <div className="admin__user-n">
                    <img
                      className="admin__user-photo"
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzZXJzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
                      alt=""
                    />
                    <span>Wilson Author</span>
                  </div>
                  <span className="admin__role">operator</span>
                </li>
              </ul>
            </div>
            <div className="admin__latest">
              <h3 className="admin__incoming-orders">Incoming orders...</h3>
              <ul>
                <li className="admin__order">
                  <span className="admin__tname">flower name</span>
                  {/* <span className="admin__tcontact">Customer name</span> */}
                  <p className="admin__btn admin__t">contact</p>
                </li>
                <li className="admin__order">
                  <span className="admin__order-name">Cauli flower</span>
                  <span className="admin__customer-contact">Tina Asamoah </span>
                  <div className="admin__btn&active">
                    {/* <button className="admin__btn btn">contact</button> */}
                    <span className="admin__newEmail">new</span>
                  </div>
                </li>
                <li className="admin__order">
                  <span className="admin__order-name">Sun flower</span>
                  <span className="admin__customer-contact">
                    Arthur Williams
                  </span>
                  <div className="admin__btn&active">
                    {/* <button className="admin__btn btn">contact</button> */}
                    <span className="admin__newEmail admin__viewed">
                      viewed
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
