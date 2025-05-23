import React, { FC } from "react";
import {
  Box,
  Breadcrumbs,
  Typography,
  Link,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import * as IMAGES from "../utils/images";
import AVATARS from "../utils/avatars";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

interface NavbarProps {
  tasksLen: number;
  open: boolean;
  toggleDrawer: () => void;
}

const Navbar: FC<NavbarProps> = ({ tasksLen, open, toggleDrawer }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const visibleAvatars = isSmallScreen ? AVATARS.slice(0, 3) : AVATARS;
  const remainingCount = AVATARS.length - visibleAvatars.length;

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
          paddingBottom: 1,
          paddingTop: 1,
        }}
      >
        <img src={IMAGES.nameLogo} alt="logo" />
        <IconButton onClick={toggleDrawer}>
          <img
            src={IMAGES.hamburger}
            alt="hamburger"
            style={{
              width: "24px",
              height: "24px",
              display: open ? "none" : "block",
            }}
          />
          <CloseIcon sx={{ display: open ? "block" : "none" }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          backgroundColor: "#F8FAFC",
          width: "100%",
          minHeight: "80px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
          paddingLeft: { xs: 2, md: 4 },
          paddingRight: { xs: 2, md: 4 },
          paddingTop: { xs: 3, sm: 0 },
          paddingBottom: { xs: 3, sm: 0 },
          "& .MuiTypography-root": {
            fontSize: "14px",
            fontWeight: 700,
          },
          "& .MuiBreadcrumbs-separator": {
            margin: "0 14px",
          },
        }}
      >
        <Breadcrumbs
          separator={<img src={IMAGES.separator} alt="separator" />}
          aria-label="breadcrumb"
          sx={{ display: { xs: "none", lg: "block" } }}
        >
          <Link
            underline="hover"
            color="#475569"
            href="#"
            sx={{ display: "flex" }}
          >
            <img
              style={{ marginLeft: "6px", marginRight: "5px", width: "20px" }}
              src={IMAGES.home}
              alt="home"
            />
          </Link>
          <Link underline="hover" color="#475569" href="#">
            Dashboard
          </Link>
          <Link underline="hover" color="#475569" href="#">
            Project
          </Link>
          <Typography
            color="primary"
            sx={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <img src={IMAGES.planet} alt="planet" /> Project PlanetX
          </Typography>
        </Breadcrumbs>

        <Link
          underline="hover"
          sx={{
            color: "primary",
            display: { xs: "flex", lg: "none" },
            gap: 1,
            cursor: "pointer",
          }}
        >
          <img
            style={{ margin: "0 5px" }}
            src={IMAGES.backIcon}
            alt="separator"
          />{" "}
          Back To Project
        </Link>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{
              borderRadius: "50%",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
            }}
          >
            <img src={IMAGES.searchIcon} alt="search" />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              fontSize: "0.875rem",
              lineHeight: 1.42,
              margin: "0 6px",
            }}
          >
            {visibleAvatars.map((src: string, index: number) => (
              <Avatar
                key={index}
                src={src}
                alt={`avatar-${index}`}
                sx={{
                  marginLeft: index === 0 ? 0 : "-14px",
                  width: "42px",
                  height: "42px",
                }}
              />
            ))}
            {isSmallScreen && remainingCount > 0 && (
              <Avatar
                sx={{
                  bgcolor: "#EEF2FF",
                  color: "#4F46E5",
                  fontSize: "1rem",
                  fontWeight: "900",
                  marginLeft: "-11px",
                  border: "2px solid #ffffff",
                }}
              >
                +{remainingCount}
              </Avatar>
            )}
          </Box>

          <Button
            variant="contained"
            endIcon={<AddIcon sx={{ color: "#475569" }} />}
            sx={{
              textTransform: "none",
              backgroundColor: "transparent",
              color: "#475569",
              fontSize: "0.875rem",
              lineHeight: 1.42,
              height: "40px",
              fontWeight: 700,
              boxShadow: "none",
              border: "1px solid #E2E8F0",
              borderRadius: "24px",
              "&:hover": { boxShadow: "none" },
              "& .MuiButton-endIcon": { marginRight: 0 },
            }}
          >
            Invite
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          padding: { xs: 2, md: 4 },
          paddingTop: { xs: "20px", md: 4 },
          paddingBottom: { xs: 0, md: "20px" },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          gap: "18px",
          borderBottom: { md: "1px solid #E2E8F0" },
        }}
      >
        <Box
          component="img"
          src={IMAGES.projectxLogo}
          alt="logo"
          sx={{
            maxWidth: {
              xs: "64px",
              md: "96px",
            },
            height: {
              md: "96px",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: { xs: "18px", md: "12px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: "24px", md: "30px" },
                fontWeight: 900,
                letterSpacing: "-0.4px",
              }}
            >
              Project PlanetX
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: "20px",
                color: "#475569",
                mt: { xs: 2, md: 0 },
              }}
            >
              {[
                { img: IMAGES.grid, label: "Grid View" },
                { img: IMAGES.sliders, label: "Filter" },
                { img: IMAGES.sortDescending, label: "Sort" },
              ].map(({ img, label }) => (
                <Box
                  key={label}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "14px",
                    fontWeight: 700,
                    gap: "5px",
                  }}
                >
                  <img src={img} alt={label.toLowerCase()} />
                  {label}
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#F1F5F9",
                borderRadius: "24px",
                padding: 0.5,
              }}
            >
              {[
                { icon: IMAGES.grid, label: "Grid View", active: false },
                { icon: IMAGES.list, label: "List View", active: true },
                { icon: IMAGES.columns, label: "Column View", active: false },
                { icon: IMAGES.rows, label: "Row View", active: false },
              ].map(({ icon, label, active }) => (
                <Button
                  key={label}
                  variant="contained"
                  startIcon={<img src={icon} alt={label.toLowerCase()} />}
                  sx={{
                    backgroundColor: active ? "#FFFFFF" : "transparent",
                    color: active ? "#1E293B" : "#475569",
                    borderRadius: "20px",
                    textTransform: "capitalize",
                    fontSize: "0.875rem",
                    lineHeight: 1.42,
                    fontWeight: 700,
                    padding: "10px 16px",
                    boxShadow: active
                      ? "0 4px 8px -2px rgba(23,23,23,0.1)"
                      : "none",
                    "&:hover": {
                      boxShadow: "none",
                    },
                    "& .MuiButton-icon": { marginLeft: 0 },
                  }}
                >
                  {label}
                </Button>
              ))}
            </Box>

            <Button
              variant="contained"
              endIcon={<img src={IMAGES.exportIcon} alt="export" />}
              sx={{
                display: { xs: "none", lg: "inline-flex" },
                borderRadius: "24px",
                textTransform: "capitalize",
                fontSize: "1rem",
                fontWeight: 700,
                lineHeight: 1.375,
                padding: "13px 22px",
                boxShadow: "none",
                "&:hover": { backgroundColor: "#4F46E5", boxShadow: "none" },
                "& .MuiButton-icon": { marginRight: 0 },
              }}
            >
              Export Data
            </Button>
          </Box>

          <Box sx={{ overflowX: "auto" }}>
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                minWidth: "400px",
              }}
            >
              {[
                { label: "By Status", active: false },
                { label: "By Total Tasks", active: true },
                { label: "Tasks Due", active: false },
              ].map(({ label, active }) => (
                <Button
                  key={label}
                  sx={{
                    textTransform: "capitalize",
                    fontWeight: 700,
                    color: active ? "#1E293B" : "#475569",
                    padding: "8px 16px",
                    borderBottom: `2px solid ${active ? "#4F46E5" : "#CBD5E1"}`,
                    borderRadius: 0,
                    fontSize: "1rem",
                  }}
                >
                  {label}
                  {label === "By Total Tasks" && (
                    <span
                      style={{
                        fontSize: "12px",
                        lineHeight: 1.33,
                        fontWeight: 600,
                        color: "#4F46E5",
                        backgroundColor: "#EEF2FF",
                        borderRadius: "16px",
                        padding: "3px 6px",
                        marginLeft: "10px",
                        border: "1px solid #A5B4FC",
                      }}
                    >
                      {tasksLen}
                    </span>
                  )}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
