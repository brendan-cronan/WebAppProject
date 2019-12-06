import React, { Component } from "react";
import Button from "@material-ui/core/Button";

import {
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Chip
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import {
    OpenInNew, HighlightOff
} from '@material-ui/icons';




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
        }
    }

    render() {

        this.delete = this.state.delete;

        return (
            <div>

                <ExpansionPanel style={{ marginBottom: 8 }}>
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
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Owner</TableCell>
                                    <TableCell>Shared With</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><Typography>{this.state.docDesc}</Typography></TableCell>
                                    <TableCell>{this.state.owner}</TableCell>
                                    <TableCell>
                                        {this.state.sharedWith !== undefined &&
                                            this.state.sharedWith.map((user) => (
                                                <Chip key={user} label={user} />
                                            ))}
                                    </TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell>
                                        <Button startIcon={<OpenInNew />} variant="outlined" color="primary" onClick={() => this.openFile()}>Open</Button>
                                    </TableCell>
                                    <TableCell>
                                        {this.state.delete &&
                                            < Button startIcon={<HighlightOff />} variant="outlined" color="secondary" onClick={() => this.deleteSelected()}>Delete</Button>
                                        }

                                    </TableCell>
                                </TableRow>








                            </TableBody>
                        </Table>

                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>

        );
    }

    openFile() {
        window.open(this.state.url, "_blank");
    }

    deleteSelected() {
        console.log(`Removing ${this.state.myKey}`)
        AppDB.ref('Documents')
            .child(this.state.myKey)
            .remove();
    }
}

export default File;
