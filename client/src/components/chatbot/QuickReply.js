import React from 'react';

const QuickReply = (props) => {
    if (props.reply.structValue.fields.payload) {
        return (
            <a href="/" style={{ margin: 2 }}
                className="waves-effect waves-light btn-small red"
                onClick={(event) => {
                    props.click(
                        event,
                        props.reply.structureValue.fields.payload.stringValue,
                        props.reply.structureValue.fields.text.stringValue,
                    )
                }}>
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    } else {
        return (
            <a style={{ marginLeft: 2 }}
                href={props.reply.structValue.fields.link.stringValue}
                className="waves-effect waves-light btn-small red">
                {props.reply.structValue.fields.text.stringValue}
            </a>
        );
    }
}

export default QuickReply;