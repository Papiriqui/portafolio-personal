import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Typography, Container, Box, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Email, Phone, LinkedIn, GitHub, School, Work, Code, VolunteerActivism } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' }, // Azul para acentos
    background: { default: '#f5f5f5' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Jhonatan Huamani Salazar</Typography>
          {/* Agrega botones de navegación aquí si quieres scroll suave */}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        {/* Sección Home/About */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>Sobre Mí</Typography>
          <Typography>
            Estudiante de Ingeniería de Sistemas de Información en UPC (Tercio Superior, Becario Pronabec). Experto en desarrollo web/móvil con React, Node.js, IA y cloud computing. Comprometido con la excelencia y el desarrollo del país.
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item><Phone /> (+51) 963042699</Grid>
            <Grid item><Email /> jhonatan.h.salazar@gmail.com</Grid>
            <Grid item><LinkedIn /> <a href="https://www.linkedin.com/in/jhonatan-huamani-salazar-3224392b9/">LinkedIn</a></Grid>
            <Grid item><GitHub /> <a href="https://github.com/Papiriqui">GitHub</a></Grid>
          </Grid>
        </Box>

        {/* Sección Educación */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>Educación</Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">Ingeniería de Sistemas de Información - UPC</Typography>
              <Typography>Agosto 2020 – Julio 2025</Typography>
            </CardContent>
          </Card>
          {/* Agrega más cards para Inglés y certificaciones */}
        </Box>

        {/* Sección Habilidades */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>Habilidades</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Lenguajes</Typography>
              <List>
                <ListItem><ListItemIcon><Code /></ListItemIcon><ListItemText>Python, C++, C#, JavaScript, etc.</ListItemText></ListItem>
                {/* Agrega más */}
              </List>
            </Grid>
            {/* Divide en columnas para otras categorías */}
          </Grid>
        </Box>

        {/* Sección Experiencia */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>Experiencia</Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">Practicante en SUNAT</Typography>
              <Typography>Abril 2024 – Julio 2025</Typography>
              <List>
                <ListItem>Proporcionar soporte a infraestructura y automatizar procesos con IA.</ListItem>
                {/* Agrega más */}
              </List>
            </CardContent>
          </Card>
          {/* Agrega Food Retail */}
        </Box>

        {/* Sección Proyectos */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>Proyectos</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6">FASTFIT</Typography>
                  <Typography>Aplicación móvil para citas médicas con React.js y Express.js (2023).</Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Agrega los demás proyectos en cards */}
          </Grid>
        </Box>

        {/* Sección Voluntariado */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>Voluntariado</Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">Pronabec - Talento Guía</Typography>
              <Typography>Diciembre 2023 – Actual: Apoyo emocional a becarios.</Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Sección Contacto */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>Contacto</Typography>
          <Typography>¡Contáctame para oportunidades!</Typography>
          {/* Repite info de contacto */}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;