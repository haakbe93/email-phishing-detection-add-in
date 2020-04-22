import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardInfoList from "./CardInfoList"
import MouseOverPopover from './MouseOverPopover'
import Authentication from "./Authentication";
import Content from "./Content";
import Sender from "./Sender";
import Link from "./Links";
import Attachment from "./Attachments";

//CSS
const useStyles = theme => ({
  root: {
    paddingLeft: '1em',
    overflow: 'hidden',
  },
  card: {
      maxWidth: '95%',
      marginTop: '.5em'
  },
  cards: {
    overflowY: 'scroll',
    maxHeight: '18em',
  },
  paper: {
    maxWidth: '85%',
    padding: '1em',
    marginTop: '.5em',
    backgroundColor: 'WhiteSmoke',
  },
  checkbox: {
    marginLeft: '4.8em',
  },
  prosentOnBar:{
    width: '100%',
    backgroundColor: 'lightgrey',
    display: 'block',
    textAlign: 'center',
    lineHeight: '20px',
    color: 'white',
  },
  totalProsentOnBar:{
    width: '80%',
    backgroundColor: 'lightgrey',
    display: 'block',
    textAlign: 'center',
    lineHeight: '20px',
    color: 'white',
  },
  safetyBar:{
    width: '100%',
    backgroundColor: 'lightgrey',
    lineHeight: '30px',
    color: 'white',
    textAlign: 'center',
  },
  bar:{
    width: '1%',
    height: '20px',
    backgroundColor: 'green',
  },
  cont:{
    borderTop: '1px solid black',
    paddingTop: '.4em',
  },
  box1:{
    display: 'inline-block',
    width: '45%',
    padding: 'none',
    marginBottom: '-.5em',
    marginTop: '-.8em',
  },
  box2:{
    display: 'inline-block',
    width: '55%',
    padding: 'none',
    marginBottom: '-.5em',
    marginTop: '-.8em',
  },
  list:{
    paddingLeft: '.1em',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'left',
    justifyContent: 'space-between',
    paddingRight: '1.5em',
  },
  flexContainer2: {
    display: 'flex',
    justifyContent: 'left',
    justifyContent: 'space-between',
    paddingRight: '2em',
  },
  notShown: {
    display: 'none',
  },
  safetyLevel:{
    backgroundColor: 'WhiteSmoke',
    color: 'white',
    textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black',
  }
});

class MainList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          Authentication: '',
          sendScore: 0,
          messageScore: 0,
          linkScore: 0,
          authScore: 0,
          attachmentScore: 0,
          totVal: 0,
          safetyType: '',
        };
    }


    componentDidMount(){
      this.getData();
    }

    //handlers that fetches percent score evaluation from the other components:

    handleAuth = (authValue) => {
      this.setState({authScore: authValue});
      this.progBar(authValue, "auth");
    }

    handleMessage = (messageValue) => {
      this.setState({messageScore: messageValue});
      this.progBar(messageValue, "content");
    }

    handleSender = (senderValue) => {
      this.setState({sendScore: senderValue});
      this.progBar(senderValue, "send");
    }
    handleLink = (linkValue) => {
      this.setState({linkScore: linkValue});
      this.progBar(linkValue, "links");
    }
    handleAttachment = (attachmentValue) => {
      this.setState({attachmentScore: attachmentValue});
      this.progBar(attachmentValue, "attach");
    }

    handleAttributeValues = (authValue, messageValue, senderValue, linkValue, attachmentValue) => {
      this.setState({
        authScore: authValue,
        messageScore: messageValue,
        senderScore: senderValue,
        linkScore: linkValue,
        attachmentScore: attachmentValue,
      });
    }

    //Delaying fetching the data to get the right calculation.
    getData = async () => {
      setTimeout(() => {
        this.totEvaluation(this.state.authScore, this.state.messageScore, this.state.sendScore, this.state.linkScore);
      }, 800)
    }
    
    //Total evaluation of all the fetched evaluation percent scores
    totEvaluation = async (a,b,c,d) => {
      console.log(a,b,c,d);
      var numA = parseInt(a);
      var numB = parseInt(b);
      var numC = parseInt(c);
      var numD = parseInt(d);
      var value = ((numA + numB + numC + numD) / 4);
      let self = this;
      var roundedScore = value.toFixed(0);
      self.setState({
        totVal: roundedScore,
      });
      self.progBar(roundedScore, "tot_ev");
      self.progBar(roundedScore, "safetyLevel");
      console.log(this.state.totVal);   
    }

    //Giving colour to percent bar based on percent score.
    progBar = async (c, text) => {
      var elem = document.getElementById(text);
      var width = c;
      elem.style.width = "100%";
        if(width <= 25){
          elem.style.backgroundColor = "red";
          this.setState({safetyType: 'NO'});

        } else if(width > 25 && width <= 50){
          elem.style.backgroundColor = "OrangeRed";
          this.setState({safetyType: 'LOW'});

        } else if(width > 50 && width <= 75){
          elem.style.backgroundColor = "orange";
          this.setState({safetyType: 'MEDIUM'});

        } else if(width > 75){
          elem.style.backgroundColor = "green";
          this.setState({safetyType: 'HIGH'});
      }
    }

    render(){
      const { classes } = this.props;
    return (
        <div className={classes.root}>
          <div className={classes.flexContainer}>
            <div>
            <Typography variant="h6" component="h4">
            Email evaluation
            </Typography>
            </div>
            <div>
            <MouseOverPopover tekst="Shows evaluation of key attributes found in an email. Each attribute is evaluated through a percent bar.
            Lower percents indicates higher likelyhood of email phishing.
            The total evaluation percent represent a guidance for awareness of the email content."/>
            </div>
            </div>
            <Paper className={classes.paper}>
              <div className={classes.box1}><p>Sender</p></div>
              <div className={classes.box2}>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="send"><p><b>{this.state.sendScore}%</b></p></div>
            </div>
            </div>
            <div className={classes.box1}><p>Content</p></div>
              <div className={classes.box2}>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="content"><p><b>{this.state.messageScore}%</b></p></div>
            </div>
            </div>
            <div className={classes.box1}><p>Links</p></div>
              <div className={classes.box2}>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="links"><p><b>{this.state.linkScore}%</b></p></div>
            </div>
            </div>
            <div className={classes.box1}><p>Authentication</p></div>
              <div className={classes.box2}>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="auth"><p><b>{this.state.authScore}%</b></p></div>
            </div>
            </div>
            <div className={classes.cont}>
            <div className={classes.box1}><p><b>Tot. evaluation</b></p></div>
              <div className={classes.box2}>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="tot_ev"><p><b>{this.state.totVal}%</b></p></div>
            </div>
            </div>
            <div className={classes.safetyBar}>
              <div className={classes.safetyLevel} id="safetyLevel"><p><b>{this.state.safetyType} EMAIL SAFETY</b></p></div>
              </div>
            </div>
        </Paper>
        <br />
        <div className={classes.flexContainer2} >
            <div>
            <Typography variant="h6" component="h4">
            Attribute details
            </Typography>
            </div>
            <div>
            <MouseOverPopover tekst="List of the evaluated attributes in an email. Click on one to find out more!"/>
            </div>
            </div>
        <CardInfoList></CardInfoList>
        <div className={classes.notShown}>
            <Authentication onAuthScore={this.handleAuth}/>
            <Content onMessageScore={this.handleMessage}/>
            <Sender onSenderScore={this.handleSender}/>
            <Link onLinkScore={this.handleLink}/>
            <Attachment onAttachmentScore={this.handleAttachment}/>
          </div>
        </div>
    );
    }
}

MainList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(MainList);