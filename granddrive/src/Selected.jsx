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
            </div>
        );
    }

    updateState(ev) {
        this.setState({ owner: ev.owner, docName: ev.docName, docDesc: ev.docDesc, url: ev.url })
    }
}

export default Selected;
