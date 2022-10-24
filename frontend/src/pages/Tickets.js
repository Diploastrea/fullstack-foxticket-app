import { useContext, useState } from 'react';
import { Grid, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import { UserContext } from '../context/UserContext';
import PurchasedTicket from '../components/PurchasedTicket';

export default function Shop() {
  const { activeTickets, inactiveTickets } = useContext(UserContext);
  const [value, setValue] = useState(0);

  const handleTabs = (event, val) => {
    setValue(val);
  };

  return (
    <Grid
      alignItems="center"
      justifyContent="center"
      maxWidth="60%"
      margin="auto"
    >
      <Tabs
        data-testid="tabs"
        value={value}
        onChange={handleTabs}
        TabIndicatorProps={{ sx: { backgroundColor: 'black' } }}
        sx={{
          mt: 10,
          '& button': {
            backgroundColor: '#F1F1F1', borderTopLeftRadius: 10, borderTopRightRadius: 10, border: 1,
          },
          '& button.Mui-selected': { backgroundColor: '#D3D3D3' },
        }}
      >
        <Tab label="Active" data-testid="firstTab" />
        <Tab label="Inactive" data-testid="secondTab" />
      </Tabs>
      <Box
        maxWidth="70%"
        border={1}
        p={1}
        data-testid="boxForTickets"
      >
        {value === 0 ? (
          <TabPanel value={value} index={0}>
            {activeTickets.map((ticket) => {
              return (
                <PurchasedTicket
                  key={ticket.id}
                  purchaseId={ticket.id}
                  name={ticket.productName}
                  description={ticket.description}
                  expiration={ticket.expirationDate}
                />
              );
            })}
          </TabPanel>
        ) : (
          <TabPanel value={value} index={1}>
            {inactiveTickets.map((ticket) => {
              return (
                <PurchasedTicket
                  key={ticket.id}
                  purchaseId={ticket.id}
                  name={ticket.productName}
                  description={ticket.description}
                  duration={ticket.duration}
                />
              );
            })}
          </TabPanel>
        )}
      </Box>
    </Grid>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return (
    <div>
      { value === index && (<h2>{children}</h2>) }
    </div>
  );
}
