import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export default function AdminMenu() {
  const adminPages = ['Products', 'News', 'Orders', 'Purchases'];
  const { user } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <div>
      {user.isAdmin ? (
        <>
          <Button
            id="basic-button"
            aria-controls={anchorElNav ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={anchorElNav ? 'true' : undefined}
            onClick={handleOpenNavMenu}
            sx={{
              display: 'block',
              mt: { xs: 2, md: 0 },
              mr: 1,
              ml: { xs: 2, md: 4 },
              color: { xs: 'primary', md: 'white' },
            }}
          >
            ADMIN MENU
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {adminPages.map((adminPage) => (
              <MenuItem key={adminPage} onClick={handleCloseNavMenu}>
                <Button
                  component={RouterLink}
                  to={`/admin/${adminPage.toLocaleLowerCase()}`}
                  key={adminPage}
                  sx={{ display: 'block' }}
                >
                  {adminPage}
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <div> </div>
      )}
    </div>
  );
}
