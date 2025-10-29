import React, { createContext, useContext, useEffect, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const STORAGE_KEY = "levelup_cart_v1";

function cartReducer(state, action) {
  switch (action.type) {
    case "initialize":
      return action.payload || [];
    case "add": {
      const item = action.payload;
      const idx = state.findIndex((i) => i.id === item.id);
      if (idx >= 0) {
        const next = state.slice();
        next[idx] = { ...next[idx], qty: next[idx].qty + (item.qty || 1) };
        return next;
      }
      return [...state, { ...item, qty: item.qty || 1 }];
    }
    case "remove":
      return state.filter((i) => i.id !== action.payload);
    case "updateQty": {
      const { id, qty } = action.payload;
      return state.map((i) => (i.id === id ? { ...i, qty } : i));
    }
    case "clear":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, []);

  // initialize from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "initialize", payload: JSON.parse(raw) });
    } catch (e) {
      console.warn("Failed to load cart from localStorage", e);
    }
  }, []);

  // persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [state]);

  // expose a global helper so legacy injected scripts can add items
  useEffect(() => {
    const addGlobal = (payload) => dispatch({ type: "add", payload });
    // old code may call window.agregarAlCarrito(nombre, precio)
    window.agregarAlCarrito = function (nombre, precio) {
      try {
        addGlobal({ id: nombre, nombre, precio, qty: 1 });
      } catch (e) {
        console.warn("agregarAlCarrito failed", e);
      }
    };
    // also provide a namespaced helper
    window.__levelup_addToCart = function (item) {
      try {
        addGlobal(item);
      } catch (e) {
        console.warn("__levelup_addToCart failed", e);
      }
    };

    return () => {
      try {
        delete window.agregarAlCarrito;
        delete window.__levelup_addToCart;
      } catch (e) {}
    };
  }, [dispatch]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

export function useCartState() {
  const ctx = useContext(CartStateContext);
  if (ctx === undefined)
    throw new Error("useCartState must be used within CartProvider");
  return ctx;
}

export function useCartDispatch() {
  const ctx = useContext(CartDispatchContext);
  if (ctx === undefined)
    throw new Error("useCartDispatch must be used within CartProvider");
  return ctx;
}

export function useCart() {
  const state = useCartState();
  const dispatch = useCartDispatch();

  const addItem = (item) => dispatch({ type: "add", payload: item });
  const removeItem = (id) => dispatch({ type: "remove", payload: id });
  const updateQty = (id, qty) =>
    dispatch({ type: "updateQty", payload: { id, qty } });
  const clearCart = () => dispatch({ type: "clear" });

  const total = state.reduce(
    (s, it) => s + (it.precio || 0) * (it.qty || 1),
    0
  );

  return { cart: state, addItem, removeItem, updateQty, clearCart, total };
}

// no default export; use named hooks: useCart, useCartState, useCartDispatch, CartProvider
