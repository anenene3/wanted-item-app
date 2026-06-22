function ItemCard(props) {
  return (
    <div className="item-card" onClick={props.onClick}>
  <div className="item-card-image">
    {props.imagePath ? (
      <img src={props.imagePath} alt="商品画像" className="item-card-image-tag" />
    ) : (
      <span className="item-card-no-image">No Image</span>
    )}

    <div className="item-card-price">{props.price}円</div>
  </div>

  <div className="item-card-name">
    <span className="item-card-name-text">{props.name}</span>
  </div>
</div>
  );
}

export default ItemCard;