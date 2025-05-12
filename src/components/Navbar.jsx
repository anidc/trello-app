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

const Navbar = ({ open, toggleDrawer }) => {
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
            margin: "0 16px",
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
            <img src={IMAGES.home} alt="home" />
          </Link>
          <Link underline="hover" color="#475569" href="#">
            Dashboard
          </Link>
          <Link underline="hover" color="#475569" href="#">
            Project
          </Link>
          <Typography
            color="primary"
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
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
          <img src={IMAGES.backIcon} alt="separator" /> Back to project
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
              margin: "0 8px",
            }}
          >
            {visibleAvatars.map((src, index) => (
              <Avatar
                key={index}
                src={src}
                alt={`avatar-${index}`}
                sx={{
                  marginLeft: index === 0 ? 0 : "-11px",
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
            endIcon={<AddIcon color="#475569" />}
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
            }}
          >
            Invite
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
