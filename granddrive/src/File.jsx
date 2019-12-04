import React, { Component } from "react";

class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: this.props.owner,
            docName: this.props.docName,
            docDesc: this.props.docDesc,
            url: this.props.url
        }
    }

    render() {
        return (
            <div>
                {this.state.docName} {this.state.docDesc} <button onClick={() => this.openFile()}>Open</button>
            </div >
        );
    }

    openFile() {
        window.open(this.state.url, "_blank");
    }
}

export default File;