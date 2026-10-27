
import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  TextField,
  Stack,
  Divider,
  Paper,
  Chip,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Badge,
  Fab,
  Snackbar,
  Alert,
} from "@mui/material";

import {
  Menu,
  Close,
  Computer,
  School,
  Science,
  Lightbulb,
  SmartToy,
  Psychology,
  Security,
  Public,
  Storage,
  Cloud,
  Code,
  Settings,
  MenuBook,
  Wifi,
  LocationOn,
  Phone,
  Email,
  Language,
  LinkedIn,
  YouTube,
  GitHub,
  ExpandMore,
  ArrowForward,
  KeyboardArrowUp,
  DarkMode,
  LightMode,
  Groups,
  EmojiEvents,
  TrendingUp,
  CalendarMonth,
  AutoAwesome,
  Send,
  CheckCircle,
} from "@mui/icons-material";

const NAVY = "#123b69";
const DARK_NAVY = "#071a2d";
const ORANGE = "#e67e22";
const LIGHT_BG = "#f5f7fb";
const TEXT = "#334155";

const navLinks = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Academics", "#academics"],
  ["Faculty", "#faculty"],
  ["Research", "#research"],
  ["Facilities", "#facilities"],
  ["Contact", "#contact"],
];

function SectionTitle({ label, title, subtitle, light = false }) {
  return (
    <Box sx={{ textAlign: "center", mb: 6 }}>
      <Chip
        label={label}
        sx={{
          mb: 2,
          backgroundColor: light
            ? "rgba(230,126,34,0.15)"
            : "rgba(230,126,34,0.1)",
          color: ORANGE,
          fontWeight: "bold",
          letterSpacing: 2,
        }}
      />

      <Typography
        sx={{
          fontSize: { xs: 30, md: 42 },
          fontWeight: 800,
          color: light ? "#fff" : NAVY,
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          sx={{
            mt: 1.5,
            maxWidth: 700,
            mx: "auto",
            color: light ? "#cbd5e1" : "#64748b",
            lineHeight: 1.8,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

/* =========================
   NAVBAR
========================= */

function Navbar({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: darkMode ? "#071a2d" : "rgba(255,255,255,0.95)",
          color: darkMode ? "#fff" : NAVY,
          backdropFilter: "blur(15px)",
          boxShadow: "0 4px 25px rgba(0,0,0,0.08)",
        }}
      >
        <Toolbar
          sx={{
            minHeight: "76px !important",
            px: { xs: 2, md: "6%" },
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Avatar
              variant="rounded"
              sx={{
                width: 50,
                height: 50,
                background: `linear-gradient(135deg, ${NAVY}, ${ORANGE})`,
                fontWeight: 800,
              }}
            >
              CSE
            </Avatar>

            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 13, sm: 17 },
                }}
              >
                Computer Science & Engineering
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: darkMode ? "#94a3b8" : "#64748b",
                }}
              >
                Innovation • Research • Excellence
              </Typography>
            </Box>
          </Box>

          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            sx={{ display: { xs: "none", lg: "flex" } }}
          >
            {navLinks.map(([name, href]) => (
              <Button
                key={name}
                href={href}
                sx={{
                  color: darkMode ? "#e2e8f0" : TEXT,
                  fontWeight: 600,
                  "&:hover": {
                    color: ORANGE,
                    backgroundColor: "transparent",
                  },
                }}
              >
                {name}
              </Button>
            ))}

            <Tooltip title={darkMode ? "Light mode" : "Dark mode"}>
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                sx={{ color: darkMode ? "#fff" : NAVY }}
              >
                {darkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={() => setDarkMode(!darkMode)}
              sx={{
                display: { xs: "flex", lg: "none" },
                color: darkMode ? "#fff" : NAVY,
              }}
            >
              {darkMode ? <LightMode /> : <DarkMode />}
            </IconButton>

            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                display: { xs: "flex", lg: "none" },
                color: darkMode ? "#fff" : NAVY,
              }}
            >
              <Menu />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box
          sx={{
            width: 280,
            height: "100%",
            backgroundColor: darkMode ? DARK_NAVY : "#fff",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <List>
            {navLinks.map(([name, href]) => (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  component="a"
                  href={href}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText
                    primary={name}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      color: darkMode ? "#fff" : NAVY,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

/* =========================
   HERO
========================= */

function Hero() {
  return (
    <Box
      id="home"
      sx={{
        minHeight: { xs: 650, md: 650 },
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        background: `
          radial-gradient(circle at 80% 20%, rgba(230,126,34,0.25), transparent 30%),
          radial-gradient(circle at 20% 80%, rgba(30,144,255,0.15), transparent 30%),
          linear-gradient(135deg, #06192d 0%, #123b69 60%, #0b294a 100%)
        `,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 350,
          height: 350,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.08)",
          right: -100,
          top: -100,
        }}
      />

      <Box
        sx={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.05)",
          left: -250,
          bottom: -250,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Chip
              icon={<AutoAwesome />}
              label="FUTURE OF TECHNOLOGY STARTS HERE"
              sx={{
                color: "#fff",
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                mb: 3,
              }}
            />

            <Typography
              sx={{
                fontSize: { xs: 40, sm: 52, md: 64 },
                fontWeight: 900,
                lineHeight: 1.05,
              }}
            >
              Department of
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 40, sm: 52, md: 64 },
                fontWeight: 900,
                lineHeight: 1.05,
                background: "linear-gradient(90deg, #f39c12, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Computer Science
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 40, sm: 52, md: 64 },
                fontWeight: 900,
                lineHeight: 1.05,
              }}
            >
              & Engineering
            </Typography>

            <Typography
              sx={{
                mt: 3,
                maxWidth: 650,
                color: "#cbd5e1",
                fontSize: 17,
                lineHeight: 1.8,
              }}
            >
              Empowering the next generation of innovators through
              technology, research, creativity and world-class education.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 4 }}
            >
              <Button
                href="#academics"
                variant="contained"
                endIcon={<ArrowForward />}
                sx={{
                  backgroundColor: ORANGE,
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#cf6815",
                    transform: "translateY(-2px)",
                  },
                }}
              >
                Explore Programs
              </Button>

              <Button
                href="#contact"
                variant="outlined"
                sx={{
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.5)",
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  fontWeight: "bold",
                }}
              >
                Contact Department
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box
              sx={{
                position: "relative",
                maxWidth: 400,
                mx: "auto",
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  borderRadius: 6,
                  textAlign: "center",
                  color: "#fff",
                  background: "rgba(255,255,255,0.08)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: "auto",
                    mb: 3,
                    background:
                      "linear-gradient(135deg, #e67e22, #ffb347)",
                    boxShadow: "0 15px 40px rgba(230,126,34,0.3)",
                  }}
                >
                  <Computer sx={{ fontSize: 65 }} />
                </Avatar>

                <Typography variant="h4" fontWeight={800}>
                  Innovate.
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={800}
                  sx={{ color: ORANGE }}
                >
                  Build.
                </Typography>

                <Typography variant="h4" fontWeight={800}>
                  Transform.
                </Typography>

                <Divider
                  sx={{
                    my: 3,
                    borderColor: "rgba(255,255,255,0.15)",
                  }}
                />

                <Typography color="#cbd5e1">
                  Education • Research • Technology
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================
   STATS
========================= */

function Stats() {
  const stats = [
    [<Groups />, "25+", "Expert Faculty"],
    [<School />, "500+", "Students"],
    [<EmojiEvents />, "50+", "Awards"],
    [<TrendingUp />, "20+", "Research Projects"],
  ];

  return (
    <Box sx={{ backgroundColor: "#fff", py: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {stats.map(([icon, number, label]) => (
            <Grid item xs={6} md={3} key={label}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  textAlign: "center",
                  borderRadius: 3,
                  border: "1px solid #e2e8f0",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 15px 35px rgba(18,59,105,0.12)",
                  },
                }}
              >
                <Box sx={{ color: ORANGE }}>{icon}</Box>

                <Typography
                  sx={{
                    mt: 1,
                    fontSize: 30,
                    fontWeight: 900,
                    color: NAVY,
                  }}
                >
                  {number}
                </Typography>

                <Typography color="#64748b">{label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================
   ABOUT
========================= */

function About({ darkMode }) {
  return (
    <Box
      id="about"
      sx={{
        py: 12,
        backgroundColor: darkMode ? "#0b223d" : LIGHT_BG,
      }}
    >
      <Container maxWidth="xl">
        <SectionTitle
          label="WHO WE ARE"
          title="Building Tomorrow's Technologists"
          subtitle="A modern academic environment focused on excellence, innovation and meaningful research."
          light={darkMode}
        />

        <Grid container spacing={5} alignItems="stretch">
          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                backgroundColor: darkMode ? "#102d4b" : "#fff",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                color={darkMode ? "#fff" : NAVY}
                mb={2}
              >
                About Our Department
              </Typography>

              <Typography
                color={darkMode ? "#cbd5e1" : "#64748b"}
                lineHeight={1.9}
                mb={2}
              >
                The Department of Computer Science and Engineering is
                committed to providing quality education and developing
                future-ready technology professionals.
              </Typography>

              <Typography
                color={darkMode ? "#cbd5e1" : "#64748b"}
                lineHeight={1.9}
                mb={3}
              >
                Our students gain strong foundations in programming,
                artificial intelligence, cybersecurity, data science,
                cloud computing and modern software engineering.
              </Typography>

              <Stack spacing={2}>
                {[
                  "Industry-oriented curriculum",
                  "Modern laboratories",
                  "Research opportunities",
                  "Innovation and entrepreneurship",
                ].map((item) => (
                  <Box
                    key={item}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      alignItems: "center",
                    }}
                  >
                    <CheckCircle sx={{ color: ORANGE }} />
                    <Typography
                      color={darkMode ? "#e2e8f0" : TEXT}
                      fontWeight={600}
                    >
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                height: "100%",
                p: 5,
                borderRadius: 4,
                color: "#fff",
                background:
                  "linear-gradient(145deg, #123b69, #071a2d)",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                color={ORANGE}
              >
                Our Vision
              </Typography>

              <Typography lineHeight={1.8} mt={1} mb={4}>
                To become a center of excellence in computer science
                education, research and technological innovation.
              </Typography>

              <Typography
                variant="h5"
                fontWeight={800}
                color={ORANGE}
              >
                Our Mission
              </Typography>

              <Typography lineHeight={1.8} mt={1}>
                To provide high-quality education, encourage research,
                promote innovation and prepare skilled professionals
                capable of solving real-world challenges.
              </Typography>

              <Box sx={{ mt: 4 }}>
                <Chip
                  icon={<Lightbulb />}
                  label="Innovation Driven"
                  sx={{
                    color: "#fff",
                    backgroundColor: "rgba(255,255,255,0.1)",
                  }}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================
   ACADEMICS
========================= */

function Academics({ darkMode }) {
  const [tab, setTab] = useState(0);

  const programs = [
    {
      icon: <School />,
      title: "B.Tech CSE",
      duration: "4 Years",
      text: "Comprehensive undergraduate program covering programming, algorithms, systems and modern computing.",
    },
    {
      icon: <MenuBook />,
      title: "M.Tech",
      duration: "2 Years",
      text: "Advanced postgraduate studies with specialization and research opportunities.",
    },
    {
      icon: <Science />,
      title: "Ph.D.",
      duration: "Research",
      text: "Advanced research program focused on innovation and emerging technologies.",
    },
  ];

  return (
    <Box
      id="academics"
      sx={{
        py: 12,
        backgroundColor: darkMode ? "#071a2d" : "#fff",
      }}
    >
      <Container maxWidth="xl">
        <SectionTitle
          label="ACADEMICS"
          title="Programs Designed for the Future"
          subtitle="Build strong technical foundations and develop practical skills through modern academic programs."
          light={darkMode}
        />

        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={tab}
            onChange={(e, value) => setTab(value)}
            centered
            textColor="inherit"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: ORANGE,
              },
            }}
          >
            <Tab label="Programs" />
            <Tab label="Learning" />
            <Tab label="Career" />
          </Tabs>
        </Box>

        {tab === 0 && (
          <Grid container spacing={3}>
            {programs.map((program) => (
              <Grid item xs={12} md={4} key={program.title}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 4,
                    backgroundColor: darkMode ? "#102d4b" : "#f8fafc",
                    border: "1px solid",
                    borderColor: darkMode ? "#1e4568" : "#e2e8f0",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(18,59,105,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Avatar
                      variant="rounded"
                      sx={{
                        backgroundColor: ORANGE,
                        mb: 3,
                      }}
                    >
                      {program.icon}
                    </Avatar>

                    <Chip
                      label={program.duration}
                      size="small"
                      sx={{
                        mb: 2,
                        color: ORANGE,
                        backgroundColor: "rgba(230,126,34,0.1)",
                      }}
                    />

                    <Typography
                      variant="h5"
                      fontWeight={800}
                      color={darkMode ? "#fff" : NAVY}
                    >
                      {program.title}
                    </Typography>

                    <Typography
                      sx={{
                        mt: 2,
                        color: darkMode ? "#cbd5e1" : "#64748b",
                        lineHeight: 1.7,
                      }}
                    >
                      {program.text}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ px: 4, pb: 3 }}>
                    <Button
                      endIcon={<ArrowForward />}
                      sx={{ color: ORANGE, fontWeight: "bold" }}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {tab === 1 && (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              borderRadius: 4,
              backgroundColor: darkMode ? "#102d4b" : "#f8fafc",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={800}
              color={darkMode ? "#fff" : NAVY}
              mb={4}
            >
              Learning & Skill Development
            </Typography>

            {[
              ["Programming", 92],
              ["Problem Solving", 88],
              ["Artificial Intelligence", 82],
              ["Web Development", 90],
              ["Data Science", 78],
            ].map(([skill, value]) => (
              <Box key={skill} sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography
                    color={darkMode ? "#fff" : TEXT}
                    fontWeight={600}
                  >
                    {skill}
                  </Typography>

                  <Typography color={ORANGE} fontWeight="bold">
                    {value}%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={value}
                  sx={{
                    height: 9,
                    borderRadius: 5,
                    backgroundColor: darkMode ? "#173c5d" : "#e2e8f0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: ORANGE,
                    },
                  }}
                />
              </Box>
            ))}
          </Paper>
        )}

        {tab === 2 && (
          <Paper
            elevation={0}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: 4,
              backgroundColor: darkMode ? "#102d4b" : "#f8fafc",
            }}
          >
            <EmojiEvents sx={{ fontSize: 70, color: ORANGE }} />

            <Typography
              variant="h5"
              fontWeight={800}
              color={darkMode ? "#fff" : NAVY}
              mt={2}
            >
              Career Ready Graduates
            </Typography>

            <Typography
              color={darkMode ? "#cbd5e1" : "#64748b"}
              maxWidth={650}
              mx="auto"
              mt={2}
              lineHeight={1.8}
            >
              Our students are prepared for careers in software engineering,
              AI, data science, cybersecurity, cloud computing and research.
            </Typography>
          </Paper>
        )}
      </Container>
    </Box>
  );
}

/* =========================
   FACULTY
========================= */

function Faculty({ darkMode }) {
  const [selected, setSelected] = useState(null);

  const faculty = [
    ["Dr. Anil Sharma", "Professor & Head", "Artificial Intelligence"],
    ["Dr. Priya Patil", "Associate Professor", "Machine Learning"],
    ["Dr. Rahul Deshmukh", "Assistant Professor", "Computer Networks"],
    ["Dr. Sneha Joshi", "Assistant Professor", "Data Science"],
  ];

  return (
    <Box
      id="faculty"
      sx={{
        py: 12,
        backgroundColor: darkMode ? "#0b223d" : LIGHT_BG,
      }}
    >
      <Container maxWidth="xl">
        <SectionTitle
          label="OUR PEOPLE"
          title="Meet Our Faculty"
          subtitle="Experienced educators and researchers guiding students toward academic and professional excellence."
          light={darkMode}
        />

        <Grid container spacing={3}>
          {faculty.map(([name, role, area]) => (
            <Grid item xs={12} sm={6} md={3} key={name}>
              <Card
                sx={{
                  textAlign: "center",
                  borderRadius: 4,
                  height: "100%",
                  backgroundColor: darkMode ? "#102d4b" : "#fff",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Avatar
                    sx={{
                      width: 105,
                      height: 105,
                      mx: "auto",
                      background:
                        "linear-gradient(135deg, #123b69, #e67e22)",
                      fontSize: 30,
                      fontWeight: "bold",
                    }}
                  >
                    {name
                      .split(" ")
                      .filter((x) => x.length > 2)
                      .slice(1, 3)
                      .map((x) => x[0])
                      .join("")}
                  </Avatar>

                  <Typography
                    variant="h6"
                    fontWeight={800}
                    color={darkMode ? "#fff" : NAVY}
                    mt={3}
                  >
                    {name}
                  </Typography>

                  <Typography
                    sx={{
                      color: ORANGE,
                      fontWeight: "bold",
                      mt: 1,
                    }}
                  >
                    {role}
                  </Typography>

                  <Chip
                    label={area}
                    size="small"
                    sx={{
                      mt: 2,
                      backgroundColor: darkMode
                        ? "rgba(255,255,255,0.08)"
                        : "#f1f5f9",
                    }}
                  />

                  <Button
                    fullWidth
                    sx={{
                      mt: 2,
                      color: ORANGE,
                      fontWeight: "bold",
                    }}
                    onClick={() => setSelected({ name, role, area })}
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <>
            <DialogTitle
              sx={{ fontWeight: "bold", color: NAVY }}
            >
              {selected.name}
            </DialogTitle>

            <DialogContent>
              <Typography color={ORANGE} fontWeight="bold">
                {selected.role}
              </Typography>

              <Typography sx={{ mt: 2 }} color="#64748b">
                Specialization: {selected.area}
              </Typography>

              <Typography sx={{ mt: 2 }} color="#64748b">
                Faculty member dedicated to teaching, research and student
                development in the field of computer science.
              </Typography>
            </DialogContent>

            <DialogActions>
              <Button
                onClick={() => setSelected(null)}
                sx={{ color: ORANGE }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

/* =========================
   RESEARCH
========================= */

function Research({ darkMode }) {
  const areas = [
    [<SmartToy />, "Artificial Intelligence"],
    [<Psychology />, "Machine Learning"],
    [<Security />, "Cyber Security"],
    [<Public />, "Computer Networks"],
    [<Storage />, "Data Science"],
    [<Cloud />, "Cloud Computing"],
    [<Code />, "Software Engineering"],
    [<Settings />, "Computer Systems"],
  ];

  return (
    <Box
      id="research"
      sx={{
        py: 12,
        background:
          "linear-gradient(135deg, #071a2d 0%, #123b69 100%)",
      }}
    >
      <Container maxWidth="xl">
        <SectionTitle
          label="INNOVATION"
          title="Research & Technology"
          subtitle="Exploring emerging technologies and solving real-world problems through research."
          light
        />

        <Grid container spacing={2}>
          {areas.map(([icon, title]) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Card
                sx={{
                  textAlign: "center",
                  color: "#fff",
                  height: "100%",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 4,
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: ORANGE,
                    transform: "translateY(-7px) scale(1.02)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {React.cloneElement(icon, {
                    sx: { fontSize: 50 },
                  })}

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mt={2}
                  >
                    {title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 1,
                      color: "#cbd5e1",
                      fontSize: 13,
                    }}
                  >
                    Explore • Discover • Innovate
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================
   EVENTS
========================= */

function Events({ darkMode }) {
  const events = [
    ["15", "AI & Machine Learning Seminar", "10:00 AM"],
    ["20", "Web Development Workshop", "11:30 AM"],
    ["25", "National Coding Competition", "09:00 AM"],
    ["30", "Research & Innovation Meet", "02:00 PM"],
  ];

  return (
    <Box
      sx={{
        py: 12,
        backgroundColor: darkMode ? "#071a2d" : "#fff",
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle
          label="UPCOMING"
          title="Events & Activities"
          subtitle="Stay connected with seminars, workshops, competitions and department activities."
          light={darkMode}
        />

        <Grid container spacing={2}>
          {events.map(([date, title, time]) => (
            <Grid item xs={12} sm={6} key={title}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  display: "flex",
                  gap: 3,
                  alignItems: "center",
                  borderRadius: 3,
                  backgroundColor: darkMode ? "#102d4b" : "#f8fafc",
                  border: "1px solid",
                  borderColor: darkMode ? "#1e4568" : "#e2e8f0",
                }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 65,
                    height: 65,
                    backgroundColor: ORANGE,
                    fontWeight: 900,
                    fontSize: 20,
                  }}
                >
                  {date}
                </Avatar>

                <Box>
                  <Typography
                    fontWeight={800}
                    color={darkMode ? "#fff" : NAVY}
                  >
                    {title}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ mt: 1 }}
                  >
                    <CalendarMonth
                      sx={{ fontSize: 17, color: ORANGE }}
                    />

                    <Typography
                      fontSize={14}
                      color={darkMode ? "#cbd5e1" : "#64748b"}
                    >
                      {time}
                    </Typography>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================
   FACILITIES
========================= */

function Facilities({ darkMode }) {
  const facilities = [
    [
      <Computer />,
      "Smart Computer Labs",
      "Modern systems and software for practical learning.",
    ],
    [
      <Science />,
      "Research Labs",
      "Dedicated spaces for innovation and advanced research.",
    ],
    [
      <MenuBook />,
      "Digital Library",
      "Books, journals and online learning resources.",
    ],
    [
      <Wifi />,
      "High Speed Internet",
      "Reliable connectivity throughout the department.",
    ],
  ];

  return (
    <Box
      id="facilities"
      sx={{
        py: 12,
        backgroundColor: darkMode ? "#0b223d" : LIGHT_BG,
      }}
    >
      <Container maxWidth="xl">
        <SectionTitle
          label="INFRASTRUCTURE"
          title="Modern Department Facilities"
          subtitle="Everything students need to learn, experiment and innovate."
          light={darkMode}
        />

        <Grid container spacing={3}>
          {facilities.map(([icon, title, text]) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  borderRadius: 4,
                  backgroundColor: darkMode ? "#102d4b" : "#fff",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 18px 35px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    mx: "auto",
                    width: 65,
                    height: 65,
                    backgroundColor: "rgba(230,126,34,0.12)",
                    color: ORANGE,
                  }}
                >
                  {icon}
                </Avatar>

                <Typography
                  variant="h6"
                  fontWeight={800}
                  color={darkMode ? "#fff" : NAVY}
                  mt={3}
                >
                  {title}
                </Typography>

                <Typography
                  color={darkMode ? "#cbd5e1" : "#64748b"}
                  lineHeight={1.6}
                  mt={1}
                >
                  {text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

/* =========================
   FAQ
========================= */

function FAQ({ darkMode }) {
  const questions = [
    [
      "What programs does the department offer?",
      "The department offers undergraduate, postgraduate and research programs in Computer Science and Engineering.",
    ],
    [
      "What are the major research areas?",
      "Our research includes AI, Machine Learning, Cybersecurity, Data Science, Cloud Computing, Networks and Software Engineering.",
    ],
    [
      "Are students involved in research?",
      "Yes. Students can participate in research projects, workshops, technical competitions and innovation activities.",
    ],
    [
      "Does the department organize technical events?",
      "Yes. The department regularly organizes seminars, workshops, coding competitions and industry interaction programs.",
    ],
  ];

  return (
    <Box
      sx={{
        py: 12,
        backgroundColor: darkMode ? "#071a2d" : "#fff",
      }}
    >
      <Container maxWidth="md">
        <SectionTitle
          label="FAQ"
          title="Frequently Asked Questions"
          light={darkMode}
        />

        {questions.map(([question, answer]) => (
          <Accordion
            key={question}
            sx={{
              mb: 1.5,
              borderRadius: "12px !important",
              backgroundColor: darkMode ? "#102d4b" : "#f8fafc",
              color: darkMode ? "#fff" : TEXT,
              "&:before": { display: "none" },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight={700}>{question}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography
                color={darkMode ? "#cbd5e1" : "#64748b"}
                lineHeight={1.7}
              >
                {answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}

/* =========================
   CONTACT
========================= */

function Contact({ darkMode }) {
  const [sent, setSent] = useState(false);

  return (
    <Box
      id="contact"
      sx={{
        py: 12,
        backgroundColor: darkMode ? "#0b223d" : LIGHT_BG,
      }}
    >
      <Container maxWidth="xl">
        <SectionTitle
          label="GET IN TOUCH"
          title="Let's Connect"
          subtitle="Have a question? Send us a message and our department will get back to you."
          light={darkMode}
        />

        <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                height: "100%",
                borderRadius: 4,
                color: "#fff",
                background:
                  "linear-gradient(145deg, #123b69, #071a2d)",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={800}
                color={ORANGE}
                mb={4}
              >
                Department Office
              </Typography>

              <Stack spacing={3}>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <LocationOn sx={{ color: ORANGE }} />
                  <Typography>
                    CSE Department, University Campus
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Phone sx={{ color: ORANGE }} />
                  <Typography>+91 12345 67890</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Email sx={{ color: ORANGE }} />
                  <Typography>cse@example.edu</Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Language sx={{ color: ORANGE }} />
                  <Typography>www.example.edu</Typography>
                </Box>
              </Stack>

              <Divider
                sx={{
                  my: 4,
                  borderColor: "rgba(255,255,255,0.15)",
                }}
              />

              <Typography fontWeight={700} mb={2}>
                Office Hours
              </Typography>

              <Typography color="#cbd5e1">
                Monday – Friday
              </Typography>

              <Typography color="#cbd5e1">
                9:00 AM – 5:00 PM
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                backgroundColor: darkMode ? "#102d4b" : "#fff",
              }}
            >
              <Stack spacing={2.5}>
                <TextField
                  label="Your Name"
                  fullWidth
                  sx={{
                    "& label": {
                      color: darkMode ? "#cbd5e1" : undefined,
                    },
                  }}
                />

                <TextField
                  label="Your Email"
                  type="email"
                  fullWidth
                />

                <TextField label="Subject" fullWidth />

                <TextField
                  label="Your Message"
                  multiline
                  rows={6}
                  fullWidth
                />

                <Button
                  variant="contained"
                  size="large"
                  endIcon={<Send />}
                  onClick={() => setSent(true)}
                  sx={{
                    backgroundColor: ORANGE,
                    py: 1.6,
                    fontWeight: "bold",
                    borderRadius: 2,
                    "&:hover": {
                      backgroundColor: "#cf6815",
                    },
                  }}
                >
                  Send Message
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={sent}
        autoHideDuration={4000}
        onClose={() => setSent(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSent(false)}
        >
          Message sent successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

/* =========================
   FOOTER
========================= */

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: DARK_NAVY,
        color: "#fff",
        py: 7,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  backgroundColor: ORANGE,
                  fontWeight: "bold",
                }}
              >
                CSE
              </Avatar>

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={800}
                >
                  CSE Department
                </Typography>

                <Typography color="#94a3b8">
                  Education • Research • Innovation
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={800} mb={2}>
              Quick Links
            </Typography>

            {navLinks.slice(1).map(([name, href]) => (
              <Typography
                key={name}
                component="a"
                href={href}
                sx={{
                  display: "block",
                  color: "#cbd5e1",
                  mb: 1,
                  "&:hover": {
                    color: ORANGE,
                  },
                }}
              >
                {name}
              </Typography>
            ))}
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={800} mb={2}>
              Follow Us
            </Typography>

            <Stack direction="row" spacing={1}>
              <Tooltip title="GitHub">
                <IconButton sx={{ color: "#fff" }}>
                  <GitHub />
                </IconButton>
              </Tooltip>

              <Tooltip title="LinkedIn">
                <IconButton sx={{ color: "#fff" }}>
                  <LinkedIn />
                </IconButton>
              </Tooltip>

              <Tooltip title="YouTube">
                <IconButton sx={{ color: "#fff" }}>
                  <YouTube />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor: "#334155",
          }}
        />

        <Typography
          align="center"
          color="#64748b"
        >
          © 2026 CSE Department. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
}

/* =========================
   APP
========================= */

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showTop, setShowTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#071a2d" : LIGHT_BG,
      }}
    >
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main>
        <Hero />

        <Stats />

        <About darkMode={darkMode} />

        <Academics darkMode={darkMode} />

        <Faculty darkMode={darkMode} />

        <Research darkMode={darkMode} />

        <Events darkMode={darkMode} />

        <Facilities darkMode={darkMode} />

        <FAQ darkMode={darkMode} />

        <Contact darkMode={darkMode} />
      </main>

      <Footer />

      {showTop && (
        <Fab
          color="primary"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          sx={{
            position: "fixed",
            bottom: 25,
            right: 25,
            backgroundColor: ORANGE,
            "&:hover": {
              backgroundColor: "#cf6815",
            },
          }}
        >
          <KeyboardArrowUp />
        </Fab>
      )}
    </Box>
  );
}

export default App;