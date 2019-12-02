import React, { Component } from "react";
import { AppDB } from "./db-init";

class CreateDoc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            docs: [],
            activeTab: "myDocs",
            owner: this.props.userEmail
        }

    }

    render() {
        return (<div>
            <div>
                <label>Name:</label>
                <input type="text" name="docName" />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" name="docDesc" />
            </div>

            <div>
                <label>Share With:</label>
                <input type="text" name="shareWith" />
            </div>

            <div>
                <input type="file" ref="file" name="file"></input>
            </div>

            <div>
                <button>Upload</button>
            </div>

        </div>);
    }

}

export default CreateDoc;