import { Grid, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import getProducts from '../service/shopService';
import Ticket from './Ticket';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState(0);

  const handleTabs = (event, val) => {
    setValue(val);
  };

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <Grid p={5} sx={{ ml: '18%' }}>
      <Tabs
        data-testid="tabs"
        value={value}
        onChange={handleTabs}
        TabIndicatorProps={{ sx: { backgroundColor: 'black' } }}
        sx={{
          '& button': {
            backgroundColor: '#F1F1F1', borderTopLeftRadius: 10, borderTopRightRadius: 10, border: 1,
          },
          '& button.Mui-selected': { backgroundColor: '#D3D3D3' },
        }}
      >
        <Tab label="Tickets" data-testid="firstTab" />
        <Tab label="Passes" data-testid="secondTab" />
      </Tabs>
      <Box maxWidth="60%" border={1} p={1} data-testid="boxForTickets">
        {products.map((product) => (
          (product.type === 'ticket')
            ? (
              <TabPanel key={product.id} value={value} index={0}>
                <Ticket
                  id={product.id}
                  mainInfo={product.name}
                  detailedInfo={product.description}
                  price={product.price}
                  time={product.duration}
                />
              </TabPanel>
            )
            : (
              <TabPanel key={product.id} value={value} index={1}>
                <Ticket
                  id={product.id}
                  mainInfo={product.name}
                  detailedInfo={product.description}
                  price={product.price}
                  time={product.duration}
                />
              </TabPanel>
            )
        ))}

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
