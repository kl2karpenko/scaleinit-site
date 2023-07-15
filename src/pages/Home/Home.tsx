import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export default function Home() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  return (
    <Box>
      <Container maxWidth="xl">
          Home
      </Container>
    </Box>
  );
}