async function register(
  name,
  email,
  password,
  setErrorMessage,
  setShowError,
  navigate,
) {
  try {
    const registrationData = { name, email, password };
    const response = await fetch(`${process.env.REACT_APP_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(registrationData),
    });
    const data = await response.json();
    if (response.status !== 200) {
      setShowError(true);
      setErrorMessage(data);
      return;
    }
    navigate('/login');
    return;
  } catch (err) {
    setShowError(true);
    setErrorMessage('Service unavailable, please try again later!');
  }
}

export default register;
