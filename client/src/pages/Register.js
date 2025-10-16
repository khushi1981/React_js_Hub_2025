import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Paper,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const SERVER_URL = "http://localhost:5000";
const cityOptions = ["Valsad", "Surat", "Vapi", "Navsari", "Daman", "Mumbai", "Delhi", "Ahmedabad"];

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      gender: "",
      email: "",
      userId: "",
      password: "",
      confirmPassword: "",
      city: "",
      contact: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces").required("Name is required"),
      dob: Yup.date().required("Date of Birth is required"),
      gender: Yup.string().required("Gender is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      userId: Yup.string().matches(/^[A-Za-z][A-Za-z0-9_@]{4,7}$/, "User ID must start with a letter, 5-8 characters, can contain letters, numbers, _ or @").required("User ID is required"),
      password: Yup.string().min(4, "Password must be at least 4 characters").required("Password is required"),
      confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match").required("Confirm Password is required"),
      city: Yup.string().required("City is required"),
      contact: Yup.string().matches(/^\d{10}$/, "Contact must be exactly 10 digits").required("Contact is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch(`${SERVER_URL}/api/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (data.success) {
          alert(data.message);
          navigate("/login");
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert("Server error: " + err.message);
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
          maxWidth: 550,
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
          REGISTER
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            sx={{
              input: { color: "#003366" },
              label: { color: "#0066cc" },
              "& .MuiFormHelperText-root": { color: "#cc0000" },
              mt: 2,
            }}
          />

          <TextField
            fullWidth
            id="dob"
            name="dob"
            label="Date of Birth"
            type="date"
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formik.values.dob}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.dob && Boolean(formik.errors.dob)}
            helperText={formik.touched.dob && formik.errors.dob}
            sx={{
              input: { color: "#003366" },
              label: { color: "#0066cc" },
              "& .MuiFormHelperText-root": { color: "#cc0000" },
            }}
          />

          <FormControl component="fieldset" margin="normal" error={formik.touched.gender && Boolean(formik.errors.gender)}>
            <FormLabel sx={{ color: "#0066cc" }}>Gender</FormLabel>
            <RadioGroup row id="gender" name="gender" value={formik.values.gender} onChange={formik.handleChange}>
              <FormControlLabel value="male" control={<Radio sx={{ color: "#0066cc" }} />} label="Male" />
              <FormControlLabel value="female" control={<Radio sx={{ color: "#0066cc" }} />} label="Female" />
              <FormControlLabel value="other" control={<Radio sx={{ color: "#0066cc" }} />} label="Other" />
            </RadioGroup>
          </FormControl>

          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{
              input: { color: "#003366" },
              label: { color: "#0066cc" },
              "& .MuiFormHelperText-root": { color: "#cc0000" },
            }}
          />

          <TextField
            fullWidth
            id="userId"
            name="userId"
            label="Create User ID"
            margin="normal"
            value={formik.values.userId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.userId && Boolean(formik.errors.userId)}
            helperText={formik.touched.userId && formik.errors.userId}
            sx={{
              input: { color: "#003366" },
              label: { color: "#0066cc" },
              "& .MuiFormHelperText-root": { color: "#cc0000" },
            }}
          />

          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
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

          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            margin="normal"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            sx={{
              input: { color: "#003366" },
              label: { color: "#0066cc" },
              "& .MuiFormHelperText-root": { color: "#cc0000" },
            }}
          />

          <TextField
            select
            fullWidth
            id="city"
            name="city"
            label="City"
            margin="normal"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            sx={{
              input: { color: "#003366" },
              label: { color: "#0066cc" },
              "& .MuiFormHelperText-root": { color: "#cc0000" },
            }}
          >
            {cityOptions.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            id="contact"
            name="contact"
            label="Contact Number"
            margin="normal"
            value={formik.values.contact}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
            helperText={formik.touched.contact && formik.errors.contact}
            sx={{
              input: { color: "#003366" },
              label: { color: "#0066cc" },
              "& .MuiFormHelperText-root": { color: "#cc0000" },
            }}
          />

          <Box mt={3}>
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
              Register
            </Button>
          </Box>
        </form>

        <Typography textAlign="center" mt={2} sx={{ color: "#0066cc", fontSize: "0.95rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#003366", fontWeight: "bold" }}>
            Login
          </Link>
        </Typography>
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

export default Register;
