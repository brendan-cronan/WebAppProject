import React, { Component } from "react";

class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: this.props.owner,
            docName: this.props.docName,
            docDesc: this.props.docDesc,
            url: this.props.url,
            recentlySelectedHandler: this.props.recentlySelectedHandler
        }
    }

    render() {
        return (
            <div >
                {this.state.docName} {this.state.docDesc} <button onClick={() => this.openFile()}>Open</button>

            </div >
        );
    }

    openFile() {
        window.open(this.state.url, "_blank");
        this.state.recentlySelectedHandler(this.state);
    }
}

export default File;