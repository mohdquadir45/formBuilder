import { Typography, Container, Button, Divider, Box } from "@mui/material";
import { Link } from 'react-router-dom';

import React from "react";

export default function Forms() {

    
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          width: "100%",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h4" component="h4">
            Welcom To Form.com
          </Typography>
          <Typography variant="body1" component="p">
            This is simple form builder.
          </Typography>
          <Link to="/create-new-form">
            <Button sx={{ my: 1 }} variant="contained" color="success">
              Create New Form
            </Button>
          </Link>
        </Box>
      </Box>

      <Divider sx={{ my: 2 }}></Divider>
      <Typography variant="h4" component="h4">
        Forms
      </Typography>
      <Typography variant="body1" component="p">
        You have no forms created yet.
      </Typography>
    </Container>
  );
}
