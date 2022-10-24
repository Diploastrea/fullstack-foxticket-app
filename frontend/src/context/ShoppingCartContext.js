/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { UserContext } from './UserContext';
import getOrders from '../service/orderService';

export const ShoppingCartContext = createContext({});

export function ShoppingCartProvider({ children }) {
  const { user } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  let countedItems = [];
  let totalPrice = 0;

  function countItems() {
    if (cartItems.length > 0) {
      countedItems = Object.values(cartItems.reduce((mapping, item) => {
        const { [item.name]: matchingItem } = mapping;
        if (matchingItem) {
          matchingItem.count += 1;
        } else {
          mapping[item.name] = { ...item, count: 1 };
        }
        return mapping;
      }, {}));
    }
  }

  function getTotalPrice() {
    let sum = 0;
    if (cartItems.length > 0) {
      cartItems.forEach((item) => {
        sum += item.price;
      });
    }
    return sum;
  }

  if (user) {
    useEffect(() => {
      getOrders(user.id).then((items) => setCartItems(items));
    }, []);
  }
  countItems();
  totalPrice = getTotalPrice();

  function handleShoppingCartChange() {
    setCartIsOpen(!cartIsOpen);
  }

  async function updateCart() {
    const items = await getOrders(user.id);
    setCartItems(items);
    countItems();
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        cartIsOpen,
        setCartIsOpen,
        handleShoppingCartChange,
        updateCart,
        cartItems,
        setCartItems,
        countedItems,
        countItems,
        totalPrice,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
