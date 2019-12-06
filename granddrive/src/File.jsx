import React, { Component } from "react";
import Button from '@material-ui/core/Button';


import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';




class File extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owner: this.props.owner,
            docName: this.props.docName,
            docDesc: this.props.docDesc,
            url: this.props.url
        }
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
                    <ExpansionPanelDetails>
                    <Typography>
                        {this.state.docDesc}
                    </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                








            </div >
        );
    }

    openFile() {
        window.open(this.state.url, "_blank");
    }
}

export default File;