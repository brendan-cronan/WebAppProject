import React, { Component } from "react";
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
        return (<div>
            <h2>Documents</h2>
            <ul>
                {this.state.docs.map(x =>
                    <li>{x.name} {x.ownerId}</li>)}
            </ul>
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
}

export default Home;