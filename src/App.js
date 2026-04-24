import React, { useState, useRef, useEffect } from 'react';
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
  Chip,
} from '@mui/material';

import {
  Email,
  Phone,
  LinkedIn,
  GitHub,
  Work,
  Menu as MenuIcon,
  ExpandMore,
  FileDownload,
  Brightness4,
  Brightness7,
  ArrowUpward,
  WhatsApp,
  Instagram,
  Facebook,
  OpenInNew,
  Article,
  AutoAwesome,
  Psychology,
  Cloud,
  Code,
  Close,
  Send,
  SmartToy,
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
// Theme
// -------------------------
const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#4f46e5' },
      secondary: { main: '#06b6d4' },
      background: { default: mode === 'light' ? '#f1f5f9' : '#0d1117' },
    },
    typography: {
      fontFamily: 'Inter, Roboto, system-ui, -apple-system, "Segoe UI", sans-serif',
      h3: { fontWeight: 800, fontSize: '2.2rem' },
      h4: { fontWeight: 700 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: mode === 'dark'
              ? '0 4px 24px rgba(0,0,0,0.4)'
              : '0 4px 24px rgba(79,70,229,0.08)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: { borderRadius: 10, textTransform: 'none', fontWeight: 600 },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 8, fontWeight: 500 },
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
  { id: 'publications', label: 'Publicaciones' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'volunteer', label: 'Voluntariado' },
  { id: 'contact', label: 'Contacto' },
];

const CONTACT = {
  phone: '+51963042699',
  displayPhone: '(+51) 963042699',
  email: 'jhonatan.h.salazar@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jhonatan-huamani-salazar-3224392b9/',
  github: 'https://github.com/Papiriqui',
  instagram: 'https://www.instagram.com/jhonatan_jrhs/',
  facebook: 'https://www.facebook.com/jhonatan.h.salazar/',
};

const SKILLS = [
  {
    title: 'IA & Machine Learning',
    icon: <Psychology fontSize="small" />,
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.1)',
    items: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'LLMs', 'RAG', 'NLP', 'OCR', 'Embeddings'],
  },
  {
    title: 'Backend',
    icon: <Code fontSize="small" />,
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.1)',
    items: ['Python', 'Django', 'Flask', 'Node.js', 'REST APIs', 'Microservicios', 'JavaScript'],
  },
  {
    title: 'Frontend',
    icon: <AutoAwesome fontSize="small" />,
    color: '#059669',
    bg: 'rgba(5,150,105,0.1)',
    items: ['React', 'Next.js', 'Flutter'],
  },
  {
    title: 'Cloud & Bases de Datos',
    icon: <Cloud fontSize="small" />,
    color: '#d97706',
    bg: 'rgba(217,119,6,0.1)',
    items: ['AWS', 'GCP', 'Azure', 'PostgreSQL', 'MongoDB Atlas', 'Zilliz (Vector DB)', 'SQL Server'],
  },
];

const PROJECTS = [
  {
    title: 'EDUPREDICT',
    year: '2025',
    desc: 'Sistema de ML para predecir deserción escolar con modelos entrenados e integración cloud.',
    tags: ['React', 'Django', 'PostgreSQL', 'AWS', 'Machine Learning'],
    link: 'https://github.com/Papiriqui/edupredict',
    highlight: true,
  },
  {
    title: 'CORSN',
    year: '2025',
    desc: 'Plataforma con búsqueda semántica, embeddings y base vectorial en Zilliz Cloud.',
    tags: ['Next.js', 'Node.js', 'LLMs', 'Zilliz', 'Vector DB'],
    link: 'https://github.com/Papiriqui',
    highlight: true,
  },
  {
    title: 'FASTFIT',
    year: '2024',
    desc: 'App en tiempo real para gestión de citas médicas con notificaciones y roles.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    link: 'https://github.com/Papiriqui/fastfit',
    highlight: false,
  },
  {
    title: 'CASHALINSTANTE',
    year: '2024',
    desc: 'Sistema web de préstamos con cálculo de cuotas, historial y gestión de usuarios.',
    tags: ['Flask', 'PostgreSQL', 'Python'],
    link: 'https://github.com/Papiriqui',
    highlight: false,
  },
];

const PUBLICATIONS = [
  {
    title: 'Publicación científica — IEEE Xplore',
    desc: 'Artículo de investigación indexado en IEEE, relacionado con inteligencia artificial y sistemas de información.',
    link: 'https://ieeexplore.ieee.org/document/11443270',
    year: '2025',
  },
];

// -------------------------
// Section header helper
// -------------------------
function SectionHeading({ children }) {
  return (
    <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box sx={{ width: 5, height: 32, bgcolor: 'primary.main', borderRadius: 2, flexShrink: 0 }} />
      <Typography variant="h4">{children}</Typography>
    </Box>
  );
}

// -------------------------
// Nav
// -------------------------
function Nav({ mode, toggleMode, onOpenDrawer }) {
  const isMdUp = useMediaQuery('(min-width:768px)');

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: mode === 'dark' ? 'rgba(13,17,23,0.85)' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexGrow: 1 }}>
          {!isMdUp && (
            <IconButton edge="start" color="inherit" onClick={onOpenDrawer} aria-label="menu">
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Psychology sx={{ color: '#fff', fontSize: 18 }} />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
              JH<Typography component="span" variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>.</Typography>
            </Typography>
          </Box>

          {isMdUp && (
            <Box sx={{ ml: 2, display: 'flex', gap: 0.5 }}>
              {sections.map((s) => (
                <Button key={s.id} color="inherit" size="small" sx={{ fontSize: '0.8rem', px: 1.5 }}>
                  <ScrollLink to={s.id} smooth duration={500} offset={-80} style={{ cursor: 'pointer' }}>
                    {s.label}
                  </ScrollLink>
                </Button>
              ))}
            </Box>
          )}
        </Box>

        <IconButton onClick={toggleMode} color="inherit" aria-label="toggle theme">
          {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
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
// Contact Card
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
    const subject = encodeURIComponent(`Contacto desde portafolio: ${name}`);
    const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setLoading(false);
      setName('');
      setEmail('');
      setMessage('');
      onSend && onSend();
    }, 700);
  };

  return (
    <Card sx={{ p: 1 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Envíame un mensaje</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Nombre" value={name} onChange={(e) => setName(e.target.value)} fullWidth required size="small" />
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required size="small" />
          <TextField label="Mensaje" value={message} onChange={(e) => setMessage(e.target.value)} fullWidth required multiline rows={4} size="small" />
          <Button type="submit" variant="contained" disabled={loading || !valid} size="large">
            {loading ? 'Enviando...' : 'Enviar mensaje'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

// -------------------------
// Floating Socials
// -------------------------
function FloatingSocials() {
  const socials = [
    { id: 'facebook', icon: <Facebook sx={{ color: '#1877f2' }} />, href: CONTACT.facebook, label: 'Facebook' },
    { id: 'whatsapp', icon: <WhatsApp sx={{ color: '#25d366' }} />, href: `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent('Hola!')}`, label: 'WhatsApp' },
    { id: 'instagram', icon: <Instagram sx={{ color: '#e1306c' }} />, href: CONTACT.instagram, label: 'Instagram' },
  ];

  return (
    <Box sx={{ position: 'fixed', right: 16, top: '40%', zIndex: 1300 }}>
      <Stack spacing={1} alignItems="center">
        {socials.map((s) => (
          <Box key={s.id} component="a" href={s.href} target="_blank" rel="noopener" aria-label={s.label} sx={{ textDecoration: 'none' }}>
            <IconButton
              size="large"
              sx={{
                bgcolor: 'background.paper',
                boxShadow: 3,
                '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
                transition: 'all 0.2s',
                borderRadius: '50%',
                width: 48,
                height: 48,
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
// Chatbot
// -------------------------
const BOT_QA = [
  { triggers: ['hola', 'hey', 'buenas', 'saludos', 'hi'], answer: '¡Hola! ¿En qué te puedo ayudar? Puedo contarte sobre la experiencia, habilidades, proyectos o cómo contactar a Jhonatan.' },
  { triggers: ['trabaja', 'empresa', 'trabajo', 'experiencia', 'labora', 'actual', 'keola'], answer: 'Actualmente es AI Engineer y Líder Técnico de IA en KEOLA NETWORKS (2025–presente). Antes trabajó en SUNAT (2024–2025) en Infraestructura & AI.' },
  { triggers: ['habilidades', 'tecnologia', 'stack', 'sabe', 'conoce', 'skills', 'domina'], answer: 'Domina ML, Deep Learning, Computer Vision, LLMs y RAG. Backend: Python, Django, Flask, Node.js. Cloud: AWS, GCP, Azure. Bases vectoriales: Zilliz. También MongoDB Atlas y PostgreSQL.' },
  { triggers: ['proyecto', 'proyectos', 'hizo', 'desarrollo'], answer: 'Sus proyectos destacados: EDUPREDICT (ML para deserción escolar), CORSN (búsqueda semántica con LLMs), FASTFIT (app de citas médicas) y CASHALINSTANTE (sistema de préstamos web).' },
  { triggers: ['contacto', 'contactar', 'email', 'correo', 'whatsapp', 'mensaje', 'escribir'], answer: `Contacta a Jhonatan por email: ${CONTACT.email} o por WhatsApp: ${CONTACT.displayPhone}. También puedes conectarte en LinkedIn.` },
  { triggers: ['publicacion', 'ieee', 'paper', 'articulo', 'investigacion'], answer: 'Publicó un artículo científico en IEEE Xplore (2025) relacionado con inteligencia artificial. Puedes verlo en la sección de Publicaciones del portafolio.' },
  { triggers: ['educacion', 'universidad', 'upc', 'carrera', 'estudios', 'estudio'], answer: 'Estudió Ingeniería de Sistemas de Información en la UPC (2020–2025), tercio superior y becario PRONABEC. Con énfasis en Seguridad de la Información e IA.' },
  { triggers: ['certificacion', 'aws', 'ibm', 'google', 'certificado'], answer: 'Certificaciones: AWS Cloud Practitioner, Analista de Ciberseguridad (IBM) y Machine Learning on Google Cloud.' },
  { triggers: ['cv', 'curriculum', 'descargar', 'hoja de vida', 'resume'], answer: 'Descarga el CV desde el botón "Descargar CV" en la parte superior del portafolio.' },
  { triggers: ['llm', 'rag', 'ia', 'inteligencia artificial', 'machine learning', 'computer vision'], answer: 'Jhonatan trabaja con LLMs y RAG para automatización y análisis de texto, Computer Vision para validación de identidad y análisis de documentos, integrando modelos en producción con APIs escalables.' },
  { triggers: ['sunat'], answer: 'En SUNAT (2024–2025) implementó infraestructura en AWS (EC2, S3, RDS, EKS, DynamoDB), automatizó procesos con ML y desplegó modelos en GCP.' },
  { triggers: ['pronabec', 'beca', 'becario'], answer: 'Jhonatan es becario de PRONABEC, una beca de excelencia académica del gobierno peruano. También participa como Talento Guía apoyando a otros becarios.' },
];

function normalize(s) {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function getBotResponse(text) {
  const n = normalize(text);
  for (const qa of BOT_QA) {
    if (qa.triggers.some((t) => n.includes(normalize(t)))) return qa.answer;
  }
  return `No tengo info específica sobre eso, pero puedes contactar a Jhonatan directamente en ${CONTACT.email} o revisar las secciones del portafolio.`;
}

const SUGGESTIONS = ['¿En qué trabaja ahora?', '¿Cuáles son sus habilidades?', '¿Cómo contactarlo?', '¿Qué proyectos tiene?'];

function Chatbot({ mode }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! 👋 Soy el asistente de Jhonatan. Pregúntame sobre su experiencia, proyectos, habilidades o cómo contactarlo.' },
  ]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const endRef = useRef(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { from: 'user', text },
      { from: 'bot', text: getBotResponse(text) },
    ]);
    setShowSuggestions(false);
    setInput('');
  };

  return (
    <>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.22 }}
          style={{ position: 'fixed', bottom: 88, left: 24, width: 340, maxWidth: 'calc(100vw - 48px)', zIndex: 1400 }}
        >
          <Paper
            elevation={10}
            sx={{ borderRadius: 4, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}
          >
            {/* Header */}
            <Box sx={{ p: 2, background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar sx={{ width: 36, height: 36, bgcolor: 'rgba(255,255,255,0.2)' }}>
                <SmartToy sx={{ fontSize: 20, color: '#fff' }} />
              </Avatar>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.2 }}>Asistente IA</Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.8)' }}>Pregúntame sobre Jhonatan</Typography>
              </Box>
              <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: 'rgba(255,255,255,0.9)' }}>
                <Close fontSize="small" />
              </IconButton>
            </Box>

            {/* Messages */}
            <Box sx={{ height: 260, overflowY: 'auto', p: 2, bgcolor: mode === 'dark' ? '#0d1117' : '#f8fafc', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {messages.map((msg, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Box
                    sx={{
                      maxWidth: '82%',
                      px: 2,
                      py: 1,
                      borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      bgcolor: msg.from === 'user' ? 'primary.main' : mode === 'dark' ? 'rgba(255,255,255,0.07)' : '#fff',
                      color: msg.from === 'user' ? '#fff' : 'text.primary',
                      boxShadow: msg.from === 'bot' ? 1 : 0,
                    }}
                  >
                    <Typography variant="body2" sx={{ lineHeight: 1.5 }}>{msg.text}</Typography>
                  </Box>
                </Box>
              ))}
              <div ref={endRef} />
            </Box>

            {/* Suggestions */}
            {showSuggestions && (
              <Box sx={{ px: 2, pb: 1, display: 'flex', flexWrap: 'wrap', gap: 0.8, bgcolor: mode === 'dark' ? '#0d1117' : '#f8fafc' }}>
                {SUGGESTIONS.map((s) => (
                  <Chip key={s} label={s} size="small" clickable onClick={() => sendMessage(s)}
                    sx={{ fontSize: '0.7rem', bgcolor: 'rgba(79,70,229,0.1)', color: 'primary.main', cursor: 'pointer' }} />
                ))}
              </Box>
            )}

            {/* Input */}
            <Box sx={{ p: 1.5, borderTop: '1px solid', borderColor: 'divider', display: 'flex', gap: 1, bgcolor: 'background.paper' }}>
              <TextField
                size="small"
                fullWidth
                placeholder="Escribe tu pregunta..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(input); }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, fontSize: '0.85rem' } }}
              />
              <IconButton
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                size="small"
                sx={{
                  bgcolor: 'primary.main',
                  color: '#fff',
                  borderRadius: 2,
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  '&:hover': { bgcolor: 'primary.dark' },
                  '&.Mui-disabled': { bgcolor: 'action.disabledBackground', color: 'action.disabled' },
                }}
              >
                <Send sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Paper>
        </motion.div>
      )}

      {/* Bubble */}
      <Box sx={{ position: 'fixed', bottom: 24, left: 24, zIndex: 1300 }}>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}>
          <Fab
            onClick={() => setOpen((o) => !o)}
            aria-label="chat asistente"
            sx={{
              background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(79,70,229,0.45)',
              '&:hover': { opacity: 0.92 },
            }}
          >
            {open ? <Close /> : <SmartToy />}
          </Fab>
        </motion.div>
        {!open && (
          <Box sx={{ position: 'absolute', top: 2, right: 2, width: 12, height: 12, borderRadius: '50%', bgcolor: '#10b981', border: '2px solid', borderColor: 'background.default' }} />
        )}
      </Box>
    </>
  );
}

// -------------------------
// Animation wrapper
// -------------------------
function FadeIn({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  );
}

// -------------------------
// Main App
// -------------------------
export default function App() {
  const prefersDark = typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved || (prefersDark ? 'dark' : 'light');
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  const theme = React.useMemo(() => getTheme(mode), [mode]);
  const toggleMode = () => {
    setMode((m) => {
      const next = m === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme-mode', next);
      return next;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <SplashCursor />
      <CssBaseline />
      <Helmet>
        <title>Jhonatan Huamani — AI Engineer</title>
        <meta name="description" content="AI Engineer especializado en Machine Learning, LLMs, Computer Vision y Cloud." />
      </Helmet>

      <Nav mode={mode} toggleMode={toggleMode} onOpenDrawer={() => setDrawerOpen(true)} />
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      <Container maxWidth="lg" sx={{ mt: { xs: 9, sm: 11 }, mb: 8, position: 'relative', zIndex: 1 }}>

        {/* ── HERO ── */}
        <Element name="home">
          <FadeIn>
            <Card
              sx={{
                mb: 5,
                p: { xs: 3, md: 5 },
                background: mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(79,70,229,0.18) 0%, rgba(6,182,212,0.08) 100%)'
                  : 'linear-gradient(135deg, rgba(79,70,229,0.07) 0%, rgba(6,182,212,0.05) 100%)',
                border: '1px solid',
                borderColor: mode === 'dark' ? 'rgba(79,70,229,0.3)' : 'rgba(79,70,229,0.15)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* decorative circles */}
              <Box sx={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(79,70,229,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
              <Box sx={{ position: 'absolute', bottom: -40, left: -40, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                  <Box sx={{ position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        inset: -4,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                        zIndex: 0,
                      }}
                    />
                    <Avatar
                      src={`${process.env.PUBLIC_URL}/img/foto.jpg`}
                      alt="Jhonatan Huamani"
                      sx={{
                        width: { xs: 110, sm: 140 },
                        height: { xs: 110, sm: 140 },
                        border: '4px solid',
                        borderColor: 'background.default',
                        position: 'relative',
                        zIndex: 1,
                      }}
                      imgProps={{ loading: 'lazy' }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 4,
                        right: 4,
                        zIndex: 2,
                        bgcolor: '#10b981',
                        borderRadius: '50%',
                        width: 16,
                        height: 16,
                        border: '2px solid',
                        borderColor: 'background.default',
                        boxShadow: '0 0 0 3px rgba(16,185,129,0.3)',
                        animation: 'pulse 2s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { boxShadow: '0 0 0 3px rgba(16,185,129,0.3)' },
                          '50%': { boxShadow: '0 0 0 6px rgba(16,185,129,0.1)' },
                        },
                      }}
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={9}>
                  <Typography variant="h3" sx={{ mb: 0.5, textAlign: { xs: 'center', md: 'left' } }}>
                    Jhonatan Huamani Salazar
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      textAlign: { xs: 'center', md: 'left' },
                      background: 'linear-gradient(90deg, #4f46e5, #06b6d4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      fontWeight: 700,
                    }}
                  >
                    AI Engineer | Machine Learning · LLMs · Computer Vision
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    {['Machine Learning', 'Deep Learning', 'Computer Vision', 'LLMs / RAG', 'AWS · GCP · Azure'].map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: mode === 'dark' ? 'rgba(79,70,229,0.2)' : 'rgba(79,70,229,0.1)',
                          color: 'primary.main',
                          border: '1px solid',
                          borderColor: 'rgba(79,70,229,0.3)',
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' } }}>
                    <Button
                      variant="contained"
                      startIcon={<FileDownload />}
                      href="/JHONATAN.pdf"
                      download
                      sx={{ background: 'linear-gradient(90deg, #4f46e5, #06b6d4)', '&:hover': { opacity: 0.9 } }}
                    >
                      Descargar CV
                    </Button>
                    <Button variant="outlined" startIcon={<GitHub />} href={CONTACT.github} target="_blank" rel="noopener">
                      GitHub
                    </Button>
                    <Button variant="outlined" startIcon={<LinkedIn />} href={CONTACT.linkedin} target="_blank" rel="noopener" color="secondary">
                      LinkedIn
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </FadeIn>
        </Element>

        {/* ── ABOUT ── */}
        <Element name="about">
          <FadeIn>
            <Box sx={{ my: 4 }}>
              <SectionHeading>Sobre mí</SectionHeading>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography sx={{ mb: 2.5, lineHeight: 1.8, fontSize: '1.05rem' }}>
                    Ingeniero de Sistemas de Información de la <strong>Universidad Peruana de Ciencias Aplicadas</strong> (tercio superior y becario de PRONABEC), enfocado en el desarrollo de soluciones de Inteligencia Artificial llevadas a producción.
                  </Typography>
                  <Typography sx={{ lineHeight: 1.8 }} color="text.secondary">
                    Especializado en <strong>Machine Learning, Deep Learning, Computer Vision y LLMs (RAG)</strong>, desarrollando APIs escalables e integrando modelos en arquitecturas cloud (AWS, GCP, Azure). Experiencia en sistemas de validación de identidad, análisis de documentos y automatización inteligente.
                  </Typography>

                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    {[
                      { icon: <Phone sx={{ color: 'primary.main' }} />, text: CONTACT.displayPhone },
                      { icon: <Email sx={{ color: 'primary.main' }} />, text: CONTACT.email },
                      { icon: <LinkedIn sx={{ color: 'primary.main' }} />, text: 'LinkedIn', href: CONTACT.linkedin },
                      { icon: <GitHub sx={{ color: 'primary.main' }} />, text: 'Papiriqui', href: CONTACT.github },
                    ].map((item, i) => (
                      <Grid item xs={12} sm={6} md={3} key={i}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          {item.icon}
                          {item.href
                            ? <MuiLink href={item.href} target="_blank" rel="noopener">{item.text}</MuiLink>
                            : <Typography variant="body2">{item.text}</Typography>
                          }
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </FadeIn>
        </Element>

        {/* ── EDUCATION ── */}
        <Element name="education">
          <FadeIn>
            <Box sx={{ my: 4 }}>
              <SectionHeading>Educación</SectionHeading>
              <Accordion defaultExpanded sx={{ mb: 1.5, borderRadius: '16px !important', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box>
                    <Typography fontWeight={700}>Ingeniería de Sistemas de Información — UPC</Typography>
                    <Typography variant="body2" color="text.secondary">2020 – 2025 · Tercio Superior · Becario PRONABEC</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Especialización en <strong>Seguridad de la Información & Inteligencia Artificial</strong>. Tercio superior de la carrera, becario de PRONABEC (beca de excelencia académica).</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion sx={{ borderRadius: '16px !important', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Box>
                    <Typography fontWeight={700}>Certificaciones</Typography>
                    <Typography variant="body2" color="text.secondary">AWS · IBM · Google Cloud</Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={1.5}>
                    {[
                      { label: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2024', color: '#f97316' },
                      { label: 'Analista de Ciberseguridad', issuer: 'IBM', year: '2024', color: '#3b82f6' },
                      { label: 'Machine Learning on Google Cloud', issuer: 'Google Cloud', year: '2023', color: '#10b981' },
                    ].map((cert) => (
                      <Grid item xs={12} sm={6} md={4} key={cert.label}>
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderLeft: `4px solid ${cert.color}`,
                          }}
                        >
                          <Typography fontWeight={700} fontSize="0.9rem">{cert.label}</Typography>
                          <Typography variant="caption" color="text.secondary">{cert.issuer} · {cert.year}</Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>
          </FadeIn>
        </Element>

        {/* ── SKILLS ── */}
        <Element name="skills">
          <FadeIn>
            <Box sx={{ my: 4 }}>
              <SectionHeading>Habilidades</SectionHeading>
              <Grid container spacing={2} alignItems="stretch">
                {SKILLS.map((cat) => (
                  <Grid item xs={12} sm={6} md={3} key={cat.title} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Card sx={{ height: '100%' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Box sx={{ p: 0.8, borderRadius: 2, bgcolor: cat.bg, color: cat.color, display: 'flex' }}>
                            {cat.icon}
                          </Box>
                          <Typography variant="subtitle1" fontWeight={700}>{cat.title}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                          {cat.items.map((item) => (
                            <Chip
                              key={item}
                              label={item}
                              size="small"
                              sx={{ bgcolor: cat.bg, color: cat.color, fontSize: '0.75rem' }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </FadeIn>
        </Element>

        {/* ── EXPERIENCE ── */}
        <Element name="experience">
          <FadeIn>
            <Box sx={{ my: 4 }}>
              <SectionHeading>Experiencia</SectionHeading>
              <Timeline position="right" sx={{ pl: 0, '& .MuiTimelineItem-root:before': { flex: 0, padding: 0 } }}>

                {/* KEOLA - actual */}
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot
                      sx={{
                        background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                        boxShadow: '0 0 0 4px rgba(79,70,229,0.2)',
                      }}
                    >
                      <Work sx={{ fontSize: 18 }} />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ pb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
                      <Typography variant="h6" fontWeight={700}>AI Engineer / Líder Técnico de IA</Typography>
                      <Chip label="Actual" size="small" sx={{ bgcolor: '#10b981', color: '#fff', fontWeight: 700, animation: 'pulse 2s ease-in-out infinite', '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.7 } } }} />
                    </Box>
                    <Typography variant="subtitle2" color="primary.main" fontWeight={700} sx={{ mb: 1 }}>
                      KEOLA NETWORKS S.A · 2025 – Actual
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2.5, '& li': { mb: 0.5 } }}>
                      <Typography component="li" variant="body2">Liderazgo del desarrollo de soluciones de IA en microservicios con foco en escalabilidad.</Typography>
                      <Typography component="li" variant="body2">APIs de ML con Computer Vision, OCR, embeddings y búsqueda semántica.</Typography>
                      <Typography component="li" variant="body2">Diseño de soluciones con LLMs (RAG, NLP) para automatización y análisis de texto.</Typography>
                      <Typography component="li" variant="body2">Despliegue en AWS y Azure, integración con MongoDB Atlas y Zilliz (Vector DB).</Typography>
                      <Typography component="li" variant="body2">Pipelines de datos para procesamiento de información no estructurada en tiempo real.</Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>

                {/* SUNAT */}
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary"><Work sx={{ fontSize: 18 }} /></TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ pb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>Infraestructura & AI</Typography>
                    <Typography variant="subtitle2" color="primary.main" fontWeight={700} sx={{ mb: 1 }}>
                      SUNAT · Abril 2024 – Julio 2025
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 2.5, '& li': { mb: 0.5 } }}>
                      <Typography component="li" variant="body2">Implementación de infraestructura en AWS (EC2, S3, RDS, EKS, DynamoDB).</Typography>
                      <Typography component="li" variant="body2">Automatización de procesos y desarrollo de soluciones con Machine Learning.</Typography>
                      <Typography component="li" variant="body2">Despliegue de modelos en Google Cloud Platform (GCP).</Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>

                {/* Food Retail */}
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="inherit"><Work sx={{ fontSize: 18 }} /></TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent sx={{ pb: 3 }}>
                    <Typography variant="h6" fontWeight={700}>Soporte Técnico</Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                      Food Retail S.A.C · 2023
                    </Typography>
                    <Typography variant="body2">Soporte a clientes y sistemas financieros internos.</Typography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
          </FadeIn>
        </Element>

        {/* ── PUBLICATIONS ── */}
        <Element name="publications">
          <FadeIn>
            <Box sx={{ my: 4 }}>
              <SectionHeading>Publicaciones</SectionHeading>
              {PUBLICATIONS.map((pub) => (
                <Card key={pub.title} sx={{ mb: 2 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          background: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(6,182,212,0.1))',
                          flexShrink: 0,
                        }}
                      >
                        <Article sx={{ color: 'primary.main', fontSize: 28 }} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, flexWrap: 'wrap' }}>
                          <Typography variant="h6" fontWeight={700}>{pub.title}</Typography>
                          <Chip label="IEEE Xplore" size="small" sx={{ bgcolor: 'rgba(79,70,229,0.12)', color: 'primary.main', fontWeight: 700 }} />
                          <Chip label={pub.year} size="small" variant="outlined" />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                          {pub.desc}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<OpenInNew />}
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver en IEEE Xplore
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </FadeIn>
        </Element>

        {/* ── PROJECTS ── */}
        <Element name="projects">
          <FadeIn>
            <Box sx={{ my: 4 }}>
              <SectionHeading>Proyectos</SectionHeading>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
                  gridAutoRows: '270px',
                  gap: 2.5,
                }}
              >
                {PROJECTS.map((p, i) => (
                  <motion.div
                    key={p.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    style={{ display: 'flex' }}
                  >
                    <Card
                      sx={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        border: p.highlight ? '1px solid' : undefined,
                        borderColor: p.highlight ? 'rgba(79,70,229,0.3)' : undefined,
                        '&:hover': { transform: 'translateY(-4px)', transition: 'transform 0.2s' },
                      }}
                    >
                      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="h6" fontWeight={700}>{p.title}</Typography>
                          <Typography variant="caption" color="text.secondary">{p.year}</Typography>
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1.5,
                            flex: 1,
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                          }}
                        >
                          {p.desc}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mb: 1.5 }}>
                          {p.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ fontSize: '0.7rem', height: 22 }} />
                          ))}
                        </Box>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<GitHub />}
                          href={p.link}
                          target="_blank"
                          rel="noopener"
                          fullWidth
                          sx={{ mt: 'auto' }}
                        >
                          Ver en GitHub
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </FadeIn>
        </Element>

        {/* ── VOLUNTEER ── */}
        <Element name="volunteer">
          <FadeIn>
            <Box sx={{ my: 4 }}>
              <SectionHeading>Voluntariado</SectionHeading>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box sx={{ p: 1.2, borderRadius: 2.5, bgcolor: 'rgba(16,185,129,0.1)', flexShrink: 0 }}>
                      <AutoAwesome sx={{ color: '#10b981' }} />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700}>Talento Guía</Typography>
                      <Typography variant="subtitle2" color="secondary.main" fontWeight={700}>PRONABEC · Diciembre 2023 – Actual</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Apoyo emocional a becarios, elaboración de reportes y mentoría académica a estudiantes del programa.
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </FadeIn>
        </Element>

        {/* ── CONTACT ── */}
        <Element name="contact">
          <FadeIn>
            <Box sx={{ my: 4 }}>
              <SectionHeading>Contacto</SectionHeading>

              {/* Banner */}
              <Box
                sx={{
                  mb: 3,
                  p: { xs: 3, md: 4 },
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 2,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box sx={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
                <Box>
                  <Typography variant="h5" sx={{ color: '#fff', fontWeight: 800, mb: 0.5 }}>
                    ¿Tienes un proyecto en mente?
                  </Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}>
                    Estoy disponible para colaboraciones, proyectos de IA o nuevas oportunidades.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  href={`mailto:${CONTACT.email}`}
                  startIcon={<Email />}
                  sx={{ bgcolor: '#fff', color: '#4f46e5', fontWeight: 700, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }, flexShrink: 0 }}
                >
                  Escribir email
                </Button>
              </Box>

              <Grid container spacing={3}>
                {/* Form */}
                <Grid item xs={12} md={7}>
                  <ContactCard onSend={() => setSnackOpen(true)} mode={mode} />
                </Grid>

                {/* Quick links */}
                <Grid item xs={12} md={5}>
                  <Stack spacing={1.5} sx={{ height: '100%' }}>
                    {[
                      {
                        icon: <WhatsApp />,
                        label: 'WhatsApp',
                        value: CONTACT.displayPhone,
                        href: `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent('Hola!')}`,
                        gradient: 'linear-gradient(135deg, #25d366, #128c7e)',
                      },
                      {
                        icon: <Email />,
                        label: 'Email',
                        value: CONTACT.email,
                        href: `mailto:${CONTACT.email}`,
                        gradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                      },
                      {
                        icon: <LinkedIn />,
                        label: 'LinkedIn',
                        value: 'Jhonatan Huamani Salazar',
                        href: CONTACT.linkedin,
                        gradient: 'linear-gradient(135deg, #0077b5, #00a0dc)',
                      },
                      {
                        icon: <GitHub />,
                        label: 'GitHub',
                        value: 'Papiriqui',
                        href: CONTACT.github,
                        gradient: 'linear-gradient(135deg, #24292e, #586069)',
                      },
                    ].map((item) => (
                      <Box
                        key={item.label}
                        component="a"
                        href={item.href}
                        target="_blank"
                        rel="noopener"
                        sx={{ textDecoration: 'none' }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            borderRadius: 3,
                            border: '1px solid',
                            borderColor: 'divider',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': {
                              transform: 'translateX(4px)',
                              borderColor: 'primary.main',
                              boxShadow: 2,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              borderRadius: 2.5,
                              background: item.gradient,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              flexShrink: 0,
                            }}
                          >
                            {item.icon}
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                              {item.label}
                            </Typography>
                            <Typography variant="body2" fontWeight={600} noWrap>
                              {item.value}
                            </Typography>
                          </Box>
                          <OpenInNew sx={{ ml: 'auto', fontSize: 16, color: 'text.disabled', flexShrink: 0 }} />
                        </Paper>
                      </Box>
                    ))}

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                        borderRadius: 3,
                        background: mode === 'dark'
                          ? 'linear-gradient(135deg, rgba(79,70,229,0.12), rgba(6,182,212,0.06))'
                          : 'linear-gradient(135deg, rgba(79,70,229,0.06), rgba(6,182,212,0.04))',
                        border: '1px dashed',
                        borderColor: 'rgba(79,70,229,0.3)',
                        mt: 'auto',
                      }}
                    >
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', fontWeight: 600 }}>
                        Tiempo de respuesta
                      </Typography>
                      <Typography variant="body2" color="primary.main" fontWeight={700}>
                        24–48 horas hábiles
                      </Typography>
                    </Paper>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </FadeIn>
        </Element>
      </Container>

      <FloatingSocials />
      <Chatbot mode={mode} />

      <Box
        component="footer"
        sx={{
          py: 4,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'transparent',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Jhonatan Huamani Salazar · AI Engineer
        </Typography>
      </Box>

      <Fab
        aria-label="scroll-top"
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
          color: '#fff',
          '&:hover': { opacity: 0.9 },
        }}
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
