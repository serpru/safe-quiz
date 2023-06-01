import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function QuizRanking() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {!loading && (
        <>
          <Paper elevation={1}>
            <Box textAlign="center">
              <Typography align="center">Lista rankingowa</Typography>
            </Box>
            <Grid
              justifyContent={"space-evenly"}
              container
              rowSpacing={2}
              spacing={2}
            >
              <Grid item xs={6}>
                <Box>
                  <Typography align="center">Użytkownik</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography align="center">Wynik</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography align="center">Adam</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Typography align="center">99%</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </>
      )}
    </>
  );
}
