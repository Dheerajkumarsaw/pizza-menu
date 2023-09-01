import { Time } from "./Time";

export function Order({ closeHour, onPlaceOrder, carts }) {
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
