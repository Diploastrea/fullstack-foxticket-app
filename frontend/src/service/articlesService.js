async function articlesData(number) {
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/api/articles/${number}`);
    const data = await response.json();
    return data;
  } catch (err) {
    return 'Service unavailable, please try again later!';
  }
}

export default articlesData;
