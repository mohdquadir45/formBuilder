import React from "react";
import { Typography, Container, Button, Divider, Box } from "@mui/material";

const ButtonTypes = ({ btnTitle, onClickHandle, variatnt }) => {
  return (
    <>
      <Button sx={{ my: 1 }} onClick={onClickHandle} variant={variatnt}>
        {btnTitle}
      </Button>
    </>
  );
};

export default ButtonTypes;
