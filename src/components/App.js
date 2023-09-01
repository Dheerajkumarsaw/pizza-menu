import pizzaData from "./data";
import { useState } from "react";
import { Footer } from "./Footer";
import { Menu } from "./Menu";
import { Header } from "./Header";


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
                soldOut: pizza.quantity === 1 ? !pizza.soldOut : pizza.soldOut,
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
