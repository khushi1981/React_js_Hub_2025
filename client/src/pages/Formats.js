import { useState, useEffect } from "react";
import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

import axios from "axios";

export default function Formats() {
  const [formats, setFormats] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/formats").then(res => setFormats(res.data));
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Media Variety for Users</Typography>
      <Grid container spacing={2}>
        {formats.map(f => (
          <Grid item xs={12} sm={6} md={3} key={f._id}>
            <Card>
              <CardMedia component="img" height="140" image={f.format_logo} alt={f.format_name} />
              <CardContent>
                <Typography variant="h6">{f.format_name}</Typography>
                <Typography>{f.format_description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
