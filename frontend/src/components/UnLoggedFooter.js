import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function UnLoggedFooter() {
  return (
    <footer className="flex align-center">
      <p className="copyrightP">Copyright 2022</p>
      <p className="policyP">Privacy policy</p>
      <div className="footerContainer">
        <div className="info">
          <div className="h3Container">
            <h3>FoxTicket</h3>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            In viverra, ligula ac rhoncus tincidunt, arcu eros semper elit,
            in vehicula mauris eros ut sapien.
            Cras eleifend, lorem vitae tristique tincidunt.
          </p>
          <a href="https://www.facebook.com/greenfoxacademyCZE/" target="_blank" rel="noreferrer">
            <FacebookIcon style={{ color: 'black' }} sx={{ fontSize: '40px', mr: '10px', mt: '10px' }} />
          </a>
          <a href="https://www.instagram.com/greenfox_official/" target="_blank" rel="noreferrer">
            <InstagramIcon style={{ color: 'black' }} sx={{ fontSize: '40px', mr: '10px', mt: '10px' }} />
          </a>
          <a href="https://www.youtube.com/c/GreenFoxAcademy_official" target="_blank" rel="noreferrer">
            <YouTubeIcon style={{ color: 'black' }} sx={{ fontSize: '40px', mr: '10px', mt: '10px' }} />
          </a>
        </div>
        <div className="links">
          <div className="h3Container">
            <h3>Quick Links</h3>
          </div>
          <Link className="link" to="/landing">Landing</Link>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/register">Register</Link>
        </div>
        <div className="contacts">
          <div className="h3Container">
            <h3>Contact us</h3>
          </div>
          <p className="link">Václavské náměstí 837/11</p>
          <p className="link">ahoj@greenfoxacademy.com</p>
          <p className="link">+420 776 476 664</p>
        </div>
      </div>
    </footer>
  );
}

export default UnLoggedFooter;
