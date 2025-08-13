import React from 'react';
import { Box, Fab, Zoom, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const ScrollToTopButton: React.FC = () => {
  // useScrollTrigger is a more efficient way to detect scroll for visibility
  const trigger = useScrollTrigger({
    disableHysteresis: true, // Show immediately on scroll down
    threshold: 150, // Show button after scrolling 150px
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor'); // Optional: If you have a specific anchor

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // Default: scroll to top of window
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: (theme) => theme.zIndex.tooltip // Ensure it's above most content
        }}
      >
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
};