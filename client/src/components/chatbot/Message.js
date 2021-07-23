import React from 'react';

const Message = (props) => {
    return (
        <div className="col s12 m8 offset-m2 offset-l3">
            <div className="card-panel grey lighten-5 z-depth-1">
                <div className="row valign-wrapper">
                    {props.speaks === 'bot' &&
                        <div className="col s2">
                            {/* eslint-disable-next-line */}
                            <a className="waves-effect waves-light btn">{props.speaks}</a>
                        </div>
                    }
                    
                    <div className="col s10">
                        <span className="black-text">
                            {props.text}
                        </span>
                    </div>

                    {props.speaks === 'me' &&
                        <div className="col s2">
                            {/* eslint-disable-next-line */}
                            <a className="waves-effect waves-light btn">{props.speaks}</a>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default Message;