import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";

export default function QuizSelect() {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center">
        <Button color="primary" variant="contained" href="/quiz">
          Start quiz
        </Button>
        <Button color="primary" variant="contained" href="/edit-question">
          Edycja pytań
        </Button>
      </Box>
    </Container>
  );
}
