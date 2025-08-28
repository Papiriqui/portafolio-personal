import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, AppBar, Toolbar, Typography, Container, Box, Grid, Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Button, IconButton, Drawer, List as MuiList, Switch, Accordion, AccordionSummary, AccordionDetails, Fab } from '@mui/material';
import { Email, Phone, LinkedIn, GitHub, School, Work, Code, VolunteerActivism, Menu as MenuIcon, ExpandMore, Download, Brightness4, Brightness7 } from '@mui/icons-material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab'; // Correct import from @mui/lab
import { motion } from 'framer-motion'; // For animations
import { Link, Element } from 'react-scroll'; // For smooth scrolling
import { Helmet } from 'react-helmet'; // For SEO

// Theme with dark/light toggle
const getTheme = (mode) => createTheme({
  palette: {
    mode,
    primary: { main: '#1976d2' }, // Blue for buttons/accents
    secondary: { main: '#4caf50' }, // Green for CTAs
    background: { default: mode === 'light' ? '#f5f5f5' : '#303030' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': { transform: 'scale(1.05)', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' },
        },
      },
    },
  },
});

const sections = ['home', 'about', 'education', 'skills', 'experience', 'projects', 'volunteer', 'contact'];

function App() {
  const [mode, setMode] = useState('light');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = getTheme(mode);

  const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');
  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Jhonatan Huamani Salazar - Portafolio</title>
        <meta name="description" content="Estudiante de Ingeniería de Sistemas, desarrollador full-stack con experiencia en IA y cloud." />
        {/* Add favicon in public/favicon.ico if you have one */}
      </Helmet>

      {/* Fixed Navbar */}
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Jhonatan Huamani Salazar</Typography>
          <Switch checked={mode === 'dark'} onChange={toggleMode} />
          {mode === 'light' ? <Brightness7 /> : <Brightness4 />}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <MuiList>
          {sections.map((section) => (
            <ListItem button key={section} onClick={toggleDrawer}>
              <Link to={section} smooth={true} duration={500}>{section.toUpperCase()}</Link>
            </ListItem>
          ))}
        </MuiList>
      </Drawer>

      <Container maxWidth="lg" sx={{ mt: 10 }}>
        {/* Hero Section (Home) - Eye-catching with animation */}
        <Element name="home">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <Box sx={{ textAlign: 'center', py: 8, background: 'linear-gradient(to right, #1976d2, #4caf50)', color: 'white', borderRadius: 2 }}>
              <Typography variant="h3" gutterBottom>Jhonatan Huamani Salazar</Typography>
              <Typography variant="h5">Desarrollador Full-Stack | IA & Cloud Enthusiast</Typography>
              {/* Add profile photo: <img src={require('./assets/profile.jpg')} alt="Profile" style={{ width: 150, borderRadius: '50%' }} /> */}
              <Button variant="contained" color="secondary" startIcon={<Download />} href="/path/to/your-cv.pdf" download sx={{ mt: 2 }}>
                Descargar CV
              </Button>
            </Box>
          </motion.div>
        </Element>

        {/* About Section */}
        <Element name="about">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <Box sx={{ my: 4 }}>
              <Typography variant="h4" gutterBottom>Sobre Mí</Typography>
              <Typography>
                Estudiante de Ingeniería de Sistemas de Información en UPC (Tercio Superior, Becario Pronabec). Experto en desarrollo web/móvil con React, Node.js, IA y cloud computing. Comprometido con la excelencia y el desarrollo del país.
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item><Phone /> (+51) 963042699</Grid>
                <Grid item><Email /> jhonatan.h.salazar@gmail.com</Grid>
                <Grid item><LinkedIn /> <a href="https://www.linkedin.com/in/jhonatan-huamani-salazar-3224392b9/" style={{ color: 'inherit' }}>LinkedIn</a></Grid>
                <Grid item><GitHub /> <a href="https://github.com/Papiriqui" style={{ color: 'inherit' }}>GitHub</a></Grid>
              </Grid>
            </Box>
          </motion.div>
        </Element>

        {/* Education Section with Accordion */}
        <Element name="education">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Educación</Typography>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Ingeniería de Sistemas de Información - UPC (2020-2025)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Tercio Superior | Becario Pronabec</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Inglés Intermedio - Universidad de Cambridge (2021-Actual)</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Progresando hacia nivel avanzado.</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography>Certificaciones</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem><ListItemText>React.js + Node.js (Udemy, 2025)</ListItemText></ListItem>
                  <ListItem><ListItemText>N8N (Udemy, 2024)</ListItemText></ListItem>
                  <ListItem><ListItemText>Especialista en AWS (AWS, 2024)</ListItemText></ListItem>
                  <ListItem><ListItemText>Analista en Azure (Udemy, 2024)</ListItemText></ListItem>
                  <ListItem><ListItemText>Analista de Ciberseguridad (IBM, 2023)</ListItemText></ListItem>
                  <ListItem><ListItemText>Machine Learning on Google Cloud (Google Cloud, 2023)</ListItemText></ListItem>
                  <ListItem><ListItemText>SQL para Ciencia de Datos (UC, 2022)</ListItemText></ListItem>
                  <ListItem><ListItemText>Diseño de Videojuegos Creativos (Instituto de Arte de California, 2022)</ListItemText></ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Element>

        {/* Skills Section with Grid and Icons */}
        <Element name="skills">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Habilidades</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Lenguajes</Typography>
                    <List>
                      <ListItem><ListItemIcon><Code /></ListItemIcon><ListItemText>Python, C++, C#, JavaScript, CSS, HTML, Java, PHP</ListItemText></ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Herramientas</Typography>
                    <List>
                      <ListItem><ListItemIcon><Code /></ListItemIcon><ListItemText>React.js, Node.js, Power BI, PostgreSQL, SQL Server, Oracle, MongoDB, AWS, Azure, etc.</ListItemText></ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Habilidades Blandas</Typography>
                    <List>
                      <ListItem><ListItemIcon><Code /></ListItemIcon><ListItemText>Trabajo en equipo, Proactivo, Liderazgo, Adaptabilidad</ListItemText></ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Habilidades Duras</Typography>
                    <List>
                      <ListItem><ListItemIcon><Code /></ListItemIcon><ListItemText>Redes, Ciberseguridad, Cloud Computing, Análisis de Datos</ListItemText></ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Element>

        {/* Experience Section with Timeline */}
        <Element name="experience">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Experiencia</Typography>
            <Timeline position="alternate">
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">Abril 2024 – Julio 2025</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary"><Work /></TimelineDot>
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">Practicante en SUNAT</Typography>
                  <Typography>Proporcionar soporte a infraestructura, automatizar procesos con IA, desarrollo web/móvil.</Typography>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">2023</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary"><Work /></TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">Compañía Food Retail S.A.C</Typography>
                  <Typography>Soporte a clientes potenciales, manejo de sistemas financieros.</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Box>
        </Element>

        {/* Projects Section with Cards in Grid */}
        <Element name="projects">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Proyectos</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">FASTFIT (2023)</Typography>
                      <Typography>Aplicación móvil para citas médicas con React.js y Express.js.</Typography>
                      <Button variant="outlined" href="https://github.com/Papiriqui/fastfit">Ver en GitHub</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={4}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">CARTCOST (2024)</Typography>
                      <Typography>Aplicación web financiera con Angular y Java para simular crédito vehicular.</Typography>
                      <Button variant="outlined" href="https://github.com/Papiriqui/cartcost">Ver en GitHub</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={4}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">SELVA CENTER (2023)</Typography>
                      <Typography>Implementación de ERP SAP S/4HANA con módulos primordiales.</Typography>
                      <Button variant="outlined" href="https://github.com/Papiriqui/selva-center">Ver en GitHub</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={4}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">PROT GAIN (2022)</Typography>
                      <Typography>Sistema de ventas en C# con formularios.</Typography>
                      <Button variant="outlined" href="https://github.com/Papiriqui/prot-gain">Ver en GitHub</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={4}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">EDUPREDICT (2025)</Typography>
                      <Typography>Aplicación web de machine learning para predicción de deserción escolar.</Typography>
                      <Button variant="outlined" href="https://github.com/Papiriqui/edupredict">Ver en GitHub</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={4}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">FACETAKE (Actual)</Typography>
                      <Typography>Aplicación móvil similar a TikTok con Flutter y Node.js.</Typography>
                      <Button variant="outlined" href="https://github.com/Papiriqui/facetake">Ver en GitHub</Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Element>

        {/* Volunteer Section */}
        <Element name="volunteer">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Voluntariado</Typography>
            <Card>
              <CardContent>
                <Typography variant="h6">Pronabec - Talento Guía (Diciembre 2023 – Actual)</Typography>
                <Typography>Apoyo emocional a becarios, reportes y ayuda estudiantil.</Typography>
              </CardContent>
            </Card>
          </Box>
        </Element>

        {/* Contact Section with Form */}
        <Element name="contact">
          <Box sx={{ my: 4 }}>
            <Typography variant="h4" gutterBottom>Contacto</Typography>
            <Typography>¡Hablemos de oportunidades!</Typography>
            <form> {/* Add emailjs logic */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <input type="text" placeholder="Nombre" style={{ width: '100%', padding: 8 }} />
                </Grid>
                <Grid item xs={12}>
                  <input type="email" placeholder="Email" style={{ width: '100%', padding: 8 }} />
                </Grid>
                <Grid item xs={12}>
                  <textarea placeholder="Mensaje" style={{ width: '100%', padding: 8, height: 100 }} />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">Enviar</Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Element>
      </Container>

      {/* Floating Fab for Scroll to Top */}
      <Fab color="primary" aria-label="scroll top" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Link to="home" smooth={true} duration={500}><ExpandMore sx={{ transform: 'rotate(180deg)' }} /></Link>
      </Fab>
    </ThemeProvider>
  );
}

export default App;