export function Pizza({
  soldOut,
  photoName,
  name,
  ingredients,
  quantity,
  price,
  onAddToCart,
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
