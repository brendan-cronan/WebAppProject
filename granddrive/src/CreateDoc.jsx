import React, { Component } from "react";
import { AppDB, AppStorage } from "./db-init";


import { TextField, Button, Card, CardContent } from '@material-ui/core/';
import { Autocomplete } from '@material-ui/lab/';

import { AddCircle } from '@material-ui/icons';

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
            <div align='center' >
                <TextField id="docName" style={{ width: 400 , marginBottom:5 }} variant="filled" label="Document Name" name="docName" onChange={(e) => this.updateFormData(e)} />
            </div>
            <div align='center'>
                <TextField id="docDesc" style={{ width: 400 }} variant="filled" label="Document Description" name="docDesc" onChange={(e) => this.updateFormData(e)} />
            </div>

            <div align='center'>
            <Card style={{ width: 400, marginBottom: 15, marginTop: 30 }} align='center'>
            <CardContent>
            <Autocomplete
                    id="sharedWith"
                    options={this.props.users.filter((user) => {
                        return user.email !== this.state.owner;
                    }).map((user) =>
                        user.email
                    )}


                    style={{ width: 370, marginTop: 30 }}
                    renderInput={params => (
                        <TextField {...params} label="User" variant="outlined" fullWidth />
                    )}
                />

                <Button startIcon={<AddCircle />} color="primary" onClick={() => this.addShared()}>Add</Button>

                
                </CardContent>
                </Card>
            </div>

            <div align='center'>
                <input
                    accept="file/*"
                    id="file"
                    multiple
                    type="file"

                    style={{ display: 'none' }}
                    onChange={(e) => this.updateFile(e)}
                />

                <Card style={{ width: 400, marginBottom: 15, marginTop: 30 }} align='center'>
                    <CardContent>
                        <label htmlFor="file" style={{ marginLeft: 10 }}>
                            <Button variant="outlined" name="file" style={{ marginRight: 10 }} color="primary" component="span">
                                Choose File
                        </Button>
                        </label>
                        <label id="file_name" name="file_name">
                            File
                    </label>
                    </CardContent>
                </Card>




            </div>

            <div align='center'>
                <Button variant="contained" color="primary" onClick={() => this.uploadFile()}>Upload</Button>
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
                document.getElementById('file_name').innerHTML = "File";


            });
        });
    }

    updateFile(e) {
        if (e.target.files[0]) {
            const userFile = e.target.files[0];
            this.setState({ userFile: userFile });
            document.getElementById('file_name').innerHTML = userFile.name;

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