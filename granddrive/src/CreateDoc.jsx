import React, { Component } from "react";
import { AppDB } from "./db-init";

class CreateDoc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            owner: this.props.userEmail,
            docName: "",
            docDesc: "",
            file: "",
            updateTab: this.props.updateTab
        }

    }

    render() {
        return (<div>
            <div>
                <label>Name:</label>
                <input type="text" name="docName" onChange={(e) => this.updateFormData(e)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" name="docDesc" onChange={(e) => this.updateFormData(e)} />
            </div>

            <div>
                <label>Share With:</label>
                <input type="text" name="shareWith" />
            </div>

            <div>
                <input type="file" ref="file" name="file" onChange={(e) => this.updateFormData(e)}></input>
            </div>

            <div>
                <button onClick={() => this.uploadFile()}>Upload</button>
            </div>

        </div>);
    }

    uploadFile() {
        AppDB.ref("Documents")
            .push()
            .set({
                docName: this.state.docName,
                docDesc: this.state.docDesc,
                ownerEmail: this.state.owner

            });
        this.state.updateTab('myDocs');
    }

    updateFormData(ev) {
        if (ev.target.type === "number") {
            this.setState({ [ev.target.name]: Number(ev.target.value) });
        } else {
            this.setState({ [ev.target.name]: ev.target.value });
        }
    }

}

export default CreateDoc;