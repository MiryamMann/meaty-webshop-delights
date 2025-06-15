
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const initialProducts = [
  { id: "1", name: "Ribeye Steak", price: 29.99, available: true },
  { id: "2", name: "Pork Chops", price: 19.99, available: true },
  { id: "3", name: "Chicken Breast", price: 14.99, available: true },
];

// Dummy orders
const initialOrders = [
  { id: "101", customer: "John Doe", product: "Ribeye Steak", status: "pending" },
  { id: "102", customer: "Jane Smith", product: "Pork Chops", status: "pending" }
];

const Admin = () => {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedPrice, setEditedPrice] = useState("");
  const [adminChecked, setAdminChecked] = useState(false);
  const navigate = useNavigate();

  // Check admin
  useEffect(() => {
    if (localStorage.getItem("isAdmin") !== "true") {
      navigate("/admin-login");
    } else {
      setAdminChecked(true);
    }
  }, [navigate]);

  if (!adminChecked) return null;

  // Edit product price
  const handleEdit = (id: string, price: number) => {
    setEditingId(id);
    setEditedPrice(price.toString());
  };

  const handleSave = (id: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, price: parseFloat(editedPrice) } : p
      )
    );
    setEditingId(null);
    setEditedPrice("");
    // TODO: Sync to backend
  };

  const handleToggleAvailability = (id: string) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, available: !p.available } : p
      )
    );
    // TODO: Sync to backend
  };

  const updateOrderStatus = (id: string, status: "done" | "paused") => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status } : order
      )
    );
    // TODO: Sync to backend
  };

  return (
    <>
      <main className="container mt-24 mb-14 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-burgundy mb-10 font-playfair">Admin Dashboard</h1>

        {/* Product section */}
        <section className="mb-16">
          <h2 className="text-xl font-semibold font-playfair text-burgundy mb-5">Edit Products</h2>
          <table className="w-full border rounded-lg bg-white/80 shadow mb-4">
            <thead>
              <tr className="bg-wood/20">
                <th className="p-3 text-left text-burgundy">Product</th>
                <th className="p-3 text-left text-burgundy">Price</th>
                <th className="p-3 text-left text-burgundy">Available</th>
                <th className="p-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="p-3">{p.name}</td>
                  <td className="p-3">
                    {editingId === p.id ? (
                      <Input
                        value={editedPrice}
                        type="number"
                        min="0"
                        step="0.01"
                        className="w-24"
                        onChange={e => setEditedPrice(e.target.value)}
                      />
                    ) : (
                      `$${p.price.toFixed(2)}`
                    )}
                  </td>
                  <td className="p-3">
                    <span className={p.available ? "text-green-700" : "text-red-600"}>
                      {p.available ? "Yes" : "No"}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      className="ml-4 text-xs"
                      onClick={() => handleToggleAvailability(p.id)}
                    >
                      {p.available ? "Set Unavailable" : "Set Available"}
                    </Button>
                  </td>
                  <td className="p-3">
                    {editingId === p.id ? (
                      <Button
                        size="sm"
                        onClick={() => handleSave(p.id)}
                        className="mr-2"
                      >Save</Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEdit(p.id, p.price)}
                      >Edit</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Orders section */}
        <section>
          <h2 className="text-xl font-semibold font-playfair text-burgundy mb-5">Orders</h2>
          <table className="w-full border rounded-lg bg-white/80 shadow mb-4">
            <thead>
              <tr className="bg-wood/20">
                <th className="p-3 text-left text-burgundy">ID</th>
                <th className="p-3 text-left text-burgundy">Customer</th>
                <th className="p-3 text-left text-burgundy">Product</th>
                <th className="p-3 text-left text-burgundy">Status</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-b last:border-0">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.customer}</td>
                  <td className="p-3">{order.product}</td>
                  <td className="p-3">
                    <span className={
                      order.status === "done" ? "text-green-700"
                        : order.status === "paused" ? "text-yellow-700"
                        : "text-burgundy"
                    }>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="p-3 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={order.status === "done"}
                      onClick={() => updateOrderStatus(order.id, "done")}
                    >Mark as Done</Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={order.status === "paused"}
                      onClick={() => updateOrderStatus(order.id, "paused")}
                    >Pause</Button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-5 text-center text-wood">No orders yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default Admin;
