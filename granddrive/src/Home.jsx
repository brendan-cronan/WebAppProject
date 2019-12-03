import React, { Component } from "react";
import './Home.css'
import { AppDB } from "./db-init";
import CreateDoc from './CreateDoc';


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userEmail: this.props.location.state.userEmail,
            docs: [],
            activeTab: "myDocs"
        }


    }

    componentDidMount() {
        AppDB.ref("Documents").on('child_added', (s) => this.fbAddHandler(s));
        AppDB.ref("Documents").on("child_removed", (s) => this.fbRemoveListener(s));
    }

    render() {
        return (

            <div id="container">

                <section id="toolbar">
                    <button id="uploadDoc" className="menuitem" onClick={this.newButtonHandler.bind(this)}>Upload</button>
                    <span className="filler"></span>
                    <button className="menuitem" onClick={this.optionsButtonHandler.bind(this)}>Options</button>
                    <button className="menuitem" onClick={this.signoutButtonHandler.bind(this)}>Sign Out</button>
                </section>
                <section id="navpanel">
                    <span id="myDocs" className="navitem" onClick={this.menuItemHandler.bind(this)}>My Documents</span>
                    <span id="shared" className="navitem" onClick={this.menuItemHandler.bind(this)}>Shared with Me</span>
                    <span id="recent" className="navitem" onClick={this.menuItemHandler.bind(this)}>Recent</span>

                </section>
                <section id="main">
                    <h2>Documents</h2>

                    <div className={this.state.activeTab === "myDocs" ? "" : "inactive"}>
                        Documents owned by {this.state.userEmail} go here </div>
                    <div className={this.state.activeTab === "shared" ? "" : "inactive"}>
                        Documents shared with {this.state.userEmail} go here
                    </div >
                    <div className={this.state.activeTab === "recent" ? "" : "inactive"}>
                        Recent documents go here
                    </div>
                    <div className={this.state.activeTab === "uploadDoc" ? "" : "inactive"}>
                        <CreateDoc userEmail={this.state.userEmail} updateTab={this.updateTab.bind(this)} />
                    </div>


                    <ul>
                        {this.state.docs.map((x, i) =>
                            <li key={i}>{x.docName} {x.docDesc} {x.ownerEmail}</li>)}
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
        this.menuItemHandler(ev);
        console.log('new button pressed');
    }

    optionsButtonHandler(ev) {
        console.log('options button pressed')
    }

    signoutButtonHandler(ev) {
        console.log('signout button pressed')
    }

    menuItemHandler(ev) {
        let tab = ev.currentTarget.id;
        this.updateTab(tab);
    }

    updateTab(tab) {
        console.log(`switching active tab to ${tab}`)
        this.setState({ activeTab: tab });
    }
}

export default Home;