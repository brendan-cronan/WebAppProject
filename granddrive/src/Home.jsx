import React, { Component } from "react";
import './Home.css'
import { AppDB } from "./db-init";
import CreateDoc from './CreateDoc';
import File from './File';
import Selected from './Selected'


class Home extends Component {



    constructor(props) {
        super(props);
        this.selected = React.createRef();
        this.state = {
            userEmail: this.props.location.state.userEmail,
            docs: [],
            activeTab: "myDocs",
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

                    <div className={this.state.activeTab === "myDocs" ? "" : "inactive"}>
                        <h2>My Documents</h2>
                        {this.state.docs.filter(doc => {
                            return doc.ownerEmail === this.state.userEmail;
                        }).map((x, i) =>
                            <File key={x.mykey}
                                owner={x.ownerEmail}
                                docName={x.docName}
                                docDesc={x.docDesc}
                                sharedWith={x.sharedWith}
                                url={x.url}
                                delete={true}
                                recentlySelectedHandler={this.recentlySelectedHandler.bind(this)}
                            />)
                        }
                    </div>
                    <div className={this.state.activeTab === "shared" ? "" : "inactive"}>
                        <h2>Shared with Me</h2>
                        {this.state.docs.filter(doc => {
                            return doc.ownerEmail !== this.state.userEmail;
                        }).map((x, i) =>
                            <File key={x.mykey}
                                owner={x.ownerEmail}
                                docName={x.docName}
                                docDesc={x.docDesc}
                                sharedWith={x.sharedWith}
                                url={x.url}
                                delete={false}
                                recentlySelectedHandler={this.recentlySelectedHandler.bind(this)}
                            />)
                        }
                    </div >
                    <div className={this.state.activeTab === "recent" ? "" : "inactive"}>
                        Recent documents go here
                    </div>
                    <div className={this.state.activeTab === "uploadDoc" ? "" : "inactive"}>
                        <CreateDoc userEmail={this.state.userEmail} updateTab={this.updateTabHandler.bind(this)} />
                    </div>
                </section>
                <section id="most-recent">
                    <Selected ref={this.selected}
                    />
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
        this.updateTabHandler(tab);
    }

    updateTabHandler(tab) {
        console.log(`switching active tab to ${tab}`)
        this.setState({ activeTab: tab });
    }

    recentlySelectedHandler(ev) {
        console.log(ev)
        this.selected.current.updateState(ev);
        //this.setState({ mostRecentlySelected: ev });
    }
}

export default Home;