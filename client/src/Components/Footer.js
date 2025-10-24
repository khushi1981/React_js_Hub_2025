// Footer.js
import React from "react";
import {
  Box,
  Typography,
  Link,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";

function Footer() {
  // ✅ Newsletter Form Setup
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await fetch("http://localhost:5000/api/subscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          alert("Subscription successful!");
          resetForm();
        } else {
          alert("Error subscribing.");
        }
      } catch (error) {
        console.error(error);
        alert("Server error.");
      }
    },
  });

  // ✅ Handle Admin Login Button Click
  const handleAdminLogin = () => {
    window.open("http://localhost:3000", "_blank"); // Opens admin login in new tab
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1e3d59",
        p: 4,
        mt: 4,
      }}
    >
      {/* ---------- Top Section ---------- */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            fontFamily: "'Raleway', cursive",
            fontWeight: "bold",
            fontSize: "1.9rem",
            background: "linear-gradient(45deg, #ff6f61, #ffd700)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text", // ✅ Added for cross-browser support
            color: "transparent",
          }}
        >
          Knowledge Nexus
        </Typography>

        <Typography
          variant="body2"
          sx={{ maxWidth: "600px", mx: "auto", mt: 1, color: "#ffd700" }}
        >
          Knowledge Nexus is a centralized platform designed to connect learners
          with the right knowledge, tools, and communities.
        </Typography>

        {/* ---------- Social Media Links ---------- */}
        <Box sx={{ mt: 2 }}>
          {[Facebook, Instagram, Twitter, YouTube].map((Icon, idx) => (
            <IconButton key={idx} sx={{ color: "#ffd700" }}>
              <Icon />
            </IconButton>
          ))}
        </Box>
      </Box>

      {/* ---------- Newsletter Subscription Form ---------- */}
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ textAlign: "center", mt: 3 }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ color: "#ffd700" }}>
          Subscribe to our Newsletter
        </Typography>

        <TextField
          size="small"
          name="email"
          label="Enter your email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{
            mr: 1,
            input: { color: "#ffd700" },
            label: { color: "#ffd700" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#ffd700" },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#ff6f61",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#ff856e" },
          }}
        >
          Subscribe
        </Button>
      </Box>

      {/* ---------- Bottom Section ---------- */}
      <Box
        sx={{
          mt: 4,
          pt: 2,
          borderTop: "1px solid #ffd700",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" sx={{ mb: 1, color: "#ffd700" }}>
          © {new Date().getFullYear()} Knowledge Nexus. All rights reserved.
        </Typography>

        <Box>
          {[
            "Home",
            "About",
            "Explore",
            "Subjects",
            "AuthPage",
          ].map((text, idx) => (
            <Link
              key={idx}
              href={`/${text.toLowerCase().replace(" ", "")}`}
              sx={{ mx: 1, color: "#ffd700" }}
            >
              {text}
            </Link>
          ))}

          {/* ✅ Admin Login Button */}
          <Button
            variant="outlined"
            onClick={handleAdminLogin}
            sx={{
              ml: 2,
              color: "#ffd700",
              borderColor: "#ffd700",
              "&:hover": {
                backgroundColor: "#ffd700",
                color: "#1e3d59",
              },
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: "bold",
              px: 2,
            }}
          >
            Admin Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
