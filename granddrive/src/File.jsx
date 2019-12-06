import React, { Component } from "react";
import { AppDB } from "./db-init";

class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myKey: this.props.myKey,
            owner: this.props.owner,
            docName: this.props.docName,
            docDesc: this.props.docDesc,
            sharedWith: this.props.sharedWith,
            url: this.props.url,
            delete: this.props.delete,
            recentlySelectedHandler: this.props.recentlySelectedHandler
        }
    }

    render() {

        this.delete = this.state.delete;

        return (
            <div >
                {this.state.docName} {this.state.docDesc}
                {this.delete
                    &&
                    <button onClick={() => this.deleteSelected()}>Delete</button>
                }
                <button onClick={() => this.changeSelected()}>Open</button>

            </div >
        );
    }

    changeSelected() {
        this.state.recentlySelectedHandler(this.state);
    }

    deleteSelected() {
        console.log(`Removing ${this.state.myKey}`)
        AppDB.ref('Documents')
            .child(this.state.myKey)
            .remove();
    }
}

export default File;