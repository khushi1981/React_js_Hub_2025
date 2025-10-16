// src/components/ContactForm.js
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required").min(10, "Minimum 10 characters"),
});

const ContactForm = () => {
  const [success, setSuccess] = React.useState("");
  const [error, setError] = React.useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        setSuccess("Message sent successfully!");
        reset();
      } else {
        setError("Failed to send message");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box sx={{ mt: 4, maxWidth: 500, mx: "auto" }}>
      <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>Contact Us</Typography>
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Message"
          fullWidth
          margin="normal"
          multiline
          rows={4}
          {...register("message")}
          error={!!errors.message}
          helperText={errors.message?.message}
        />
        <Button variant="contained" type="submit" sx={{ mt: 2, width: "100%" }}>Send</Button>
      </form>
    </Box>
  );
};

export default ContactForm;
