import * as React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import Progress from "./Progress";
import Sender from "./Sender";
import MainList from "./MainList";
import Content from "./Content";
import Links from "./Links";
import Authentication from "./Authentication";
import Attachments from "./Attachments";
import TotalEvaluation from "./TotalEvaluation";


export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      listItems: [],
    };
  }

  componentDidMount() {
    this.setState({
      listItems: []
    });
  }

  click = async () => {
    var item = Office.context.mailbox.item;
    console.log(item.subject);
  };

  render() {
    const { title, isOfficeInitialized } = this.props;
    //init office -> loading
    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    //routing path to components
    return (
      <div className="ms-welcome">
        <Switch>
          <Route exact path="/" component={MainList}/>
          <Route path="/totalevaluation" component={TotalEvaluation}/>
          <Route path="/sender" component={Sender}/>
          <Route path="/content" component={Content}/>
          <Route path="/links" component={Links}/>
          <Route path="/authentication" component={Authentication}/>
          <Route path="/attachments" component={Attachments}/>
        </Switch>
      </div>
    );
  }
}
