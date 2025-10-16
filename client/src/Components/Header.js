import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Stack, Box } from "@mui/material";

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#1e3d59", boxShadow: 3 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo + Name */}
        <Box display="flex" alignItems="center">
          <img
            src="/logo.png" // Place your logo in the public folder
            alt="Knowledge Nexus Logo"
            style={{ height: "50px", marginRight: "12px" }}
          />
          <Typography
            variant="h5"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              background: "linear-gradient(45deg, #ff6f61, #ffd700)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontFamily: "'Raleway', cursive",
              fontWeight: "bold",
              fontSize: "1.9rem",
            }}
          >
            Knowledge Nexus
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Stack direction="row" spacing={3}>
          <Button component={Link} to="/about" sx={navButtonStyle}>
            About
          </Button>
          <Button component={Link} to="/explore" sx={navButtonStyle}>
            Explore
          </Button>
          <Button component={Link} to="/subjects" sx={navButtonStyle}>
            Subjects
          </Button>
          <Button component={Link} to="/contact" sx={navButtonStyle}>
            Contact
          </Button>
          <Button component={Link} to="/AuthPage" sx={navButtonStyle}>
            AuthPage
          </Button>
          <Button component={Link} to="/userprofile" sx={navButtonStyle}>
            User Profile
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

// Common style for nav buttons
const navButtonStyle = {
  color: "#ffd700",
  fontWeight: "bold",
  fontFamily: "'Roboto', sans-serif",
  "&:hover": { color: "#ff6f61" },
};

export default Header;
