import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";

export default function Header() {
  const displayDesktop = () => {
    return (
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          Cool App Name
        </Typography>
      </Toolbar>
    );
  };

  return (
    <header>
      <AppBar position="static">{displayDesktop()}</AppBar>
    </header>
  );
}
