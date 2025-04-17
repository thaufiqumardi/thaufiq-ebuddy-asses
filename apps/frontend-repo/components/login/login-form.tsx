"use client";

import React from "react";
import { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography } from "@mui/material";
import { fetchLogin } from "@/api/auth";


export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetchLogin({ email, password });
      setError(null);
      setLoading(true);
      if (response.token) {
        document.cookie = `token=${response.token}; path=/`;
        window.location.href = "/";
      } else {
        setError("Invalid credentials. Please try again.");
      }
    }
    catch (error) {
      setError((error as { message?: string })?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: 400, padding: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h1" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <Typography variant="body2" color="error" sx={{ marginTop: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
              loading={loading}
              disabled={loading}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}