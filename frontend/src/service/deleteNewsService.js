async function deleteNews(id) {
  const token = window.localStorage.getItem('token');
  const response = await fetch(`${process.env.REACT_APP_URL}/api/admin/news/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
  await response.json();
  window.location.reload();
}

export default deleteNews;
