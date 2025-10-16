import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

// Validation Schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // React Router navigate

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ✅ Handle login: redirect to /dashboard
  const onSubmit = (data) => {
    console.log("Admin login data:", data);

    // Directly navigate to dashboard
    navigate("/dashboard"); // <-- redirect to dashboard immediately
  };

  return (
    <Box className="admin-login-page">
      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <Box
          key={i}
          className="floating-circle"
          sx={{
            width: `${10 + Math.random() * 20}px`,
            height: `${10 + Math.random() * 20}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <div className="admin-login-container" style={{ justifyContent: "center" }}>
        <div className="admin-login-right">
          <Paper elevation={12} className="admin-login-box">
            <Typography variant="h4" className="admin-login-title">
              ADMIN LOGIN
            </Typography>
            <Typography variant="body1" className="admin-login-subtitle">
              Access your admin dashboard securely
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              className="admin-login-form"
            >
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                className="admin-login-btn"
              >
                Login
              </Button>
            </Box>
          </Paper>
        </div>
      </div>
    </Box>
  );
}
