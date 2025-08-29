import React, { useState, useEffect } from 'react';
import SplashCursor from './components/SplashCursor';

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  IconButton,
  Drawer,
  List as MuiList,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Fab,
  Avatar,
  Link as MuiLink,
  useMediaQuery,
  TextField,
  Snackbar,
  Alert,
  Paper,
  Stack,
} from '@mui/material';

import {
  Email,
  Phone,
  LinkedIn,
  GitHub,
  School,
  Work,
  Code,
  VolunteerActivism,
  Menu as MenuIcon,
  ExpandMore,
  FileDownload,
  Brightness4,
  Brightness7,
  ArrowUpward,
  Facebook,
  WhatsApp,
  Instagram,
} from '@mui/icons-material';

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

import { motion } from 'framer-motion';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Helmet } from 'react-helmet';

// -------------------------
// Theme utility
// -------------------------
const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#0b5cff' },
      secondary: { main: '#00a86b' },
      background: { default: mode === 'light' ? '#f6f9ff' : '#0f1720' },
    },
    typography: {
      fontFamily: 'Inter, Roboto, system-ui, -apple-system, "Segoe UI", sans-serif',
      h3: { fontWeight: 700, fontSize: '2rem' },
      h4: { fontWeight: 600 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 6px 18px rgba(7,10,25,0.08)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            textTransform: 'none',
          },
        },
      },
    },
  });

const sections = [
  { id: 'home', label: 'Inicio' },
  { id: 'about', label: 'Sobre mí' },
  { id: 'education', label: 'Educación' },
  { id: 'skills', label: 'Habilidades' },
  { id: 'experience', label: 'Experiencia' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'volunteer', label: 'Voluntariado' },
  { id: 'contact', label: 'Contacto' },
];

// -------------------------
// Data (editable)
// -------------------------
const CONTACT = {
  phone: '+51963042699', // formato para wa.me
  displayPhone: '(+51) 963042699',
  email: 'jhonatan.h.salazar@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jhonatan-huamani-salazar-3224392b9/',
  github: 'https://github.com/Papiriqui',
  instagram: 'https://www.instagram.com/jhonatan_jrhs/', // <- reemplaza
  facebook: 'https://www.facebook.com/jhonatan.h.salazar/', // <- reemplaza
};

const PROJECTS = [
  { title: 'FASTFIT (2023)', desc: 'App móvil para citas médicas (React Native + Node)', link: 'https://github.com/Papiriqui/fastfit' },
  { title: 'CARTCOST (2024)', desc: 'Simulador de crédito vehicular (Angular + Java)', link: 'https://github.com/Papiriqui/cartcost' },
  { title: 'EDUPREDICT (2025)', desc: 'ML para predicción de deserción escolar', link: 'https://github.com/Papiriqui/edupredict' },
];

// -------------------------
// Small presentational pieces
// -------------------------
function Nav({ mode, toggleMode, onOpenDrawer }) {
  const isMdUp = useMediaQuery('(min-width:600px)');

  return (
    <AppBar position="fixed" color="primary" elevation={2} sx={{ backdropFilter: 'blur(6px)' }}>
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          {!isMdUp && (
            <IconButton edge="start" color="inherit" onClick={onOpenDrawer} aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Jhonatan Huamani
          </Typography>

          {isMdUp && (
            <Box sx={{ ml: 3, display: 'flex', gap: 1 }}>
              {sections.map((s) => (
                <Button key={s.id} color="inherit" size="small">
                  <ScrollLink to={s.id} smooth duration={500} offset={-80} style={{ cursor: 'pointer' }}>
                    {s.label}
                  </ScrollLink>
                </Button>
              ))}
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={toggleMode} color="inherit" aria-label="toggle theme">
            {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>
  );
}

function MobileDrawer({ open, onClose }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <MuiList sx={{ width: 260, py: 2 }}>
        {sections.map((s) => (
          <ListItem button key={s.id} onClick={onClose}>
            <ScrollLink to={s.id} smooth duration={400} offset={-80} style={{ width: '100%', color: 'inherit' }}>
              <ListItemText primary={s.label} />
            </ScrollLink>
          </ListItem>
        ))}
      </MuiList>
    </Drawer>
  );
}

// -------------------------
// Contact Card (improved)
// -------------------------
function ContactCard({ onSend }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const valid = name.trim() && email.trim() && message.trim();

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (!valid) {
      setError('Por favor completa todos los campos.');
      return;
    }

    setError(null);
    setLoading(true);

    // Simple reliable fallback: abrir el cliente de correo con mailto
    const subject = encodeURIComponent(`Contacto desde portafolio: ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}
Email: ${email}

${message}`);
    // Se puede reemplazar esto por una llamada fetch a Formspree / Netlify si el usuario proporciona endpoint
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setLoading(false);
      setName('');
      setEmail('');
      setMessage('');
      onSend && onSend();
    }, 700);
  };
}

// -------------------------
// Floating social icons
// -------------------------
function FloatingSocials() {
  const socials = [
    { id: 'facebook', icon: <Facebook sx={{color: '#005ec9ff'}}/>, href: CONTACT.facebook, label: 'Facebook' },
    { id: 'whatsapp', icon: <WhatsApp sx={{color: '#00B04D'}}/>, href: `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent('Hola!')}`, label: 'WhatsApp' },
    { id: 'instagram', icon: <Instagram sx={{color: '#cf4f00ff'}} />, href: CONTACT.instagram, label: 'Instagram' },
  ];

  return (
    <Box sx={{ position: 'fixed', right: 16, top: '40%', zIndex: 1300 }}>
      <Stack spacing={1} alignItems="center">
        {socials.map((s, i) => (
          <Box key={s.id} component="a" href={s.href} target="_blank" rel="noopener" aria-label={s.label} sx={{ textDecoration: 'none' }}>
            <IconButton
              size="large"
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 3,
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                borderRadius: '50%',
                width: 56,
                height: 56,
                color: 'text.primary',
              }}
            >
              {s.icon}
            </IconButton>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

// -------------------------
// Main App
// -------------------------
export default function App() {
  const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [mode, setMode] = useState(prefersDark ? 'dark' : 'light');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme-mode');
    if (saved) setMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const theme = React.useMemo(() => getTheme(mode), [mode]);
  const toggleMode = () => setMode((m) => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
            <SplashCursor />

      <CssBaseline />
      <Helmet>
        <title>Jhonatan Huamani — Portafolio</title>
        <meta name="description" content="Desarrollador Full-Stack | IA & Cloud" />
      </Helmet>

      <Nav mode={mode} toggleMode={toggleMode} onOpenDrawer={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Container maxWidth="lg" sx={{ mt: { xs: 9, sm: 11 }, mb: 6 }}>
        {/* HERO */}
        <Element name="home">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Card sx={{ p: { xs: 2, md: 3 }, mb: 4, display: 'flex', gap: 3, alignItems: 'center', bgcolor: 'transparent' }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Avatar
                    src="/foto.jpg"
                    alt="Jhonatan Huamani"
                    sx={{ width: { xs: 96, sm: 120 }, height: { xs: 96, sm: 120 }, border: '4px solid', borderColor: 'background.paper' }}
                    imgProps={{ loading: 'lazy' }}
                  />
                </Grid>

                <Grid item xs={12} md={9}>
                  <Typography variant="h3">Jhonatan Huamani Salazar</Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Desarrollador Full‑Stack • IA & Cloud Enthusiast
                  </Typography>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Button variant="contained" color="secondary" startIcon={<FileDownload />} href="/JHONATAN.pdf" download>
                      Descargar CV
                    </Button>
                    <Button variant="outlined" href={CONTACT.github} target="_blank" rel="noopener">GitHub</Button>
                    <Button variant="outlined" href={CONTACT.linkedin} target="_blank" rel="noopener">LinkedIn</Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </motion.div>
        </Element>

        {/* ABOUT */}
        <Element name="about">
          <Box sx={{ my: 3 }}>
            <Typography variant="h4" gutterBottom>Sobre mí</Typography>
            <Typography sx={{ mb: 2 }}>
              Estudiante de Ingeniería de Sistemas de Información (UPC). Me especializo en desarrollo web y móvil, soluciones basadas en IA y arquitecturas en la nube. Busco oportunidades para aplicar mis habilidades en proyectos reales que generen impacto.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><Phone /> <Typography>{CONTACT.displayPhone}</Typography></Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><Email /> <Typography>{CONTACT.email}</Typography></Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><LinkedIn /> <MuiLink href={CONTACT.linkedin} target="_blank" rel="noopener">Perfil</MuiLink></Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}><GitHub /> <MuiLink href={CONTACT.github} target="_blank" rel="noopener">Papiriqui</MuiLink></Box>
              </Grid>
            </Grid>
          </Box>
        </Element>

        {/* EDUCATION */}
        <Element name="education">
          <Box sx={{ my: 3 }}>
            <Typography variant="h4" gutterBottom>Educación</Typography>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>Ingeniería de Sistemas - UPC (2020 - 2025)</AccordionSummary>
              <AccordionDetails>Tercio Superior | Becario Pronabec</AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>Certificaciones</AccordionSummary>
              <AccordionDetails>
                <List>
                  <ListItem>Especialista en AWS (2024)</ListItem>
                  <ListItem>Analista en Azure (2024)</ListItem>
                  <ListItem>Machine Learning on Google Cloud (2023)</ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Element>

        {/* SKILLS */}
        <Element name="skills">
          <Box sx={{ my: 3 }}>
            <Typography variant="h4" gutterBottom>Habilidades</Typography>
            <Grid container spacing={2}>
              {[
                { title: 'Lenguajes', items: ['Python', 'C++', 'C#', 'JavaScript', 'Java'] },
                { title: 'Frameworks & Tools', items: ['React', 'Node.js', 'AWS', 'Azure', 'Postgres'] },
                { title: 'Data & ML', items: ['Pandas', 'scikit-learn', 'TensorFlow', 'GCP'] },
                { title: 'Soft Skills', items: ['Comunicación', 'Trabajo en equipo', 'Liderazgo'] },
              ].map((cat) => (
                <Grid item xs={12} sm={6} md={3} key={cat.title}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{cat.title}</Typography>
                      <Typography sx={{ mt: 1 }}>{cat.items.join(', ')}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Element>

        {/* EXPERIENCE */}
        <Element name="experience">
          <Box sx={{ my: 3 }}>
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
                  <Typography>Soporte a infraestructura, automatización con IA y desarrollo web.</Typography>
                </TimelineContent>
              </TimelineItem>

              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">2023</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot color="primary"><Work /></TimelineDot>
                </TimelineSeparator>
                <TimelineContent>
                  <Typography variant="h6">Compañía Food Retail S.A.C</Typography>
                  <Typography>Soporte a clientes y sistemas financieros.</Typography>
                </TimelineContent>
              </TimelineItem>
            </Timeline>
          </Box>
        </Element>

        {/* PROJECTS */}
        <Element name="projects">
          <Box sx={{ my: 3 }}>
            <Typography variant="h4" gutterBottom>Proyectos</Typography>
            <Grid container spacing={2}>
              {PROJECTS.map((p) => (
                <Grid item xs={12} sm={6} md={4} key={p.title}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{p.title}</Typography>
                      <Typography sx={{ mb: 2 }}>{p.desc}</Typography>
                      <Button variant="outlined" href={p.link} target="_blank" rel="noopener">Ver en GitHub</Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Element>

        {/* VOLUNTEER */}
        <Element name="volunteer">
          <Box sx={{ my: 3 }}>
            <Typography variant="h4" gutterBottom>Voluntariado</Typography>
            <Card>
              <CardContent>
                <Typography variant="h6">Pronabec - Talento Guía (Dic 2023 – Actual)</Typography>
                <Typography>Apoyo emocional a becarios, elaboración de reportes y mentoría académica.</Typography>
              </CardContent>
            </Card>
          </Box>
        </Element>

        {/* CONTACT (IMPROVED LAYOUT) */}
        <Element name="contact">
          <Box sx={{ my: 3 }}>
            <Typography variant="h4" gutterBottom>Contacto</Typography>
            <Grid >
              {/* Left: Contact Card Form */}
              <Grid item xs={12} md={7}>
                <ContactCard onSend={() => setSnackOpen(true)} />
              </Grid>

              {/* Right: Quick contact methods */}
              <Grid item xs={12} md={5}>
                <Card sx={{ p: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Contactos rápidos</Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>Elige una opción para comunicarte directamente.</Typography>

                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Phone />
                        </ListItemIcon>
                        <ListItemText primary={CONTACT.displayPhone} secondary="Llamada / WhatsApp" />
                        <Button variant="contained" size="small" href={`https://wa.me/${CONTACT.phone}?text=${encodeURIComponent('Hola!')}`} target="_blank">WhatsApp</Button>
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <Email />
                        </ListItemIcon>
                        <ListItemText primary={CONTACT.email} secondary="Correo" />
                        <Button variant="outlined" size="small" href={`mailto:${CONTACT.email}`}>Enviar email</Button>
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <LinkedIn />
                        </ListItemIcon>
                        <ListItemText primary="LinkedIn" secondary="Conectemos" />
                        <Button variant="outlined" size="small" href={CONTACT.linkedin} target="_blank">Perfil</Button>
                      </ListItem>

                      <ListItem>
                        <ListItemIcon>
                          <GitHub />
                        </ListItemIcon>
                        <ListItemText primary="GitHub" secondary="Mis proyectos" />
                        <Button variant="outlined" size="small" href={CONTACT.github} target="_blank">Ver</Button>
                      </ListItem>
                    </List>

                    <Paper sx={{ mt: 2, p: 2, bgcolor: 'background.default' }} elevation={0}>
                      <Typography variant="subtitle2">Horario de respuesta</Typography>
                      <Typography color="text.secondary">Usualmente respondo en 24-48 horas hábiles.</Typography>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </Element>
      </Container>

      {/* Floating Socials + Footer + Snackbar */}
      <FloatingSocials />

      <Box component="footer" sx={{ py: 4, textAlign: 'center', bgcolor: 'transparent' }}>
        <Typography variant="body2">© {new Date().getFullYear()} Jhonatan Huamani — Hecho con React</Typography>
      </Box>

      <Fab
        color="secondary"
        aria-label="scroll-top"
        sx={{ position: 'fixed', bottom: 20, right: 20 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUpward />
      </Fab>

      <Snackbar open={snackOpen} autoHideDuration={4000} onClose={() => setSnackOpen(false)}>
        <Alert severity="success" onClose={() => setSnackOpen(false)} sx={{ width: '100%' }}>
          Se abrió tu cliente de correo. Revisa tu bandeja para enviar el mensaje.
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
