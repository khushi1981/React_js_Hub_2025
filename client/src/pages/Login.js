import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Paper, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const SERVER_URL = "http://localhost:5000";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      identifier: "",
      password: "",
    },
    validationSchema: Yup.object({
      identifier: Yup.string().required("User ID or Email is required"),
      password: Yup.string().required("Password is required").min(4, "Password must be at least 4 characters"),
    }),
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      try {
        const res = await fetch(`${SERVER_URL}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await res.json();

        if (res.ok && data.token) {
          localStorage.setItem("token", data.token);
          setStatus("Login success ✅");
          navigate("/dashboard");
        } else {
          setStatus(data.message || "Invalid login credentials");
        }
      } catch (err) {
        setStatus("Server error: " + err.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #cceeff, #e6f7ff)",
        overflow: "hidden",
        p: 2,
      }}
    >
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: "absolute",
            width: `${10 + Math.random() * 20}px`,
            height: `${10 + Math.random() * 20}px`,
            backgroundColor: `rgba(255,255,255,0.4)`,
            borderRadius: "50%",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 450,
          p: 5,
          borderRadius: 4,
          background: "linear-gradient(145deg, #e6f7ff, #cceeff)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          color: "#003366",
          zIndex: 1,
          animation: "fadeIn 1s ease-in",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 3,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "700",
            color: "#0066cc",
            letterSpacing: "1px",
            animation: "shimmer 3s linear infinite",
            background: "linear-gradient(90deg, #0066cc, #00ccff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          LOGIN
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="identifier"
            name="identifier"
            label="User ID or Email"
            margin="normal"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.identifier && Boolean(formik.errors.identifier)}
            helperText={formik.touched.identifier && formik.errors.identifier}
            sx={{
              input: { color: "#003366" },
              label: { color: "#0066cc" },
              "& .MuiFormHelperText-root": { color: "#cc0000" },
              mt: 2,
            }}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={{
              input: { color: "#003366" },
              label: { color: "#0066cc" },
              "& .MuiFormHelperText-root": { color: "#cc0000" },
            }}
          />

          <Button
            onClick={() => setShowPassword(!showPassword)}
            sx={{ mt: 1, mb: 2, textTransform: "none", color: "#0066cc" }}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, #00ccff, #0066cc)",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.1rem",
              py: 1.5,
              "&:hover": {
                background: "linear-gradient(90deg, #0066cc, #00ccff)",
                transform: "scale(1.05)",
              },
              transition: "all 0.3s ease",
            }}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </Button>

          {formik.status && (
            <Typography textAlign="center" mt={2} sx={{ color: formik.status.includes("success") ? "green" : "red" }}>
              {formik.status}
            </Typography>
          )}

          <Typography textAlign="center" mt={2} sx={{ color: "#0066cc", fontSize: "0.95rem" }}>
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#003366", fontWeight: "bold" }}>
              Register
            </Link>
          </Typography>
        </form>
      </Paper>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 0.4; }
          100% { transform: translateY(0) rotate(360deg); opacity: 0.6; }
        }
        @keyframes shimmer {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 0%; }
          100% { background-position: 0% 0%; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
}

export default Login;
