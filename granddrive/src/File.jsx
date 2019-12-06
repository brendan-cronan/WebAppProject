import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";





import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from "@material-ui/core";



import { AppDB } from "./db-init";


class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myKey: this.props.myKey,
            owner: this.props.owner,
            docName: this.props.docName,
            docDesc: this.props.docDesc,

            sharedWith: this.props.sharedWith,
            url: this.props.url,
            delete: this.props.delete,
            recentlySelectedHandler: this.props.recentlySelectedHandler
        }
    }

    render() {

        this.delete = this.state.delete;

        return (
            <div>
                {/* {this.state.docName} {this.state.docDesc} 
                <Button variant="outlined" color="secondary" onClick={() => this.openFile()}>Open</Button> */}
            
            
                {/* {this.state.docName} {this.state.docDesc}
                {this.delete
                    &&
                    <button onClick={() => this.deleteSelected()}>Delete</button>
                }
                <button onClick={() => this.changeSelected()}>Open</button> */}


                <ExpansionPanel>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        id="panel1a-header"
                    >
                        <Typography className="type">{this.state.docName}</Typography>
                    </ExpansionPanelSummary>
                    {/* Contents Go Here */}
                    <ExpansionPanelDetails>
                        <Table>
                            <TableHead>
                                <TableCell>Owner</TableCell>
                                <TableCell>Shared With</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="Primary" onClick={() => this.changeSelected()}>Open</Button>
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="secondary" onClick={() => this.deleteSelected()}>Delete</Button>
                                </TableCell>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>{this.state.owner}</TableCell>
                                    <TableCell>{this.state.sharedWith}</TableCell>
                                </TableRow>








                            </TableBody>
                        </Table>

                        {/* <Typography>
                        {this.state.docDesc}
                    </Typography> */}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>

        );
    }

    changeSelected() {
        this.state.recentlySelectedHandler(this.state);
    }

    deleteSelected() {
        console.log(`Removing ${this.state.myKey}`)
        AppDB.ref('Documents')
            .child(this.state.myKey)
            .remove();
    }
}

export default File;
