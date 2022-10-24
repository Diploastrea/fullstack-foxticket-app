import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

export default function NotImplementedYet() {
  return (
    <Grid align="center" justifyContent="center">
      <Typography variant="h4" fontWeight="bold">
        Page not implemented
      </Typography>
      <br />
      <Button
        href="/landing"
        size="large"
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ marginTop: 5 }}
      >
        Go Home
      </Button>
    </Grid>
  );
}
