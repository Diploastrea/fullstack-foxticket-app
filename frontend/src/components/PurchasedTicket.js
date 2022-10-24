import { useContext, useState } from 'react';
import {
  Grid,
  Button,
  Typography,
  Dialog,
  DialogTitle,
} from '@mui/material';
import { Box } from '@mui/system';
import QRCode from 'react-qr-code';
import { UserContext } from '../context/UserContext';
import ticketService from '../service/ticketService';

export default function PurchasedTicket({
  purchaseId,
  name,
  description,
  expiration,
  duration,
}) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({ });
  const { updateTickets } = useContext(UserContext);

  function getTimeRemaining(expirationDate) {
    const total = Date.parse(expirationDate) - Date.parse(new Date());
    let hours = Math.floor(total / (1000 * 60 * 60));
    let minutes = Math.floor((total / 1000 / 60) % 60);
    let seconds = Math.floor((total / 1000) % 60);
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${hours}:${minutes}:${seconds}`;
  }

  let countdown = getTimeRemaining(expiration);
  const [timeleft, setTimeleft] = useState(countdown);

  setInterval(() => {
    countdown = getTimeRemaining(expiration);
    setTimeleft(countdown);
  }, 1000);

  const handleUseTicket = async () => {
    await ticketService.activateTicket(purchaseId);
    updateTickets();
  };

  const handleShowQR = async () => {
    const ticket = await ticketService.getTicketById(purchaseId);
    const { name: username, email } = ticket.user;
    const {
      name: productName,
      duration: ticketDuration,
      type,
      status,
      paidDate,
      expirationDate,
    } = ticket.product;
    const ticketInfo = `Name: ${username},\n
    email: ${email},\n
    product name: ${productName},\n
    duration: ${ticketDuration}h,\n
    type: ${type},\n
    status: ${status},\n
    bought on: ${paidDate},\n
    expires on: ${expirationDate}`;
    setData(ticketInfo);
    setShow(true);
  };

  const handleCloseQR = () => {
    setShow(false);
  };

  return (
    <Grid>
      <Box border={1} margin={2} padding={2} display="flex" alignItems="center">
        <Box margin={1} width="55%">
          <Typography variant="h6">{name}</Typography>
          <Typography>{description}</Typography>
        </Box>
        <Box margin={1} width="25%">
          <Typography>
            {expiration && (
              <span>
                Expires in:&nbsp;
                {timeleft}
              </span>
            )}
            {duration && (
              <span>
                Duration:&nbsp;
                {duration}
                h
              </span>
            )}
          </Typography>
        </Box>
        <Box
          margin={1}
          width="30%"
          display="flex"
          justifyContent="end"
          alignItems="center"
        >
          {duration && (
            <Button
              onClick={handleUseTicket}
              size="large"
              sx={{
                backgroundColor: '#D1CFCF',
                color: 'black',
                ':hover': { backgroundColor: '#517DFB', color: 'white' },
              }}
            >
              Use
            </Button>
          )}
          {expiration && (
            <Button
              onClick={handleShowQR}
              size="large"
              sx={{
                backgroundColor: '#D1CFCF',
                color: 'black',
                ':hover': { backgroundColor: '#517DFB', color: 'white' },
              }}
            >
              QR code
            </Button>
          )}
          <Dialog open={show} onClose={handleCloseQR}>
            <DialogTitle textAlign="center">Ticket QR code</DialogTitle>
            <QRCode value={data} />
          </Dialog>
        </Box>
      </Box>
    </Grid>
  );
}
