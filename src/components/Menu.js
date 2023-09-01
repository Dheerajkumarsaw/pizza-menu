import { Pizza } from "./Pizza";

export function Menu({ pizzas, onAddToCart }) {
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
