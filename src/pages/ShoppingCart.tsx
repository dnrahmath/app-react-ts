import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const categories = [
  {
    id: "460b123e-e0b4-4681-b67d-76c546ea3b66",
    name: "Makanan",
    img: "https://img.freepik.com/premium-photo/traditional-japanese-meal-with-fried-chicken-pork-cutlets-soup_1007521-47245.jpg",
    listProducts: [
      { id: "cde2fc63-504a-40d8-a4f3-6f72bb26f94a", name: "Burger", price: 25000, img: "https://img.freepik.com/free-photo/burger_1339-1550.jpg" },
      { id: "1771400f-2a5f-4352-b845-da20424ad2e1", name: "Pizza", price: 18000, img: "https://img.freepik.com/free-photo/hawaiian-pizza_1203-2455.jpg" },
      { id: "3393d6f5-561d-4be3-a436-c743c6587017", name: "Fried Rice", price: 18000, img: "https://img.freepik.com/free-photo/stir-fried-chili-paste-chicken-with-rice-fried-eggs-white-plate-wooden-table_1150-28443.jpg" },
      { id: "3bcb90c4-1955-4093-8bc6-7ca53c3b943e", name: "Fried Chicken", price: 18000, img: "https://img.freepik.com/free-photo/close-up-fried-chicken-drumsticks_23-2148682835.jpg" }
    ]
  },
  {
    id: "7a0c2878-35de-4f5a-97f9-5de57c19fff6",
    name: "Minuman",
    img: "https://img.freepik.com/premium-photo/cup-hot-tea-drink-tea_87720-32695.jpg",
    listProducts: [
      { id: "e2415848-7f8f-478b-9828-2d2be6ae2a3b", name: "Soda", price: 15000, img: "https://img.freepik.com/free-photo/tasty-bubble-tea-drinks-arrangement_23-2149870687.jpg" },
      { id: "fbe287e4-8813-4d6b-b1f2-307e25b8476c", name: "Milk", price: 35000, img: "https://img.freepik.com/free-photo/glass-with-milk-chocolate_23-2148937237.jpg" },
      { id: "55e0b90f-3648-436c-9efb-d5e7a24cf5d9", name: "Orange Juice", price: 15000, img: "https://img.freepik.com/premium-photo/glass-orange-juice_106857-98.jpg" },
      { id: "c75f6b06-9573-4e1b-a7dd-b70d6ccf3bf9", name: "Manggo Juice", price: 15000, img: "https://img.freepik.com/free-photo/mango-shake-fresh-tropical-fruit-smoothies_501050-963.jpg" }
    ]
  }
];

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<{ name: string; price: number; qty: number }[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    const storedCart = localStorage.getItem("shoppingCart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }, [cart]);

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  const updateCart = (name: string, price: number, change: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.name === name ? { ...item, qty: item.qty + change } : item
      ).filter(item => item.qty > 0);
      
      if (!updatedCart.some(item => item.name === name) && change > 0) {
        updatedCart.push({ name, price, qty: 1 });
      }
      return updatedCart;
    });
  };

  const checkout = () => {
    alert("Checkout berhasil! Terima kasih telah berbelanja.");
    setCart([]);
    localStorage.removeItem("shoppingCart");
    window.location.href = "/payment";
  };

  return (
    <main className="container mt-4" style={{ maxWidth: "95%" }}>
      <div className="row">
        <div className="col-md-3">
          <div className="card p-3">
            <h2>Cart Summary</h2>
            <ul className="list-group">
              {cart.length === 0 ? <li className="list-group-item">Cart is empty</li> : cart.map((item, idx) => (
                <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                  {item.name} (x{item.qty})
                  <span>Rp {(item.price * item.qty).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            {cart.length > 0 && <button className="btn btn-success mt-3" onClick={checkout}>Checkout</button>}
          </div>
        </div>
        <div className="col-md-9">
          {categories.map((category) => (
            <div key={category.id} className="mb-3 text-center">
              <button className="btn btn-outline-secondary w-100 p-3" onClick={() => toggleCategory(category.name)}>
                <img src={category.img} alt={category.name} className="mb-2" style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                <span className="fs-4 d-block">{category.name} {openCategory === category.name ? "▲" : "▼"}</span>
              </button>
              {openCategory === category.name && (
                <div className="mt-2">
                  <div className="row">
                    {category.listProducts.map((product) => (
                      <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card">
                          <img src={product.img} className="card-img-top" alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
                          <div className="card-body text-center">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">Rp {product.price.toLocaleString()}</p>
                            <button className="btn btn-danger mx-2" onClick={() => updateCart(product.name, product.price, -1)}>-</button>
                            <span>{cart.find((item) => item.name === product.name)?.qty || 0}</span>
                            <button className="btn btn-primary mx-2" onClick={() => updateCart(product.name, product.price, 1)}>+</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShoppingCart;
