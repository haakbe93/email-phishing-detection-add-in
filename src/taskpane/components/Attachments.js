import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import MouseOverPopover from './MouseOverPopover';

//CSS
const useStyles = theme => ({
  root: {
    paddingLeft: '1em',
  },
  card: {
    padding: theme.spacing(2, 2),
    maxWidth: '85%',
    marginTop: '.6em',
    backgroundColor: 'WhiteSmoke',
    wordBreak: 'break-all',
  },
  cards:{
    maxHeight: '40em',
    overflowY: 'auto',
    paddingLeft: '.1em',
  },
  button: {
    margin: theme.spacing(1, 0),
  },
  popover: {
    pointerEvents: 'none',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'left',
    justifyContent: 'space-between',
  },
  prosentOnBar:{
    width: '90%',
    backgroundColor: 'lightgrey',
    display: 'block',
    textAlign: 'center',
    lineHeight: '30px',
    color: 'white',
  },
  bar:{
    width: '1%',
    height: '30px',
    backgroundColor: 'green',
  },
  fileList:{
    maxHeight: '8em',
    overflowY: 'auto',
    marginTop: '-.5em',
  }
});

class Attachments extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          nameOfFilesArray: [],
          numFiles: 0,
          attachmentScore: 0,
          totVal: 0,
        };
    }

    componentDidMount(){
      this.getAttachmentsInfo();
    }

    //fetches email attachments through 
    getAttachmentsInfo = async () => {
      
      var item = Office.context.mailbox.item;
      var fileNameArray = [];
      var numberOfFiles = 0;
      var score = 0;
      let self = this;

      //checks if email contains attachments
      if(item.attachments.length < 1){
        score = 100;
        self.setState({
          attachmentScore: score,
        });
      }

        if (item.attachments.length >= 1) {
          self.setState({
            attachmentScore: score,
          });
            //displays names of files
            for (var i = 0; i < item.attachments.length; i++) {
            var attachment = item.attachments[i];
            if(!attachment.isInline){
              numberOfFiles++;
              fileNameArray.push(attachment.name);
            }
            }
        }
      
      self.setState({
        nameOfFilesArray: fileNameArray,
        numFiles: numberOfFiles,
      });

      self.progBar(score, "bar_1");
      self.totEvaluation(score);
    }

    //Giving colour to percent bar based on percent score.
    progBar = async (c, text) => {
        var elem = document.getElementById(text);
        var width = c;
      elem.style.width = "100%";
          if(width <= 25){
            elem.style.backgroundColor = "red";
          } else if(width > 25 && width <= 50){
            elem.style.backgroundColor = "OrangeRed";
          } else if(width > 50 && width <= 75){
            elem.style.backgroundColor = "orange";
          } else if(width > 75){
            elem.style.backgroundColor = "green";
        }
      }

      //Total evaluation percent score calculation
      totEvaluation = async (a) => {
        var value = a;
        let self = this;
        var roundedScore = value.toFixed(0);
        self.setState({
          totVal: roundedScore,
        });
        self.progBar(roundedScore, "bar_2");
        console.log(roundedScore);
        self.props.onAttachmentScore(roundedScore);    
      }
    
    render(){
      const { classes } = this.props;
    return (
        <div className={classes.root}>
          <div className={classes.cards}>
          <Typography variant="h6" component="h3">
            Attachments
            </Typography>
        <Paper className={classes.card}>
        <div className={classes.flexContainer}>
            <div>
            <Typography variant="h6" component="h3">
            Attached files
            </Typography>
            </div>
            <div>
            <MouseOverPopover tekst="Displays all files that are attached to the email."/>
            </div>
            </div>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="bar_1"><p><b>{this.state.attachmentScore}%</b></p></div>
            </div>
            <p>Number of files: <b>{this.state.numFiles}</b></p>
            <p>File names:</p>
            <div className={classes.fileList}>
          {this.state.nameOfFilesArray.map(item => (
          <ul key={item}><b>{item}</b></ul>
          ))}
          </div>
        </Paper>
        <Paper className={classes.card}>
        <div className={classes.flexContainer}>
            <div>
            <Typography variant="h6" component="h3">
            Evaluation
            </Typography>
            </div>
            <div>
            <MouseOverPopover tekst="A total evaluation of the attributes found in email attachments.
            The score is an average of the attributes."/>
            </div>
            </div>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="bar_2"><p><b>{this.state.totVal}%</b></p></div>
            </div>
            <p>
            If an email contains attachments, 
            a percent of <b>0</b> is given. If not, a score of <b>100</b> is given.
            One should be careful opening attachments,
            espescially if a low score is given on other email attributes aswell.
            </p>
            <p>
            <b>ALWASY</b> double check email information before opening the attachemment(s). 
            If the file type or the file name seems out of context or suspicious then,
            <b> DO NOT</b> open the attachement(s).
            </p>
        </Paper>
        </div>
        <Button variant="contained" color="primary" className={classes.button} component={Link} to="/">
        Go back
      </Button>
        </div>
    );
    }
}

Attachments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Attachments);