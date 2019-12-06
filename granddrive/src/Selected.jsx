import React, { Component } from "react";
import { AppDB } from "./db-init";

class Selected extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: null,
            docName: null,
            docDesc: null,
            url: null
        }
    }

    render() {
        return (
            <div>
                {this.state.docName}
                {this.state.docDesc}
                {this.state.owner}
                {this.state.url !== null ? <button onClick={() => this.openFile()}>View</button> : null}

            </div>
        );
    }

    updateState(ev) {
        this.setState({ owner: ev.owner, docName: ev.docName, docDesc: ev.docDesc, url: ev.url })
    }

    openFile() {
        window.open(this.state.url, "_blank");
    }
}

export default Selected;
