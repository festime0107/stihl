"use client";

import { useEffect, useState } from "react";

export function useOrdersApi(enabled = false) {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  async function fetchOrders() {
    if (!enabled) return;

    try {
      setLoadingOrders(true);
      const response = await fetch("/api/orders", { cache: "no-store" });

      if (!response.ok) {
        setOrders([]);
        return;
      }

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Orders fetch error:", error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
    }
  }

  async function updateOrderStatus(orderId, status) {
    const response = await fetch(`/api/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      alert("Statusi i porosisë nuk u ndryshua.");
      return;
    }

    await fetchOrders();
  }

  useEffect(() => {
    fetchOrders();
  }, [enabled]);

  return {
    orders,
    loadingOrders,
    fetchOrders,
    updateOrderStatus,
  };
}
