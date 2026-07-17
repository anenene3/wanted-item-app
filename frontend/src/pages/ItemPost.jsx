import "../App.css";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

function ItemPost() {
  const navigate = useNavigate();

  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
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
  }, [navigate]);

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
      return "";
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

  const handleSubmit = async () => {
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

    const savedUser = localStorage.getItem("loginUser");
    const loginUser = savedUser ? JSON.parse(savedUser) : null;

    if (!loginUser || !loginUser.userId) {
      alert("ログイン情報が見つかりません");
      navigate("/login");
      return;
    }

    try {
      let uploadedImageUrl = "";

      if (selectedFile) {
        uploadedImageUrl = await uploadImageToCloudinary();
      }

      const response = await fetch("http://localhost:8080/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: loginUser.userId,
          imagePath: uploadedImageUrl,
          itemName: itemName,
          price: Number(price),
          description: description
        })
      });

      const data = await response.text();

      if (data === "登録成功") {
        alert("募集を投稿しました");
        navigate("/", { replace: true });
        return;
      }

      alert(data);
    } catch (error) {
      console.error("投稿エラー:", error);
      alert(error.message || "投稿中にエラーが発生しました");
    }
  };

  return (
    <div className="page-background">
      <Header />
      <div className="item-post">
        
        <h1 className="item-post-title">募集投稿</h1>

        <div className="item-post-contents">
          <div className="item-post-image-area">
            {previewUrl && (
              <img
                className="item-post-image-preview"
                src={previewUrl}
                alt="選択した画像のプレビュー"
              />
            )}
            <input
              id="item-post-image-input"
              className="item-post-image-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            <label htmlFor="item-post-image-input" className="item-post-image-button">
              画像を選択
            </label>

          </div>
          

          <p>募集商品名</p>
          <input
            className="item-post-name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <p>買い取り金額</p>
          <input
            className="item-post-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <p>詳細説明・募集条件</p>
          <textarea
            className="item-post-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="item-post-button-area">
            <input
              className="item-post-cancel-button"
              type="button"
              value="キャンセル"
              onClick={() => navigate(-1)}
            />
            <input
              className="item-post-post-button"
              type="button"
              value="募集を投稿"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemPost;