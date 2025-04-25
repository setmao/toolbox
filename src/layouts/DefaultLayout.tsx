import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import HandymanIcon from '@mui/icons-material/Handyman';

const NAVIGATION_LINKS = [
  {
    label: 'JSON Formatter',
    link: '/json-formatter',
  }
];

const DefaultLayout = () => {
  return (
    <>
      <Box>
        <AppBar>
          <Toolbar>
            <HandymanIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.2rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Toolbox
            </Typography>
            {NAVIGATION_LINKS.map((navLink) => (
              <Button key={navLink.label}>
                <Link
                  href={navLink.link}
                  underline="none"
                  sx={{ color: 'white', '&:hover': { textDecoration: 'none' }
                  }}
                >
                  <Typography variant="body1" textTransform="capitalize" sx={{ flexGrow: 1 }}>
                    JSON
                  </Typography>
                </Link>
              </Button>
            ))}
          </Toolbar>
        </AppBar>
      </Box>
      <Box mt={10}>
        <Outlet />
      </Box>
    </>
  );
}

export default DefaultLayout;