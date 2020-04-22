import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Checkbox from '@material-ui/core/Checkbox';

//CSS
const useStyles = theme => ({
  root: {
    overflow: 'hidden',
  },
  card: {
      maxWidth: '95%',
      marginTop: '.5em',
      backgroundColor: 'WhiteSmoke',
  },
  cards: {
    overflowY: 'scroll',
    maxHeight: '20em',
    paddingLeft: '.1em',
  },
  checkbox: {
    marginLeft: '4.8em',
  }
});

//Class displays and handles links to the different application components
class CardInfoLIst extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          checkedA: true,
          checkedB: true,
          checkedC: true,
          checkedD: true,
          checkedE: true,
          checkedF: true,
          checkedG: true,
        };
    }

    handleChange = name => event => {
      this.setState({ ...this.state, [name]: event.target.checked });
    };

    render(){
      const { classes } = this.props;
    return (
        <div className={classes.root}>
        <div className={classes.cards}>
    
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" component="h6">Total evaluation</Typography>
          <br />
          <Typography variant="body2" component="p">Email evaluation guidance.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" component={Link} to="/totalevaluation">Learn More</Button>
        </CardActions>
      </CardActionArea>
    </Card>

    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" component="h6">Sender Information</Typography>
          <br />
          <Typography variant="body2" component="p">Name and email address credibility.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" component={Link} to="/sender">Learn More</Button>
        </CardActions>
      </CardActionArea>
    </Card>

    <Card className={classes.card}>
          <CardActionArea>
      <CardContent>
        <Typography variant="h6" component="h6">
          Message Content
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          Email content relevance/legitimacy.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link} to="/content">Learn More</Button>
      </CardActions>
      </CardActionArea>
    </Card>

    <Card className={classes.card}>
          <CardActionArea>
      <CardContent>
        <Typography variant="h6" component="h6">
          Links
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          Trustworthiness of links in the email.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link} to="/links">Learn More</Button>
      </CardActions>
      </CardActionArea>
    </Card>

    <Card className={classes.card}>
          <CardActionArea>
      <CardContent>
        <Typography variant="h6" component="h6">
          Authentication
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          Email security protocols.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link} to="/authentication">Learn More</Button>
      </CardActions>
      </CardActionArea>
    </Card>

    <Card className={classes.card}>
          <CardActionArea>
      <CardContent>
        <Typography variant="h6" component="h6">
          Attachments
        </Typography>
        <br />
        <Typography variant="body2" component="p">
          Trustworthiness of attached files.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link} to="/attachments">Learn More</Button>
      </CardActions>
      </CardActionArea>
    </Card>
    </div>
        </div>
    );
    }
}

CardInfoLIst.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(CardInfoLIst);