import "../App.css";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

function ItemEdit() {
  const navigate = useNavigate();
  const { itemId } = useParams();
  const location = useLocation();
  const from = location.state?.from;

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser || !loginUser.userId) {
      alert("ログインしてください");
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/items/${itemId}`)
      .then((response) => response.json())
      .then((data) => {
        setItemName(data.itemName);
        setPrice(String(data.price));
        setDescription(data.description);
        setImagePath(data.imagePath || "");
      })
      .catch((error) => console.error("編集データ取得エラー:", error));
  }, [itemId, navigate]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setSelectedFile(null);
      setPreviewUrl("");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const uploadImageToCloudinary = async () => {
    if (!selectedFile) {
      return imagePath;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", "wanted_item_app_unsigned");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/doknbjzie/image/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Cloudinaryアップロード失敗");
    }

    return data.secure_url;
  };

  const handleUpdate = async () => {
    if (!itemName.trim()) {
      alert("募集商品名を入力してください");
      return;
    }

    if (!price.trim()) {
      alert("買い取り金額を入力してください");
      return;
    }

    if (isNaN(price)) {
      alert("買い取り金額は半角数字で入力してください");
      return;
    }

    if (Number(price) <= 0) {
      alert("買い取り金額は1以上で入力してください");
      return;
    }

    if (!description.trim()) {
      alert("詳細説明・募集条件を入力してください");
      return;
    }

    try {
      const uploadedImageUrl = await uploadImageToCloudinary();

      const response = await fetch(`http://localhost:8080/items/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          imagePath: uploadedImageUrl,
          itemName: itemName,
          price: Number(price),
          description: description
        })
      });

      const data = await response.text();

      if (data === "更新成功") {
        alert("募集情報を更新しました");
        navigate(`/item-detail/${itemId}`, {state: {from: from}, replace: true});
        return;
      }

      alert(data);
    } catch (error) {
      console.error("更新エラー:", error);
      alert(error.message || "更新中にエラーが発生しました");
    }
  };

const handleDelete = () => {
  const result = window.confirm("本当に削除しますか？");
  if (!result) {
    return;
  }

  fetch(`http://localhost:8080/items/${itemId}`, {
    method: "DELETE"
  })
    .then((response) => response.text())
    .then((data) => {
      if(data === "削除成功"){
        alert("募集を削除しました");
        navigate(`/my-items`);
        return;
      }
      alert(data);
    })
    .catch((error) => {
      console.error("削除エラー:", error)
      alert("削除中にエラーが発生しました")
    });
};

  

  return (
    <div className="page-background">
      <Header />
      <div className="item-edit">

        <h1 className="item-edit-title">募集編集</h1>

        <div className="item-edit-contents">
          <div className="item-edit-image-area">
            {(previewUrl || imagePath) && (
              <img
                className="item-edit-image-preview"
                src={previewUrl || imagePath}
                alt="募集画像のプレビュー"
              />
            )}

            <input
              id="item-edit-image-input"
              className="item-edit-image-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            <label htmlFor="item-edit-image-input" className="item-edit-image-button">
              画像を選択
            </label>
          </div>

          <p>募集商品名</p>
          <input
            className="item-edit-name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <p>買い取り金額</p>
          <input
            className="item-edit-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <p>詳細説明・募集条件</p>
          <textarea
            className="item-edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="item-edit-button-area">
            <input
              className="item-edit-cancel-button"
              type="button"
              value="キャンセル"
              onClick={() => navigate(-1)}
            />
            <input
              className="item-edit-post-button"
              type="button"
              value="編集完了"
              onClick={handleUpdate}
            />
            <input
              className="item-edit-delete-button"
              type="button"
              value="削除"
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemEdit;