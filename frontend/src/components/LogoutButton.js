import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    navigate('/landing');
    window.location.reload();
  };

  return (
    <Button
      sx={{
        display: 'block',
        color: { xs: 'primary', md: 'white' },
        ml: { xs: '15px', md: '35px' },
        mt: { xs: 2, md: 0 },
        mb: { xs: '2px', md: '5px' },
      }}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
