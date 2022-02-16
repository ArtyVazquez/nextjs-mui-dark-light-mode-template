import { Box, Typography } from '@mui/material';

export default function Custom404() {
  return (
    <Box sx={{ 
        display: 'flex',
        bgcolor: 'background.default',
        color: 'text.primary' }} > 
        <Typography variant='h6'> 
            404 | This page could not be found ;(
        </Typography>
    </Box>
  )
}