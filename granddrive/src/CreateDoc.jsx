import React, { Component } from "react";
import { AppDB, AppStorage } from "./db-init";

class CreateDoc extends Component {

    constructor(props) {
        super(props);
        this.state = {
            owner: this.props.userEmail,
            docName: "",
            docDesc: "",
            sharedWith: [],
            userFile: null,
            url: '',

            updateTab: this.props.updateTab
        }

    }

    render() {
        return (<div>
            <div>
                <label>Name:</label>
                <input type="text" id="docName" name="docName" onChange={(e) => this.updateFormData(e)} />
            </div>
            <div>
                <label>Description:</label>
                <input type="text" id="docDesc" name="docDesc" onChange={(e) => this.updateFormData(e)} />
            </div>

            <div>
                <label>Share With:</label>
                <input type="text" id="sharedWith" name="sharedWith" />
                <button onClick={() => this.addShared()}>+</button>
            </div>

            <div>
                <input type="file"
                    ref="file"
                    name="file"
                    id="file"
                    onChange={(e) => this.updateFile(e)}
                ></input>
            </div>

            <div>
                <button onClick={() => this.uploadFile()}>Upload</button>
            </div>

        </div >);
    }

    uploadFile() {

        const userFile = this.state.userFile;

        let dest;

        if (userFile.type.match(/^image\/.*$/)) {
            dest = `images/${this.state.owner}`;
        } else if (userFile.type.match(/^.*\/pdf$/)) {
            dest = `pdf/${this.state.owner}`;
        } else {
            dest = `text/${this.state.owner}`
        }


        const uploadTask = AppStorage.ref(`${dest}/${userFile.name}`).put(userFile);
        uploadTask.on('state_changed', (snapshot) => {
            //progress
        }, (error) => {
            console.log(error);
        }, () => {
            //complete    
            AppStorage.ref(dest).child(userFile.name).getDownloadURL().then(url => {
                console.log(url);

                AppDB.ref("Documents")
                    .push()
                    .set({
                        docName: this.state.docName,
                        docDesc: this.state.docDesc,
                        ownerEmail: this.state.owner,
                        sharedWith: this.state.sharedWith,
                        url: url,


                    });
                this.state.updateTab('myDocs');
                this.setState({ docName: '', docDesc: '', userFile: null, url: '', sharedWith: [] });
                document.getElementById('docName').value = '';
                document.getElementById('docDesc').value = '';
                document.getElementById('file').value = null;

            });
        });
    }

    updateFile(e) {
        if (e.target.files[0]) {
            const userFile = e.target.files[0];
            this.setState({ userFile: userFile });
            console.log(userFile)
        }
    }

    addShared() {
        console.log('Sharing with ' + document.getElementById('sharedWith').value);
        this.state.sharedWith.push(document.getElementById('sharedWith').value)
        document.getElementById('sharedWith').value = '';
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