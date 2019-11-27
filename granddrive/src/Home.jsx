import React, { Component } from "react";
import './Home.css'
import { AppDB } from "./db-init";

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            docs: []
        }
    }

    componentDidMount() {
        AppDB.ref("Documents").on('child_added', (s) => this.fbAddHandler(s));
        AppDB.ref("Documents").on("child_removed", (s) => this.fbRemoveListener(s));
    }

    render() {
        return (<div id="container">

            <section id="toolbar">
                <button className="menuitem" onClick={this.newButtonHandler.bind(this)}>New</button>
                <span className="filler"></span>
                <button className="menuitem" onClick={this.optionsButtonHandler.bind(this)}>Options</button>
                <button className="menuitem" onClick={this.signoutButtonHandler.bind(this)}>Sign Out</button>
            </section>
            <section id="navpanel">
                <span className="navitem">My Documents</span>
                <span className="navitem">Shared with Me</span>
                <span className="navitem">Recent</span>

            </section>
            <section id="main">
                <h2>Documents</h2>
                <ul>
                    {this.state.docs.map((x, i) =>
                        <li key={i}>{x.name} {x.ownerId}</li>)}
                </ul>
            </section>
        </div>);
    }

    fbAddHandler(snapshot) {
        const item = snapshot.val();

        const newDocs = this.state.docs.slice(); /* creates a copy */
        newDocs.push({ ...item, mykey: snapshot.key }); /* adds a new item */

        this.setState({ docs: newDocs });
    }

    fbRemoveListener(snapshot) {
        /* snapshot.key will hold the key of the item being REMOVED */
        const newDocs = this.state.docs.slice().filter(z => z.mykey !== snapshot.key);
        this.setState({ docs: newDocs });
    }

    updateFormData(ev) {
        if (ev.target.type === "number") {
            this.setState({ [ev.target.name]: Number(ev.target.value) });
        } else {
            this.setState({ [ev.target.name]: ev.target.value });
        }
    }

    buttonHandler(ev) {
        console.log(ev.target + ' pressed')
    }

    newButtonHandler(ev) {
        console.log('new button pressed');
    }

    optionsButtonHandler(ev) {
        console.log('options button pressed')
    }

    signoutButtonHandler(ev) {
        console.log('signout button pressed')
    }
}

export default Home;