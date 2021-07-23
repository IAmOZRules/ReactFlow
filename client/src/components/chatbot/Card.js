import React from 'react';

const Card = (props) => {
    return (
        <div className="col s12 m8 offset-m2 offset-l3" style={{ width: 270, paddingRight: 30, }}>
            <div className="card">
                <div className="card-image" style={{ width: 240 }}>
                    <img
                        src={props.payload.fields.image.stringValue}
                        alt={props.payload.fields.header.stringValue}
                    />
                </div>

                <div className="card-content">
                    <b><span className="card-title">{props.payload.fields.header.stringValue}</span></b>

                    {props.payload.fields.description.stringValue}
                    {/* eslint-disable-next-line */}
                    <p><a>{props.payload.fields.price.stringValue}</a></p>
                </div>

                <div className="card-action">
                    {/* eslint-disable-next-line */}
                    <a target="_blank" rel="noopener noreferrer"
                        href={props.payload.fields.link.stringValue}>
                        LINK TO THE COURSE
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Card;