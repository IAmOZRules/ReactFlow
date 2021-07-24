import React, { Component } from 'react';

import QuickReply from './QuickReply';


class QuickReplies extends Component {
    constructor(props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick(event, payload, text) {
        this.props.replyClick(event, payload, text);
    }

    renderQuickReply(reply, index) {
        return <QuickReply key={index} click={this._handleClick} reply={reply} />;
    }

    renderQuickReplies(quickReplies) {
        if (quickReplies) {
            return quickReplies.map((reply, index) => {
                return this.renderQuickReply(reply, index);
            });
        } else {
            return null;
        }
    }

    render() {
        return (
            <div id="quick-replies" className="col s10" style={{ display: 'inline-block' }}>
                {this.props.text && <p>
                    {this.props.text.stringValue}
                </p>}
                {this.renderQuickReplies(this.props.payload)}
            </div>
        );
    }
}

export default QuickReplies;