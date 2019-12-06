import React, { Component } from "react";
import { AppDB, AppAUTH } from "./db-init";


import {TextField, Button, Card, CardContent, Typography} from '@material-ui/core/';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: "",
            userPassword: ""
        }
    }

    render() {
        return (
            <div>
                <Typography style={{marginTop:200}} variant ='h2' color= 'primary' align='center'>Login page</Typography>
                <Card align='center' style={{marginTop:50 }}>
                    <CardContent>
                    
                    <TextField style={{marginRight:10}} variant = 'filled' type="text" label='Email' name="userEmail" value={this.state.userEmail}
                        onChange={(e) => this.updateFormData(e)} />
                    
                    <TextField type="password" variant = 'filled' label='Password' name="userPassword" value={this.state.userPassword}
                        onChange={(e) => this.updateFormData(e)} />
                    <div>
                        <Button style={{width:200, marginRight:5}} variant= 'outlined' onClick={() => this.doSignUp()}>SignUp</Button>
                        <Button style={{width:200, marginLeft:5}} variant= 'contained' color='primary' onClick={() => this.doSignIn()}>SignIn</Button>
                    </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    doSignUp() {
        AppAUTH.createUserWithEmailAndPassword(this.state.userEmail, this.state.userPassword)
            .then(u => {
                console.log("User created with UID " + u.user.uid);

                AppDB.ref("Users")
                    .push()
                    .set({
                        email: this.state.userEmail,
                        creationTime: u.user.metadata.creationTime
                    });

                this.doSignIn();
            })
            .catch(err => {
                console.log("Error " + err);
            });
    }

    doSignIn() {

        AppAUTH.signInWithEmailAndPassword(this.state.userEmail, this.state.userPassword)
            .then(u => {
                console.log("You logged in as " + u.user.email);
                this.props.history.push({ pathname: "/home", state: { userEmail: this.state.userEmail } });
            })
            .catch(err => {
                console.log("Error " + err);
            });
    }

    updateFormData(ev) {
        if (ev.target.type === "number") {
            this.setState({ [ev.target.name]: Number(ev.target.value) });
        } else {
            this.setState({ [ev.target.name]: ev.target.value });
        }
    }

}

export default Login;