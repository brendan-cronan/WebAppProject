import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AppDB } from "./db-init.js";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

AppDB.ref("Users")
  .push()
  .set({ username: "Logan" });
AppDB.ref("Documents")
  .push()
  .set({ name: "test", ownerId: "-Lu-ErjNSuKRgZedW7qu" });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
