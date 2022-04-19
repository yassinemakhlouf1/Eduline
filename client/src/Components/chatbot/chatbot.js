import 'materialize-css/dist/css/materialize.min.css';
import React, {Component} from 'react';

import axios from "axios/index";

import Message from './Message';
import Card from './Card';

class Chatbot extends Component {

    messagesEnd;
    talkInput;
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

        this.state = {
            messages: []
        }
    }

    // text messages
    async df_text_query(text) {
        let says = {
            speaks: 'me',
            msg: {
                text: {
                    text: text
                }
            }
        };
        this.setState({ messages: [...this.state.messages, says]});
        const res = await axios.post('/api/df_text_query',  {text});

        for (let msg of res.data.fulfillmentMessages) {
            console.log(JSON.stringify(msg));
            says = {
                speaks: 'bot',
                msg: msg
            }
            this.setState({ messages: [...this.state.messages, says]});
        }
    };

    // event messages
    async df_event_query(event) {
        const res = await axios.post('/api/df_event_query',  {event});

        for (let msg of res.data.fulfillmentMessages) {
            let says = {
                speaks: 'bot',
                msg: msg
            }

            this.setState({ messages: [...this.state.messages, says]});
        }
    };

    componentDidMount() {
        this.df_event_query('Welcome');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        this.talkInput.focus();
    }


    _handleQuickReplyPayload(event, payload, text) {
        event.preventDefault();
        event.stopPropagation();

        this.df_text_query(text);
    }


    renderCards(cards) {
        return cards.map((card, i) => <Card key={i} payload={card.structValue}/>);
    }

    renderOneMessage(message, i) {
        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
        } else if (message.msg && message.msg.payload.fields.cards) {
            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                       <div className="col s2">
                           <a href="/" className="btn-floating btn-large waves-effect waves-light  teal lighten-2">{message.speaks}</a>
                       </div>
                       <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        }
    }

    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, i) => {
                return this.renderOneMessage(message, i);
                });
        } else {
            return null;
        }
    }


    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }

    render() {
        return (
            <div style={{ height: 500, width: 400, position: 'absolute', bottom: 0, right: 0, border: '1px solid lightgray'}}>
                <nav>
                    <div className="nav-wrapper">
                        <a href="/" className="brand-logo">ChatBot</a>
                    </div>
                </nav>

                <div id="chatbot" style={{ height: 388, width: '100%', overflow: 'auto' }}>
                    {this.renderMessages(this.state.messages)}
                    <div ref={(el) => { this.messagesEnd = el; }}
                         style={{ float:"left", clear: "both" }}>
                    </div>
                </div>
                <div className="col s12">
                    <input style={{margin: 0, paddingLeft: '1%', paddingRight: '1%', width: '98%'}} placeholder="type your message:" type="text" ref={(input) => { this.talkInput = input; }} onKeyPress={this._handleInputKeyPress}  />
                </div>
            </div>
        )
    }
}

export default Chatbot;