import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MENU_LIST from "../utils/menu";
import * as IMAGES from "../utils/images";
import TaskIcon from "@mui/icons-material/Checklist";
import SettingsIcon from "@mui/icons-material/Settings";

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
        <Box sx={{ mt: 3 }}>
          <img src={IMAGES.logo} alt="logo" />
        </Box>
        <Box sx={{ mt: 2 }}>
          <List>
            {MENU_LIST.map((menu, index) => (
              <ListItem disablePadding sx={{ paddingBottom: 2 }} key={index}>
                <ListItemIcon sx={{ minWidth: 0 }}>
                  <IconButton
                    sx={{
                      borderRadius: "50%",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                    }}
                  >
                    <img src={menu.icon} alt={menu.title} />
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
            sx={{ paddingBottom: 2, justifyContent: "center" }}
          >
            <ListItemIcon sx={{ minWidth: 0 }}>
              <IconButton
                sx={{
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                }}
                aria-label="add task"
              >
                <img src={IMAGES.settings} alt="settings" />
              </IconButton>
            </ListItemIcon>
          </ListItem>
          <ListItem disablePadding sx={{ paddingBottom: 1 }}>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <IconButton
                sx={{
                  borderRadius: "50%",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                }}
                aria-label="add task"
              >
                <img src={IMAGES.avatar4} alt="settings" />
              </IconButton>
            </ListItemIcon>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
