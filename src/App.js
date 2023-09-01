import pizzaData from "./data";
import { useEffect, useState } from "react";

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu({ pizzas, onAddToCart }) {
  return (
    <main className="menu">
      <h2> Our menu</h2>
      {pizzas.length > 0 ? (
        <ul className="pizzas">
          {pizzas.map((data) => (
            <Pizza
              name={data.name}
              ingredients={data.ingredients}
              price={data.price}
              photoName={data.photoName}
              quantity={data.quantity}
              soldOut={data.soldOut}
              key={data.name}
              onAddToCart={onAddToCart}
            />
          ))}
        </ul>
      ) : (
        <p>We're still working on our menu, Please come back</p>
      )}
    </main>
  );
}

function Footer({ onPlaceOrder, carts }) {
  const hour = new Date().getHours();
  const openHour = 9;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  return (
    <footer className="footer">
      {isOpen ? (
        <Order
          closeHour={closeHour}
          onPlaceOrder={onPlaceOrder}
          carts={carts}
        />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour + 1}
          :00
          <p style={{ textAlign: "center", paddingTop: "10px" }}>
            <Time />
          </p>
        </p>
      )}
    </footer>
  );
}

function Time() {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  useEffect(function () {
    setInterval(function () {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);
  return time;
}

function Order({ closeHour, onPlaceOrder, carts }) {
  return (
    <div className="order">
      <p>We're open until {closeHour + 1}:00. Come and visit us or order</p>
      <p>{<Time />}</p>
      <button
        disabled={!carts.length}
        className={`btn ${!carts.length ? "disabled" : ""}`}
        onClick={onPlaceOrder}
      >
        Order
      </button>
    </div>
  );
}

function Pizza({
  soldOut,
  photoName,
  name,
  ingredients,
  quantity,
  price,
  onAddToCart
}) {
  return (
    <div onClick={() => onAddToCart(name)}>
      <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
        <img src={photoName} alt={name}></img>
        <div>
          <h3>{name}</h3>
          <p>{ingredients}</p>
          <p>
            <strong> Available Quantity: {quantity} </strong>
          </p>
          {soldOut ? <span>SOLD OUT</span> : <span>Price: {price}$</span>}
        </div>
      </li>
    </div>
  );
}

export default function App() {
  const [pizzas, setPizzas] = useState(pizzaData);
  const [carts, setCarts] = useState([]);

  function handleAddToCart(item) {
    setCarts((carts) => [...carts, item]);
  }

  function handlePlaceOrder() {
    const mapObj = {};
    carts.map((cart) => {
      setPizzas((pizzas) =>
        pizzas.map((pizza) =>
          pizza.name === cart
            ? {
                ...pizza,
                quantity:
                  pizza.quantity === 0 ? pizza.quantity : pizza.quantity - 1,
                soldOut: pizza.quantity === 1 ? !pizza.soldOut : pizza.soldOut
              }
            : pizza
        )
      );
      if (mapObj[cart]) {
        mapObj[cart]++;
      } else {
        mapObj[cart] = 1;
      }
    });
    setCarts([]);
    let res = "";
    for (let key in mapObj) {
      res = res + key + ": " + mapObj[key] + ", ";
    }
    alert(`Your order of ${res} \ncompleted successfully ! \nEnjoy Your Meal`);
  }

  return (
    <div className="container">
      <Header />
      <Menu pizzas={pizzas} onAddToCart={handleAddToCart} />
      <Footer onPlaceOrder={handlePlaceOrder} carts={carts} />
    </div>
  );
}
