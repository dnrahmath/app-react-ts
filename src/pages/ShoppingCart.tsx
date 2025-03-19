import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: string;
  name: string;
  price: number;
  qty?: number;
  pathImage?: string;
}

interface Category {
  id: string;
  name: string;
  pathImage?: string;
  products: Product[];
}

const categories: Category[] = [
  {
    id: "460b123e-e0b4-4681-b67d-76c546ea3b66",
    name: "Makanan",
    pathImage: "https://img.freepik.com/premium-photo/traditional-japanese-meal-with-fried-chicken-pork-cutlets-soup_1007521-47245.jpg",
    products: [
      { id: "cde2fc63-504a-40d8-a4f3-6f72bb26f94a", name: "Burger", price: 25000, pathImage: "https://img.freepik.com/free-photo/burger_1339-1550.jpg" },
      { id: "1771400f-2a5f-4352-b845-da20424ad2e1", name: "Pizza", price: 18000, pathImage: "https://img.freepik.com/free-photo/hawaiian-pizza_1203-2455.jpg" },
      { id: "3393d6f5-561d-4be3-a436-c743c6587017", name: "Fried Rice", price: 18000, pathImage: "https://img.freepik.com/free-photo/stir-fried-chili-paste-chicken-with-rice-fried-eggs-white-plate-wooden-table_1150-28443.jpg" },
      { id: "3bcb90c4-1955-4093-8bc6-7ca53c3b943e", name: "Fried Chicken", price: 18000, pathImage: "https://img.freepik.com/free-photo/close-up-fried-chicken-drumsticks_23-2148682835.jpg" },
      { id: "3bcb90c4-1955-4093-8bc6-7ca53c3b943e", name: "Fried Chicken", price: 18000, pathImage: "https://img.freepik.com/free-photo/close-up-fried-chicken-drumsticks_23-2148682835.jpg" }
    ]
  },
  {
    id: "7a0c2878-35de-4f5a-97f9-5de57c19fff6",
    name: "Minuman",
    pathImage: "https://img.freepik.com/premium-photo/cup-hot-tea-drink-tea_87720-32695.jpg",
    products: [
      { id: "e2415848-7f8f-478b-9828-2d2be6ae2a3b", name: "Soda", price: 15000, pathImage: "https://img.freepik.com/free-photo/tasty-bubble-tea-drinks-arrangement_23-2149870687.jpg" },
      { id: "fbe287e4-8813-4d6b-b1f2-307e25b8476c", name: "Milk", price: 35000, pathImage: "https://img.freepik.com/free-photo/glass-with-milk-chocolate_23-2148937237.jpg" },
      { id: "55e0b90f-3648-436c-9efb-d5e7a24cf5d9", name: "Orange Juice", price: 15000, pathImage: "https://img.freepik.com/premium-photo/glass-orange-juice_106857-98.jpg" },
      { id: "c75f6b06-9573-4e1b-a7dd-b70d6ccf3bf9", name: "Manggo Juice", price: 15000, pathImage: "https://img.freepik.com/free-photo/mango-shake-fresh-tropical-fruit-smoothies_501050-963.jpg" },
      { id: "3bcb90c4-1955-4093-8bc6-7ca53c3b943e", name: "Fried Chicken", price: 18000, pathImage: "https://img.freepik.com/free-photo/close-up-fried-chicken-drumsticks_23-2148682835.jpg" }
    ]
  }
];


const ShoppingCart = () => {
  const [cart, setCart] = useState<{ [key: string]: Product }>({});
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const updateCart = (product: Product, change: number) => {
    setCart((prevCart) => {
      const newQty = (prevCart[product.id]?.qty || 0) + change;
      if (newQty <= 0) {
        const { [product.id]: _, ...rest } = prevCart;
        return rest;
      }
      return { ...prevCart, [product.id]: { ...product, qty: newQty } };
    });
  };

  return (
    <div className="container-fluid mt-4 px-4">
      <div className="row">
        {/* Cart Summary */}
        <div className="col-md-3">
          <div className="card p-3 shadow rounded-4 border-0 bg-light">
            <h2 className="text-center text-primary">Cart Summary</h2>
            <ul className="list-group border-0">
              {Object.keys(cart).length > 0 ? (
                Object.values(cart).map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center border-0 shadow-sm rounded-3 mb-2">
                    <span className="fw-bold text-dark">{item.name} (x{item.qty})</span>
                    <span className="text-success">Rp {item.price * (item.qty || 0)}</span>
                  </li>
                ))
              ) : (
                <li className="list-group-item text-center border-0 text-muted">Cart is empty</li>
              )}
            </ul>
          </div>
        </div>

        {/* Product Categories */}
        <div className="col-md-9">
          {categories.map((category) => (
            <div key={category.id} className="mb-4">
              <button
                className="btn btn-outline-primary w-100 p-0 shadow rounded-4 fw-bold position-relative"
                onClick={() => setOpenCategory(openCategory === category.id ? null : category.id)}
              >
                {category.pathImage && (
                  <img
                    src={category.pathImage}
                    alt={category.name}
                    className="img-fluid rounded-3 shadow-sm w-100"
                    style={{ height: 200, objectFit: "cover" }}
                  />
                )}
                <div className="position-absolute bottom-0 w-100 text-white bg-dark bg-opacity-50 p-2 text-center">
                  <span className="fs-4 d-block">{category.name}</span>
                </div>
              </button>

              {/* Menampilkan daftar produk jika kategori terbuka */}
              {openCategory === category.id && (
                <div className="mt-3">
                  <div className="row">
                    {category.products.length > 0 ? (
                      category.products.map((product) => (
                        <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                          <div className="card shadow rounded-4 border-0 h-100 overflow-hidden position-relative">
                            {product.pathImage && (
                              <img
                                src={product.pathImage}
                                alt={product.name}
                                className="w-100 position-absolute top-0 start-0"
                                style={{ height: 150, objectFit: "cover" }}
                              />
                            )}
                            <div
                              className="card-body text-center d-flex flex-column gap-2 py-2"
                              style={{ minHeight: "60px", marginTop: "125px" }}
                            >
                              <h6 className="card-title fw-bold text-dark m-0 fs-6">{product.name}</h6>
                              <p className="card-text text-success fw-semibold m-0 fs-6">Rp {product.price}</p>
                              <div className="mt-auto">
                                <button className="btn btn-danger rounded-circle mx-2 shadow-sm px-2 py-1" onClick={() => updateCart(product, -1)}>
                                  -
                                </button>
                                <span className="fw-bold">{cart[product.id]?.qty || 0}</span>
                                <button className="btn btn-primary rounded-circle mx-2 shadow-sm px-2 py-1" onClick={() => updateCart(product, 1)}>
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted text-center">Tidak ada produk</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;