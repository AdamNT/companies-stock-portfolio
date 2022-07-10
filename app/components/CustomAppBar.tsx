import { AppBar, Container, Toolbar, Typography } from "@mui/material";

const CustomAppBar = () => {
  return (
    <AppBar position="static" component="nav">
      <Container>
        <Toolbar variant="dense" disableGutters>
          <Typography variant="h6" color="inherit" component="div">
            SDH Frontend Homework
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
