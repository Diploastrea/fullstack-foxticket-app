async function editNews(id, title, content, setErrorMessage, setShowError, navigate) {
  try {
    const editNewsData = { title, content };
    const token = window.localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_URL}/api/admin/news/${id}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(editNewsData),
    });
    const data = await response.json();
    if (response.status !== 200) {
      setShowError(true);
      setErrorMessage(data);
      return;
    }
    navigate('/admin/news');
    window.location.reload();
    return;
  } catch (err) {
    setShowError(true);
    setErrorMessage(err.message);
  }
}

export default editNews;
