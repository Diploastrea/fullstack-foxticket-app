async function getOrders(userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/api/orders/${userId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const orders = await response.json();
    return orders;
  } catch (err) {
    return err;
  }
}

export default getOrders;
