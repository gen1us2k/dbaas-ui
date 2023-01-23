import React, { useState } from 'react';
import {
  styled, Theme, useTheme,
} from '@mui/material/styles';
import { useTheme2 } from '@grafana/ui';
import { GrafanaTheme2 } from '@grafana/data';
import {
  CSSObject,
  Drawer as MuiDrawer,
  DrawerProps as MuiDrawerProps,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  ClickAwayListener,
  IconButton, SvgIcon,
} from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MenuItemType } from '../PageLayout.types';
import { ReactComponent as PerconaLogo } from '../../../images/percona-logo.svg';
import { pmmHome } from '../../constants';

interface DrawerProps extends MuiDrawerProps {
  grafanaTheme: GrafanaTheme2,
  theme: Theme,
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: 350,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.background.default,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  // width: `calc(${theme.spacing(7)} + 1px)`,
  // [theme.breakpoints.up('sm')]: {
  //   width: `calc(${theme.spacing(8)} + 1px)`,
  // },
  // width: 56,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }: DrawerProps) => ({
    width: 350,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
    ul: {
      position: 'relative',
    },
    '& .MuiPaper-root': {
      overflow: 'unset',
      border: 'none',
    },
  }),
);

const OutWrapper = styled('div')`
  position: relative;
  width: 64px;
`;

const InnerWrapper = styled('div')`
    position: absolute;
`;

const OutWrapperDrawer = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
`;

const StyledOpenButton = styled(IconButton)(
  ({ grafanaTheme }: { grafanaTheme: GrafanaTheme2 }) => ({
    position: 'absolute',
    right: -12,
    top: -212,
    width: 24,
    height: 24,
    backgroundColor: grafanaTheme.colors.background.primary,
    color: grafanaTheme.colors.text.primary,
  }),
);

interface NavigationProps {
  menuItems: MenuItemType[];
}

function Navigation({ menuItems }: NavigationProps) {
  const grafanaTheme: GrafanaTheme2 = useTheme2();
  const muiTheme: Theme = useTheme();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
  // <Drawer grafanaTheme={grafanaTheme} theme={muiTheme} variant="permanent" open={open}>
  //   {/* <IconButton onClick={handleDrawerClose}> */}
  //   {/*  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />} */}
  //   {/* </IconButton> */}
  // </Drawer>
    <OutWrapper>
      <InnerWrapper>
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
          open={open}
          onClickAway={() => open && setOpen(false)}
        >
          <Drawer variant="permanent" open={open} grafanaTheme={grafanaTheme} theme={muiTheme}>
            <List>
              <ListItem key="percona" disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  onClick={() => {
                    window.location.href = pmmHome;
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}

                  >
                    <SvgIcon>
                      <PerconaLogo />
                    </SvgIcon>
                  </ListItemIcon>
                  {open && <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />}
                </ListItemButton>
              </ListItem>
              {menuItems.map((item) => (
                <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    }}
                    onClick={() => {
                      if (item.ext) {
                        window.location.href = pmmHome;
                      } else {
                        navigate(item.link, { replace: true });
                      }
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} />}
                  </ListItemButton>
                </ListItem>
              ))}
              <OutWrapperDrawer>
                <StyledOpenButton
                  grafanaTheme={grafanaTheme}
                  aria-label="fingerprint"
                  color="secondary"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <ChevronLeft /> : <ChevronRight />}
                </StyledOpenButton>
              </OutWrapperDrawer>
            </List>
          </Drawer>
        </ClickAwayListener>
      </InnerWrapper>
    </OutWrapper>
  );
}

export default Navigation;
