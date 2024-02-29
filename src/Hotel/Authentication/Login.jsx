import React, { useState, useEffect } from 'react';
import Google from './GoogleSignIn';
import {
  CssVarsProvider,
  useColorScheme,
} from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from 'react-router-dom';
import {  FaEye, FaEyeSlash } from "react-icons/fa";
import LinearProgress from '@mui/material/LinearProgress';

function ColorSchemeToggle(props) {
  const { onClick, ...other } = props;
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" disabled />;
  }

  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      aria-label="toggle light/dark mode"
      {...other}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        onClick?.(event);
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function LoginPage() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('https://hotel-backend-tge7.onrender.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        const { userId } = data;

        localStorage.setItem('isSignedIn', 'true');
        localStorage.setItem('userId', userId);
        navigate('/');
      } else {
        // Handle login failure
        const errorData = await response.json();
        console.log('Login failed:', errorData.message);
        // You may want to show an error message to the user
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network or unexpected errors
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
if(isLoading){
  return (
    

      <Box sx={{ width: '100%' }}>
       <LinearProgress />
     </Box>
  
 
  )
}
  return (
    <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
  
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Collapsed-breakpoint': '769px',
            '--Cover-width': '50vw',
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={(theme) => ({
          width: 'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundColor: 'rgba(19 19 24 / 0.4)',
          },
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: 'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
            maxWidth: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BadgeRoundedIcon />
              </IconButton>
              <Typography level="title-lg">Company logo</Typography>
            </Box>
            <ColorSchemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 400,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography component="h1" level="h3">
                  Sign in
                </Typography>
                <Typography level="body-sm">
                  New to Roomsstay?{' '}
                  <Link href="/register" level="title-sm">
                    Sign up!
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
               
              >
                <Google/>
                <GoogleIcon /> Continue with Google
              </Button>
            </Stack>
            <Divider
              sx={(theme) => ({
                [theme.getColorSchemeSelector('light')]: {
                  color: { xs: '#FFF', md: 'text.tertiary' },
                  '--Divider-lineColor': {
                    xs: '#FFF',
                    md: 'var(--joy-palette-divider)',
                  },
                },
              })}
            >
              or
            </Divider>
            <Stack gap={4} sx={{ mt: 2 }}>
              <form onSubmit={handleLogin}>
                <FormControl required>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" onChange={handleInputChange} />
                </FormControl>
                <FormControl required>
                  <FormLabel>Password</FormLabel>
                  <Input type={showPassword ? 'text' : 'password'} name="password" onChange={handleInputChange} />
                  <IconButton
    size="sm"
    onClick={togglePasswordVisibility}
    sx={{ position: 'absolute', top: '73%', right: '8px', transform: 'translateY(-50%)' }}
  >
    {showPassword ? <FaEye /> : <FaEyeSlash />}
  </IconButton>
                </FormControl>
                
                <Stack gap={4} sx={{ mt: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Checkbox size="sm" label="Remember me" name="persistent" />
                    <Link level="title-sm" href="#replace-with-a-link">
                      Forgot your password?
                    </Link>
                  </Box>
                  <Button type="submit" fullWidth>
                    Sign in
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body-xs" textAlign="center">
              © Hotel Roomsstay {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: 'clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))',
          transition: 'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url(https://images2.alphacoders.com/462/462295.jpg)',
          [theme.getColorSchemeSelector('dark')]: {
            backgroundImage: 'url(https://cutewallpaper.org/28/cityscape-window-night-hd-wallpaper/11938485.jpg)',
          },
        })}
      />
    </CssVarsProvider>
  );
}
