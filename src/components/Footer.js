import { Time } from "./Time";
import { Order } from "./Order";

export function Footer({ onPlaceOrder, carts }) {
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
        <span>
          We're happy to welcome you between {openHour}:00 and {closeHour + 1}
          :00
          <p style={{ textAlign: "center", paddingTop: "10px" }}>
            <Time />
          </p>
        </span>
      )}
    </footer>
  );
}
