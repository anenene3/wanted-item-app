function ItemCard(props) {
  return (
    <div className="item-card" onClick={props.onClick}>
      <div className="item-card-image">写真</div>
      <div className="item-card-price">{props.price}円</div>
      <div className="item-card-name">{props.name}</div>
    </div>
  );
}

export default ItemCard;