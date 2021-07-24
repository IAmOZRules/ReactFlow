import React, { Component } from 'react';
import axios from 'axios/index';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';

import Card from './Card';
import Message from './Message';
import QuickReplies from './QuickReplies';

const cookies = new Cookies();

class Chatbot extends Component {
    messagesEnd;
    constructor(props) {
        super(props);

        this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
        this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);
        this.state = {
            messages: []
        };

        if (cookies.get('userID') === undefined) {
            cookies.set('userID', uuid(), { path: '/' });
        }
    }

    async df_text_query(queryText) {
        let says = {
            speaks: 'me',
            msg: queryText,
            payload: null,
            msg2: null,
            quickReply: null
        };

        this.setState({ messages: [...this.state.messages, says] });

        let res = await axios.post('/api/df_text_query', { text: queryText, userID: cookies.get('userID') });

        // for (let msg of res.data.fullfillmentMessages) {
        if (res.data.fulfillmentMessages[3]) {
            says = {
                speaks: 'bot',
                msg: res.data.fulfillmentMessages[0].text.text[0],
                payload: res.data.fulfillmentMessages[1].payload.fields.cards.listValue.values,
                msg2: res.data.fulfillmentMessages[2].text.text[0],
                quickReply: res.data.fulfillmentMessages[3].payload.fields.quick_replies.listValue.values
            }
        } else if (res.data.fulfillmentMessages[2]) {
            says = {
                speaks: 'bot',
                msg: res.data.fulfillmentMessages[0].text.text[0],
                payload: res.data.fulfillmentMessages[1].payload.fields.cards.listValue.values,
                msg2: res.data.fulfillmentMessages[2].text.text[0],
                quickReply: null
            }
        } else if (res.data.fulfillmentMessages[1]) {
            says = {
                speaks: 'bot',
                msg: res.data.fulfillmentMessages[0].text.text[0],
                payload: res.data.fulfillmentMessages[1].payload.fields.cards.listValue.values,
                msg2: null,
                quickReply: null
            }
        } else {
            says = {
                speaks: 'bot',
                msg: res.data.fulfillmentMessages[0].text.text[0],
                payload: null,
                quickReply: null
            }
        }

        this.setState({ messages: [...this.state.messages, says] });
        // }
    }

    async df_event_query(eventName) {
        let says;
        let res = await axios.post('/api/df_event_query', { event: eventName, userID: cookies.get('userID') });

        // for (let msg of res.data.fullfillmentMessages) {
        says = {
            speaks: 'bot',
            msg: res.data.fulfillmentMessages[0].text.text[0],
            payload: null
        }
        this.setState({ messages: [...this.state.messages, says] });
        // }
    }

    componentDidMount() {
        this.df_text_query('Hello!');
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    _handleQuickReplyPayload(event, payload, text) {
        event.preventDefault();
        event.stopPropagation();

        this.df_text_query(text);

    }

    renderCards(message) {
        return message.payload.map((card, index) => <Card key={index} payload={card.structValue} />)
    }

    renderFinalMessages(message, index) {
        if (message.msg && message.payload && message.msg2 && message.quickReply) {
            return (
                <div key={index}>
                    <div className="card-panel grey lighten-5 z-depth-1">
                        <div style={{ overflow: 'hidden' }}>
                            <div className="row valign-wrapper">
                                <div className="col s2">
                                    {/* eslint-disable-next-line */}
                                    <a className="waves-effect waves-light btn">{message.speaks}</a>
                                </div>

                                <div className="col s10">
                                    <span className="black-text">
                                        {message.msg}
                                    </span>
                                </div>
                            </div>

                            <div style={{ overflowY: 'hidden' }}>
                                <div style={{ width: message.payload.length * 270, display: 'flex', flexDirection: 'row' }}>
                                    {this.renderCards(message)}
                                </div>
                            </div>

                            <div className="row valign-wrapper" style={{marginTop: '2rem'}}>
                                <div className="col s2">
                                    {/* eslint-disable-next-line */}
                                    <a className="waves-effect waves-light btn">{message.speaks}</a>
                                </div>

                                <div className="col s10">
                                    <span className="black-text">
                                        {message.msg2}
                                    </span>
                                </div>
                                <QuickReplies speaks={message.says} payload={message.quickReply} />
                            </div>

                            {/* <div className="col s10" style={{ marginTop: '1rem' }}>
                            </div> */}
                        </div>
                    </div>
                </div>
            );
        } else if (message.msg && message.payload && message.quickReply) {
            return (
                <div key={index}>
                    <div className="card-panel grey lighten-5 z-depth-1">
                        <div style={{ overflow: 'hidden' }}>
                            <div className="row valign-wrapper">
                                <div className="col s2">
                                    {/* eslint-disable-next-line */}
                                    <a className="waves-effect waves-light btn">{message.speaks}</a>
                                </div>

                                <div className="col s10">
                                    <span className="black-text">
                                        {message.msg}
                                    </span>
                                </div>
                            </div>

                            <div style={{ overflowY: 'hidden' }}>
                                <div style={{ width: message.payload.length * 270, display: 'flex', flexDirection: 'row' }}>
                                    {this.renderCards(message)}
                                </div>
                            </div>

                            <div className="col s10">
                                <QuickReplies speaks={message.says} payload={message.quickReply} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (message.msg && message.payload) {
            return (
                <div key={index}>
                    <div className="card-panel grey lighten-5 z-depth-1">
                        <div style={{ overflow: 'hidden' }}>
                            <div className="row valign-wrapper">
                                <div className="col s2">
                                    {/* eslint-disable-next-line */}
                                    <a className="waves-effect waves-light btn">{message.speaks}</a>
                                </div>

                                <div className="col s10">
                                    <span className="black-text">
                                        {message.msg}
                                    </span>
                                </div>
                            </div>

                            <div style={{ overflowY: 'hidden' }}>
                                <div style={{ width: message.payload.length * 270, display: 'flex', flexDirection: 'row' }}>
                                    {this.renderCards(message)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else if (!message.payload) {
            return <Message key={index} speaks={message.speaks} text={message.msg} />
        }
    }

    renderMessages(stateMessages) {
        if (stateMessages) {
            return stateMessages.map((message, index) => {
                return this.renderFinalMessages(message, index);
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(event) {
        if (event.key === "Enter") {
            this.df_text_query(event.target.value);
            event.target.value = '';
        }
    }

    render() {
        return (
            <div style={{
                    maxHeight: '75%',
                    width: '43%',
                    position: "absolute", bottom: 0, right: 0,
                border: '1px solid lightgrey',
                borderRadius: 5
            }}>
                <nav>
                    <div className="nav-wrapper">
                        {/* eslint-disable-next-line */}
                        <a className="brand-logo center">Chatbot</a>
                    </div>
                </nav>

                <div id="chatbot" style={{ height: 400, width: '100%', overflow: 'auto' }}>
                    {this.renderMessages(this.state.messages)}

                    <div ref={(el) => { this.messagesEnd = el; }}
                        style={{ float: 'left', clear: "both" }}>
                    </div>
                </div>
                <div style={{ padding: '5px 2rem' }}>
                    <input type="text" id="input"
                        placeholder="Type your message here..."
                        onKeyPress={this._handleInputKeyPress}
                        autoFocus={true}
                        style={{
                            bottom: 0
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default Chatbot;