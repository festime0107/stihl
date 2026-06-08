"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function AdminLogin({ onLoggedIn }) {
  const [email, setEmail] = useState("admin@stihlstore.al");
  const [password, setPassword] = useState("Admin12345!");
  const [error, setError] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      onLoggedIn();
    } else {
      setError("Email ose password gabim.");
    }
  }

  return (
    <Box component="form" onSubmit={handleLogin} sx={{ bgcolor: "#fff", p: 4, borderRadius: 4, maxWidth: 420, mx: "auto", mt: 8 }}>
      <Typography sx={{ fontSize: 28, fontWeight: 900, mb: 2 }}>Admin Login</Typography>
      <Stack spacing={2}>
        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained" sx={{ bgcolor: "#111", fontWeight: 900 }}>Hyr në Admin</Button>
      </Stack>
    </Box>
  );
}
