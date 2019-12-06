import React, { Component } from "react";
import { AppDB, AppAUTH } from "./db-init";

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
                <h2>Login page</h2>
                <div>
                    <label>Email</label>
                    <input type="text" name="userEmail" value={this.state.userEmail}
                        onChange={(e) => this.updateFormData(e)} />
                    <label>Password</label>
                    <input type="password" name="userPassword" value={this.state.userPassword}
                        onChange={(e) => this.updateFormData(e)} />
                    <div>
                        <button onClick={() => this.doSignUp()}>SignUp</button>
                        <button onClick={() => this.doSignIn()}>SignIn</button>
                    </div>

                </div>
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