import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import AdminMenu from './AdminMenu';
import LogoutButton from './LogoutButton';

const pages = ['Landing', 'Profile', 'Tickets', 'Shop'];

function LoggedHeader() {
  const { handleShoppingCartChange, cartItems } = useContext(ShoppingCartContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ mb: 5 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <AirplanemodeActiveIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/landing"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Foxticket
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Button
                    component={RouterLink}
                    to={`/${page.toLocaleLowerCase()}`}
                    key={page}
                    sx={{ display: 'block' }}
                  >
                    {page}
                  </Button>
                </MenuItem>
              ))}
              <Button
                sx={{
                  display: 'block',
                  ml: '10px',
                  mt: '7px',
                  mb: '2px',
                }}
                onClick={handleShoppingCartChange}
              >
                Cart
                <div style={{
                  color: 'white',
                  backgroundColor: '#df2e21',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  transform: 'translate(15%, 15%)',
                }}
                >
                  {cartItems.length ?? 0}
                </div>
              </Button>
              <AdminMenu />
              <LogoutButton />
            </Menu>
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mt: 1 }}
            justifyContent="flex-end"
            textAlign="center"
          >
            {pages.map((page) => (
              <Button
                component={RouterLink}
                to={`/${page.toLocaleLowerCase()}`}
                key={page}
                sx={{ color: 'white', display: 'block', mr: 4 }}
              >
                {page}
              </Button>
            ))}
            <Button
              sx={{
                color: 'white',
                display: 'block',
                mb: '5px',
              }}
              onClick={handleShoppingCartChange}
            >
              Cart
              <div style={{
                color: 'white',
                backgroundColor: '#df2e21',
                width: '1.5rem',
                height: '1.5rem',
                borderRadius: '50%',
                position: 'absolute',
                bottom: '0',
                right: '0',
                transform: 'translate(-5%, 25%)',
              }}
              >
                {cartItems.length ?? 0}
              </div>
            </Button>
            <AdminMenu />
            <LogoutButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default LoggedHeader;
