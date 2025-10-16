import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import axios from "axios";

export default function NewsletterForm() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await axios.post("http://localhost:5000/subscribe", values);
        setSuccess(res.data.message);
        setError("");
        resetForm();
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
        setSuccess("");
      }
    },
  });

  return (
    <Box sx={{ mt: 4, p: 4, textAlign: "center", backgroundColor: "#f5f5f5", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Subscribe to Newsletter</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          sx={{ mr: 2, width: "300px" }}
        />
        <Button type="submit" variant="contained">Subscribe</Button>
      </form>
      {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Box>
  );
}
