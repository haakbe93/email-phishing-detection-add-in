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
});

class Authentication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SPF: '',
            DKIM: '',
            DMARC: '',
            dmarcScore: 0,
            dkimScore: 0,
            spfScore: 0,
            totVal: 0,
            spfText: "",
            dkimText: "",
            dmarcText: "",
        };
    }

    componentDidMount(){
      this.internetHeaders(); 
    }

    //Method for fetching authentication results from email header fields
    internetHeaders = async () => {
      let self = this;
      //Checks if email is sent by yourself, if so all values becomes 100%
      var myProfile = Office.context.mailbox.userProfile.displayName;
      var item2 = Office.context.mailbox.item.sender.displayName;

      if(item2 == myProfile){

        self.setState({
          SPF: 'Pass',
          DKIM: 'pass',
          DMARC: 'pass',
          totVal: 100,
        });

        self.scoreSPF('pass');
        self.scoreDKIM('pass');   
        self.scoreDMARC('pass');  

        self.totEvaluation(100, 100, 100);
      }

      Office.context.mailbox.item.getAllInternetHeadersAsync(
        function(asyncResult) {
            if (asyncResult.status === Office.AsyncResultStatus.Succeeded) {
                  var dir = asyncResult.value;
                  //SPF
                  var SPF = "spf=";
                  var splitt_SPF = dir.split(SPF).pop();
                  var t_1 = splitt_SPF.match(/none|pass|neutral|fail|softfail|permerror|temperror/g);
                  var val_1 = t_1[0];
                  //DKIM
                  var DKIM = "dkim=";
                  var splitt_DKIM = dir.split(DKIM).pop();
                  var t_2 = splitt_DKIM.match(/none|pass|fail/g);
                  var val_2 = t_2[0];
                  //DMARC
                  var DMARC = "dmarc=";
                  var splitt_DMARC = dir.split(DMARC).pop();
                  var t_3 = splitt_DMARC.match(/none|pass|bestguesspass|fail/g);
                  var val_3 = t_3[0];

                  self.setState({
                    SPF: val_1,
                    DKIM: val_2,
                    DMARC: val_3,
                  });

                  self.scoreSPF(self.state.SPF);
                  self.scoreDKIM(self.state.DKIM);   
                  self.scoreDMARC(self.state.DMARC);  
                  //Total evaluation score of spf, dkim and dmarc
                  self.totEvaluation(self.state.spfScore, self.state.dkimScore, self.state.dmarcScore);
            } else {
                    // Handle the error.
                    console.log(asyncResult.error.message);
                }
            });
      }

      //Rate SPF score based on authentication result.
      scoreSPF = async (value) => {
        var val = value.toLowerCase();
        var score = 0;
        let self = this;
        if(val == "pass"){
          score = 100;
          self.setState({
            spfScore: score,
            spfText: "The SPF record designates the host to be allowed to send.",
          });
        }
        if(val == "none"){
          self.setState({
            spfScore: score,
            spfText: "The domain does not have an SPF record or the SPF record does not evaluate to a result.",
          });
        }
        if(val == "fail"){
          self.setState({
            spfScore: score,
            spfText: "The SPF record has designated the host as NOT being allowed to send.",
          });
        }
        if(val == "softfail"){
          self.setState({
            spfScore: score,
            spfText: "The SPF record has designated the host as NOT being allowed to send but is in transition.",
          });
        }
        if(val == "neutral"){
          self.setState({
            spfScore: score,
            spfText: "The SPF record specifies explicitly that nothing can be said about validity.",
          });
        }
        if(val == "permerror"){
          self.setState({
            spfScore: score,
            spfText: "A permanent error has occurred.",
          });
        }
        if(val == "temperror"){
          self.setState({
            spfScore: score,
            spfText: "A transient error has occurred.",
          });
        }
        self.progBar(score, "bar_1");
      }

      //Rate DKIM score based on authentication result.
      scoreDKIM = async (value) => {
        var val = value.toLowerCase();
        var score = 0;
        let self = this;
        if(val == "pass"){
          score = 100;
          self.setState({
            dkimScore: score,
            dkimText: "The email has DKIM Signature and passed the verification check.",
          });
        }
        if(val == "none"){
          self.setState({
            dkimScore: score,
            dkimText: "The email message has not been signed with DKIM so there is nothing to verify.",
          });
        }
        if(val == "fail"){
          self.setState({
            dkimScore: score,
            dkimText: "The email message has a DKIM signature but there was an error causing a verification failure.",
          });
        }
        self.progBar(score, "bar_2");
      }

      //Rate DMARC score based on authentication result.
      scoreDMARC = async (value) => {
        var val = value.toLowerCase();
        var score = 0;
        let self = this;
        if(val == "pass"){
          score = 100;
          self.setState({
            dmarcScore: score,
            dmarcText: "Email is authenticated against established DKIM and SPF standards.",
          });
        }
        if(val == "none"){
          self.setState({
            dmarcScore: score,
            dmarcText: "Email is NOT authenticated against established DKIM and SPF standards.",
          });
        }
        if(val == "fail"){
          self.setState({
            dmarcScore: score,
            dmarcText: "Email failed to authenticate.",
          });
        }
        if(val == "bestguesspass"){
          score = 50;
          self.setState({
            dmarcScore: score,
            dmarcText: "Either SPF or DKIM failed to authenticate or the email body from address did not align with the domain.",
          });
        }
        self.progBar(score, "bar_3");
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

      //Total evaluation percent score calculation -> takes all authentication results
      totEvaluation = async (a,b,c) => {
        var value = ((a + b + c) / 3);
        let self = this;
        var roundedScore = value.toFixed(0);
        self.setState({
          totVal: roundedScore,
        });
        self.progBar(roundedScore, "bar_4");
        var lang = roundedScore;
        //sends score to MainList.js through props
        self.props.onAuthScore(lang);    
      }

    render(){
      const { classes } = this.props;
    return (
        <div className={classes.root}>
          <div className={classes.cards}>
          <Typography variant="h6" component="h3">
            Authentication
            </Typography>
        <Paper className={classes.card}>
        <div className={classes.flexContainer}>
            <div>
            <Typography variant="h6" component="h3">
            SPF
            </Typography>
            </div>
            <div>
            <MouseOverPopover tekst="Sender Policy Framework (SPF) 
            allows the receiving mail server to check during mail delivery that a mail claiming to come 
            from a specific domain is submitted by an IP address authorized by that domain's administrators."/>
            </div>
            </div>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="bar_1"><p><b>{this.state.spfScore}%</b></p></div>
            </div>
            <p>
              SPF: <b>{this.state.SPF}</b>
            </p>
            <p>
              {this.state.spfText}
            </p>
        </Paper>
        <Paper className={classes.card}>
        <div className={classes.flexContainer}>
            <div>
            <Typography variant="h6" component="h3">
            DKIM
            </Typography>
            </div>
            <div>
            <MouseOverPopover tekst="Domain Keys Identified Mail (DKIM) is an email authentication technique that 
            allows the receiver to check that an email was indeed sent and authorized 
            by the owner of that domain. This is done by giving the email a digital signature."/>
            </div>
            </div>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="bar_2"><p><b>{this.state.dkimScore}%</b></p></div>
            </div>
            <p>
              DKIM: <b>{this.state.DKIM}</b>
            </p>
            <p>
             {this.state.dkimText}
            </p>
        </Paper>
        <Paper className={classes.card}>
        <div className={classes.flexContainer}>
            <div>
            <Typography variant="h6" component="h3">
            DMARC
            </Typography>
            </div>
            <div>
            <MouseOverPopover tekst="Domain-based Message Authentication, Reporting 
            and Conformance (DMARC) is a protocol that uses SPF and DKIM to determine the authenticity of 
            an email message. It is designed to give email domain owners 
            the ability to protect their domain from unauthorized use."/>
            </div>
            </div>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="bar_3"><p><b>{this.state.dmarcScore}%</b></p></div>
            </div>
            <p>
              DMARC: <b>{this.state.DMARC}</b>
            </p>
            <p>
              {this.state.dmarcText}
            </p>
        </Paper>
        <Paper className={classes.card}>
        <div className={classes.flexContainer}>
            <div>
            <Typography variant="h6" component="h3">
            Evaluation
            </Typography>
            </div>
            <div>
            <MouseOverPopover tekst="A total evaluation of the attributes found in email authentication.
            The score is an average of the attributes."/>
            </div>
            </div>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="bar_4"><p><b>{this.state.totVal}%</b></p></div>
            </div>
            <p>
              The prosent should almost always be 100 as it is required to 
              pass verification of SPF, DKIM and DMARC to rate the email safe.
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

Authentication.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Authentication);