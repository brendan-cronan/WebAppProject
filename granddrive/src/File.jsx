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



class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: this.props.owner,
            docName: this.props.docName,
            docDesc: this.props.docDesc,
            url: this.props.url
        };
    }

    render() {
        return (
            <div>
                {/* {this.state.docName} {this.state.docDesc} 
                <Button variant="outlined" color="secondary" onClick={() => this.openFile()}>Open</Button> */}

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
                                    <Button variant="outlined" color="secondary" onClick={() => this.openFile()}>Open</Button>
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

    openFile() {
        window.open(this.state.url, "_blank");
    }
}

export default File;
