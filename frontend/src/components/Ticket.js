import { useContext } from 'react';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { UserContext } from '../context/UserContext';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import getOrders from '../service/orderService';

export default function Ticket(props) {
  const { user } = useContext(UserContext);
  const { setCartItems, countItems } = useContext(ShoppingCartContext);
  const {
    id,
    mainInfo,
    detailedInfo,
    price,
    time,
  } = props;

  const handleAddToCart = async () => {
    const product = { productId: id };
    await fetch(`${process.env.REACT_APP_URL}/api/orders/${user.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(product),
    });
    const items = await getOrders(user.id);
    setCartItems(items);
    await countItems();
  };

  return (
    <Grid>
      <Box border={1} margin={2} padding={2} display="flex" data-testid="ticketBox">
        <Box margin={1} width="60%" data-testid="ticketBox1">
          <div>{mainInfo}</div>
          <h6>{detailedInfo}</h6>
        </Box>
        <Box margin={1} width="10%" data-testid="ticketBox2">
          <div>
            {price}
            €
          </div>
          <h5>
            {time}
            h
          </h5>
        </Box>
        <Box
          data-testid="ticketBox3"
          margin={1}
          width="30%"
          display="flex"
          justifyContent="end"
          alignItems="center"
        >
          <Button
            data-testid="ticketButton"
            sx={{ backgroundColor: '#D1CFCF', color: 'black', ':hover': { backgroundColor: '#517DFB', color: 'white' } }}
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Grid>
  );
}
