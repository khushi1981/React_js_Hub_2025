import { useEffect, useState } from "react";
import { Box, TextField, Button, Typography, Grid, Card, CardContent, CardMedia } from "@mui/material";
import axios from "axios";

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: "",
    description: "",
    logo: ""
  });

  // Fetch subjects from backend
  const fetchSubjects = () => {
    axios.get("http://localhost:5000/subjects")
      .then(res => setSubjects(res.data))
      .catch(err => console.error("Error fetching subjects:", err));
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Add new subject
  const handleAdd = () => {
    axios.post("http://localhost:5000/subjects", newSubject)
      .then(() => {
        fetchSubjects();
        setNewSubject({ name: "", description: "", logo: "" });
      });
  };

  // Delete subject
  const handleDelete = (_id) => {
    axios.delete("http://localhost:5000/subjects", { data: { _id } })
      .then(() => fetchSubjects());
  };

  return (
    <Box p={4}>
      <Typography variant="h4">Manage Subjects</Typography>

      {/* Add New Subject Form */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          label="Name"
          value={newSubject.name}
          onChange={e => setNewSubject({ ...newSubject, name: e.target.value })}
        />
        <TextField
          label="Description"
          value={newSubject.description}
          onChange={e => setNewSubject({ ...newSubject, description: e.target.value })}
        />
        <TextField
          label="Logo URL"
          value={newSubject.logo}
          onChange={e => setNewSubject({ ...newSubject, logo: e.target.value })}
        />
        <Button variant="contained" onClick={handleAdd}>Add Subject</Button>
      </Box>

      {/* List of Subjects */}
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {subjects.map(subject => (
          <Grid item xs={12} sm={6} md={3} key={subject._id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={subject.logo}
                alt={subject.name}
              />
              <CardContent>
                <Typography variant="h6">{subject.name}</Typography>
                <Typography>{subject.description}</Typography>
                <Button color="error" onClick={() => handleDelete(subject._id)}>
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
