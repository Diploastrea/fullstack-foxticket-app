export default async function getProducts() {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/api/products`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    if (response.status !== 200) {
      return new Error(data.statusText);
    }
    return data;
  } catch (err) {
    return new Error('Service unavailable, please try again later!');
  }
}
