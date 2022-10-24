import { useContext } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { ShoppingCartContext } from '../context/ShoppingCartContext';

export default function CartItem({
  purchaseId,
  name,
  quantity,
  price,
}) {
  const { updateCart } = useContext(ShoppingCartContext);

  const handleRemoveItem = async () => {
    await fetch(`${process.env.REACT_APP_URL}/api/orders/${purchaseId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    await updateCart();
  };

  return (
    <Grid
      item
      p={3}
      margin={2}
      border={1}
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography component="span">
        {name}
      </Typography>
      <Typography sx={{ display: 'block', position: 'absolute', ml: '35%' }}>
        <span>
          {quantity}
          &nbsp;x&nbsp;
          {price}
          €
        </span>
      </Typography>
      <Button
        onClick={handleRemoveItem}
        variant="outlined"
        color="error"
        sx={{
          position: 'absolute',
          right: '30px',
        }}
      >
        remove
      </Button>
    </Grid>
  );
}
