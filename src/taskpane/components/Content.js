import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import spamWordData from './spamWordData.json';
import MouseOverPopover from './MouseOverPopover'

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
  phishingWordList:{
    maxHeight: '4em',
    overflowY: 'auto',
  }
});

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          emailAdr: '',
          displayName: '',
          receiverScore: 0,
          dictScore: 0,
          encodeScore: 0,
          totalScore: '',
          nameCount: '',
          base64Encoding: '',
          spamWordCount: 0,
          list: [],
          totVal: 0,
        };
    }
    

    componentDidMount(){
      this.emailUserMatch();
      this.getEmailUsersName();
    }

    //Method that tries to find 
    emailUserMatch = async () => {
        var message = Office.context.mailbox.item;
        var user = Office.context.mailbox.userProfile.displayName;
        var normalized = user.toLowerCase();
        var nameArray = normalized.split(" ");
        let self = this;
        var count = 0;

        message.body.getAsync(Office.CoercionType.Text,
            function callback(result) {
              if (result.status === Office.AsyncResultStatus.Succeeded) {
                var bodyString = result.value.replace(/[\t\n\r]/gm,'');
                var eBodyString = bodyString.toLocaleLowerCase();

                for(var i = 0; i < nameArray.length; i++){
                  if(eBodyString.includes(nameArray[i])){
                    count++;
                  }
                }

                //Checks if email is sent by yourself, if so all values becomes 100%
                var item2 = Office.context.mailbox.item.sender.displayName;
                var no = " ";
                if(item2 == user){
                  self.receiverScore(10);
                  self.spamWordsCheck(no);
                  self.totEvaluation(100, 100, 100);
                  self.setState({
                    nameCount: 'enough',
                  });
                }
                else if(eBodyString.includes(normalized)){
                  self.receiverScore(10);
                  self.spamWordsCheck(eBodyString);
                  self.totEvaluation(self.state.receiverScore, self.state.dictScore, self.state.encodeScore);
                  self.setState({
                    nameCount: 'enough',
                  });
                }else{

                self.receiverScore(count);
                self.spamWordsCheck(eBodyString);
                self.totEvaluation(self.state.receiverScore, self.state.dictScore, self.state.encodeScore);
                }
              }else{
                console.log(result.error);
              }
        });
    }

    getEmailUsersName = async () => {
        var user = Office.context.mailbox.userProfile.displayName;
        this.setState({
            displayName: user,
        });
        return user;
    }

    //Checks if any words found in the email matches words in the spamWordData.json file
    spamWordsCheck = async (content) => {
      var json = spamWordData;
      var tempArray = [];
      var count = 0;
      let self = this;

      for(var i = 0; i < json.words.length; i++){
        if((content.match(new RegExp(json.words[i], "g")) || []).length){
          count++;
          tempArray.push(json.words[i]);
        }
      }

      self.setState({
        list: tempArray,
        spamWordCount: count,
      });
      self.dictionaryScore(count);
    }

    //Score calculations:

    //receiver score
    receiverScore = async (count) => {
      let self = this;
      if(count === 0){
        self.setState({
          receiverScore: 0,
          nameCount: count,
        });
      }else{
        var score = (count * 30);
        if(score >= 100){
          score = 100;
        }
        self.setState({
          receiverScore: score,
          nameCount: count,
        });
      }
      self.progBar(self.state.receiverScore, "bar_1");
    }

    //#phishing word score
    dictionaryScore = async (c) => {
      let self = this;
      var tot = 100;
      var num = (c * 2);
      var score = tot - num;
      var roundedScore = score.toFixed(2);
      self.setState({
        dictScore: roundedScore
      });
      self.progBar(self.state.dictScore, "bar_2");
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
    totEvaluation = async (a,b) => {
      var one = parseInt(a, 10);
      var two = parseInt(b, 10);
      var value = ((one + two) / 2 );
      let self = this;
      var roundedScore = value.toFixed(0);
      self.setState({
        totVal: roundedScore,
      });
      self.progBar(roundedScore, "bar_4");
      var lang = self.state.totVal;
      self.props.onMessageScore(lang);
    }

    //Sends content score to MainList.js using props
    handleMesageScore = async () => {
      var lang = this.state.totVal;
      this.props.onMessageScore(lang);            
  }

    render(){
      const { classes } = this.props;
    return (
        <div className={classes.root}>
          <div className={classes.cards}>
          <Typography variant="h6" component="h3">
            Message Content
            </Typography>
          
        <Paper className={classes.card}>
          <div className={classes.flexContainer}>
            <div>
            <Typography variant="h6" component="h3">
            Receiver
            </Typography>
            </div>
            <div>
            <MouseOverPopover tekst="Phishing emails are usually anonymous and does not address the receiver. 
            They usually do not contain any proof of relation such as knowing the name of the receiver."/>
            </div>
            </div>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="bar_1"><p><b>{this.state.receiverScore}%</b></p></div>
            </div>
            <p>
              Surname or last name of <b>{this.state.displayName}</b>, was metioned <b>{this.state.nameCount}</b> time in this email.
            </p>
        </Paper>
        <Paper className={classes.card}>
        <div className={classes.flexContainer}>
            <div>
            <Typography variant="h6" component="h3">
            Phishing words
            </Typography>
            </div>
            <div>
            <MouseOverPopover tekst="It is very common that emails containing certain words related
             to urgency, fear, username/password changes or 
             economic loss/gain is some sort phishing email trying to get your personal information."/>
            </div>
            </div>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="bar_2"><p><b>{this.state.dictScore}%</b></p></div>
            </div>
            <p>
                Phishing words found: <b>{this.state.spamWordCount}</b>
            </p>
            <p>Words:</p>
            <div className={classes.phishingWordList}>
              {this.state.list.map(item => (
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
            <MouseOverPopover tekst="A total evaluation of the attributes found in email content.
            The score is an average of the attributes."/>
            </div>
            </div>
            <div className={classes.prosentOnBar}>
              <div className={classes.bar} id="bar_4"><p><b>{this.state.totVal}%</b></p></div>
            </div>
            <p>
              Total evaluation in prosent
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

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Content);