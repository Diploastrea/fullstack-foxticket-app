import { useContext, useState } from 'react';
import {
  Button,
  Drawer,
  Box,
  Typography,
  Snackbar,
  Alert,
} from '@mui/material';
import { UserContext } from '../context/UserContext';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import CartItem from './CartItem';

export default function Cart() {
  const { user, updateTickets } = useContext(UserContext);
  const {
    cartIsOpen,
    setCartIsOpen,
    setCartItems,
    totalPrice,
  } = useContext(ShoppingCartContext);
  let { countedItems } = useContext(ShoppingCartContext);
  const [show, setShow] = useState(false);

  const handlePurchaseOrder = async () => {
    await fetch(`${process.env.REACT_APP_URL}/api/orders/${user.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    setShow(true);
    setCartItems([]);
    countedItems = [];
    updateTickets();
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') return;
    setShow(false);
  };

  const handleRemoveAllItems = async () => {
    await fetch(`${process.env.REACT_APP_URL}/api/orders`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    setCartItems([]);
    countedItems = [];
  };

  return (
    <Drawer
      anchor="right"
      open={cartIsOpen}
      onClose={() => setCartIsOpen(false)}
    >
      <Box
        width="450px"
        height="100%"
        textAlign="center"
        variant="temporary"
        mt="30px"
        display="block"
        position="relative"
      >
        <Typography variant="h4" fontWeight="bold" mb={5}>
          Shopping cart
        </Typography>
        {
          countedItems.length === 0 ? (
            <Typography>
              Your cart is currently empty
            </Typography>
          ) : (
            countedItems.length > 0 && (
              countedItems.map((item) => (
                <CartItem
                  key={item.id}
                  purchaseId={item.id}
                  name={item.name}
                  quantity={item.count}
                  price={item.price}
                />
              )))
          )
        }
        <Box
          width="100%"
          position="absolute"
          bottom={30}
        >
          <Typography
            variant="h5"
            position="absolute"
            width="100%"
            bottom={60}
          >
            Total:&nbsp;
            {totalPrice}
            €
          </Typography>
          <Button
            disabled={countedItems.length === 0}
            variant="contained"
            sx={{ mr: 3 }}
            size="large"
            onClick={handlePurchaseOrder}
          >
            Buy
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={show}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert severity="success" variant="filled">
              Your order has been submitted and will be processed shortly!
            </Alert>
          </Snackbar>
          <Button
            onClick={handleRemoveAllItems}
            variant="contained"
            color="error"
            size="large"
          >
            Remove all
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
