function ItemCard(props) {
  return (
    <div className="item-card" onClick={props.onClick}>
      
      <div className="item-card-image">
        {props.imagePath ? (
          <img src={props.imagePath} alt="商品画像" className="item-card-image-tag" />
        ) : (
          "画像無し"
        )}
      </div>

      <div className="item-card-price">{props.price}円</div>
      <div className="item-card-name">{props.name}</div>
    </div>
  );
}

export default ItemCard;