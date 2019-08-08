import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  main: {
    color: '#333',
    fontFamily: 'Arial, Helvetica, sans-serif',
    fontSize: '16px',
    display: 'block',
    margin: 'auto',
    marginTop: '12px'
  },
  standout: {
    border: '1px solid #f5f5f5',
    borderRadius: '10px',
    padding: '10px 30px',
  },
  highlighted: {
    fontWeight: 'bold',
    paddingBottom: '10px',
    borderBottom: '1px solid #FF809F'
  },
  icons: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  icon: {
    fontSize: '11px',
    textAlign: 'center',
    padding: '20px',
    justifyContent: 'space-around',
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    color: '#333',
    textDecoration: 'none',
    marginLeft: '10px',
  },
  iconText: {
    display: 'block',
    marginBottom: '10px'
  },
  iconImage: {
    display: 'block'
  },
  tableCell: {
    padding: '10px 20px'
  }
});

const EmailPreview = ({ classes, agentName, businessName }) => {
  return (
    <div className={classes.main}>
      <div className={classes.standout}>
        <div className={classes.highlighted}>
          Hi [xxxx]
        </div>
        <p>
          If you have a friend with a geniune home loan need, you can earn a gift card
          by referring my services. How does it work?
        </p>

        <table>
          <tbody>
            <tr>
              <td className={classes.tableCell}>
                <img src="https://marketing-image-production.s3.amazonaws.com/uploads/f87065f1d632f1bd10a3b126197949cbdbe7ea63fe8a69f62ba151f1be23ccff64c9f2f1d0cd7dd9d3e6a9b5f571744ce3cc0a107efd00e4dcf4548b026a7a9b.png" height="50" width="50" alt="img" />
              </td>
              <td className={classes.tableCell}>Share your referral link below with your friends</td>
            </tr>
            <tr>
              <td className={classes.tableCell}>
                <img src="https://marketing-image-production.s3.amazonaws.com/uploads/f8f789b2134c1c84090cf46434025902faa18287cd6e8ceb46608aff3a3deb861e986ae7f1d12b5904fbc463a8d8c0d7a0e563b13a599d4a547cc03e6a5c1022.png" height="50" width="50" alt="img" />
              </td>
              <td className={classes.tableCell}>
                Your friend contacts us with your referral link
            </td>
            </tr>
            <tr>
              <td className={classes.tableCell}>
                <img src="https://marketing-image-production.s3.amazonaws.com/uploads/99fbd5f8ba4db99e104e75fdedea60196d446f2c251112f51934e84130234aaaa307a8f1acaaf2ff62e5a609cb8b6fb5c33761d60a6b7945d9a31d1df30752d9.png" height="50" width="50" alt="img" />
              </td>
              <td className={classes.tableCell}>
                You receive a gift
            </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <p>
          Simply click on the icon or copy the following <strong><a href="#">[xxxx]</a></strong> and give it to your friend any way you like.
        </p>
        <div className={classes.icons}>
          <a className={classes.icon} href="#">
            <span className={classes.iconText}>Email</span>
            <img src="https://marketing-image-production.s3.amazonaws.com/uploads/324db0df440d9d593725e326592cf4e6978351d0df4221b40df6e75d70d2f34e48822f50ef8f0fb1b0d323ecb3f92ab96625b92b0f3f3de8563f566ffbef8815.png" height="50" width="50" alt="img" />
          </a>

          <a href="#" className={classes.icon}>
            <span className={classes.iconText}>WhatsApp</span>
            <img src="https://marketing-image-production.s3.amazonaws.com/uploads/122ce37f63582c864e2df6e1ee6f962d8c52f3996ec02b199068b744d6160903d6d63e068e95c4ff3b53c850e6e47bb599f30088608cc02c31dff2cf64edc4f0.png" height="50" width="50" alt="img" />
          </a>
        </div>
        <p>
          Sincerly {agentName} from <strong>{businessName}</strong>
        </p>
      </div>
    </div>
  );
};

export default withStyles(styles)(EmailPreview);