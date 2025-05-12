import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MENU_LIST from "../utils/menu";
import * as IMAGES from "../utils/images";
import TaskIcon from "@mui/icons-material/Checklist";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";

const drawerWidth = 80;

const Sidebar = ({ open, toggleDrawer }) => {
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
                        menu.link == window.location.pathname
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
                  localStorage.setItem("token", "fake-jwt-token");
                  window.location.reload();
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
