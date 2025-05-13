import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import MENU_LIST from "../utils/menu";
import * as IMAGES from "../utils/images";

const drawerWidth = 80;

type SidebarProps = {
  open: boolean;
  toggleDrawer: () => void;
  onProfileClick: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  open,
  toggleDrawer,
  onProfileClick,
}) => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      open={open}
      onClose={toggleDrawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          borderRight: "1px solid #E2E8F0",
          transition: "transform 0.3s ease",
          transform: open ? "translateX(0)" : "translateX(-80px)",
        },
      }}
    >
      <Box>
        <Box sx={{ mt: "20px" }}>
          <img src={IMAGES.logo} alt="logo" />
        </Box>
        <Box sx={{ mt: "6px" }}>
          <List>
            {MENU_LIST.map((menu, index) => (
              <ListItem disablePadding sx={{ paddingBottom: 2 }} key={index}>
                <ListItemIcon sx={{ minWidth: 0 }}>
                  <IconButton
                    sx={{
                      borderRadius: "50%",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                      backgroundColor:
                        menu.link === window.location.pathname
                          ? "#F8FAFC"
                          : "transparent",
                    }}
                  >
                    <img
                      style={{ padding: 4 }}
                      src={menu.icon}
                      alt={menu.title}
                    />
                  </IconButton>
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <List>
          <ListItem
            disablePadding
            sx={{ paddingBottom: "12px", justifyContent: "center" }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>
              <IconButton
                component={Link}
                to="/settings"
                sx={{
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                }}
                aria-label="go to settings"
              >
                <img src={IMAGES.settings} alt="settings" />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <ListItem disablePadding sx={{ paddingBottom: 1 }}>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <IconButton
                component={Button}
                onClick={() => {
                  onProfileClick();
                }}
                sx={{
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                }}
                aria-label="go to profile picture"
              >
                <img src={IMAGES.avatar4} alt="profile" />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
