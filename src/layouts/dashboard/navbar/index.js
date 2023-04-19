import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Stack, Drawer, Typography } from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
import useCollapseDrawer from '../../../hooks/useCollapseDrawer';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { DASHBOARD_NAVBAR_WIDTH, DASHBOARD_NAVBAR_COLLAPSE_WIDTH } from '../../../config';
// components
import Scrollbar from '../../../components/Scrollbar';
import NavSection from '../../../components/nav-section';
//
import CollapseButton from './CollapseButton';
import navConfig from './NavConfig';
import logo from '../../../assets/dashboardLogo.png';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    transition: theme.transitions.create('width', {
      duration: theme.transitions.duration.shorter,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func,
};

export default function DashboardNavbar({ isOpenSidebar, onCloseSidebar }) {
  const theme = useTheme();

  const { pathname } = useLocation();

  const isDesktop = useResponsive('up', 'lg');

  const { isCollapse, collapseClick, collapseHover, onToggleCollapse, onHoverEnter, onHoverLeave } =
    useCollapseDrawer();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
          ...(isCollapse && { alignItems: 'center' }),
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Link to="/dashboard/home">
              <img src={logo} alt="logo" />
            </Link>

            {isDesktop && !isCollapse && (
              <Typography variant="h5" sx={{ letterSpacing: '.2rem', color: '#515151', ml: 1.5 }}>
                eventnub
              </Typography>
            )}
          </Stack>

          {isDesktop && !isCollapse && (
            <CollapseButton onToggleCollapse={onToggleCollapse} collapseClick={collapseClick} />
          )}
        </Stack>
      </Stack>

      <NavSection navConfig={navConfig} isCollapse={isCollapse} />

      {/* <Box sx={{ flexGrow: 1 }} /> */}

      {/* {!isCollapse && <LogoutButton />} */}
    </Scrollbar>
  );

  return (
    <RootStyle
      sx={{
        width: {
          lg: isCollapse ? DASHBOARD_NAVBAR_COLLAPSE_WIDTH : DASHBOARD_NAVBAR_WIDTH,
        },
        ...(collapseClick && {
          position: 'absolute',
        }),
      }}
    >
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{ sx: { width: DASHBOARD_NAVBAR_WIDTH, bgcolor: '#EDF5F6' } }}
        >
          {renderContent}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant="persistent"
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          PaperProps={{
            sx: {
              width: DASHBOARD_NAVBAR_WIDTH,
              bgcolor: '#EDF5F6',
              transition: (theme) =>
                theme.transitions.create('width', {
                  duration: theme.transitions.duration.standard,
                }),
              ...(isCollapse && {
                width: DASHBOARD_NAVBAR_COLLAPSE_WIDTH,
              }),
              ...(collapseHover && {
                ...cssStyles(theme).bgBlur(),
                boxShadow: (theme) => theme.customShadows.z24,
              }),
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </RootStyle>
  );
}
