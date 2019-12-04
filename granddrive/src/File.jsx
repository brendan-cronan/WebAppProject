import React, { Component } from "react";
import { AppDB } from "./db-init";

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
                Here {this.state.docName}
            </div>
        );
    }
}

export default File;