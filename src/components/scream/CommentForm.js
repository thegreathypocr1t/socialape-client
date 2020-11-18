import React, { Component } from 'react';
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUI 
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button"

// Redux
import { connect } from "react-redux";
import { postComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
    ...theme.toSpread
})

export class CommentForm extends Component {
    state = {
        body: "",
        errors: {}
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            });
        }

        if(!nextProps.UI.errors && !nextProps.UI.errors) {
            this.setState({
                body: ""
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postComment(this.props.screamId, {body: this.state.body});
    }

    render() {
        const {classes, authenticated} = this.props;
        const { errors } = this.state;

        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} style={{textAlign: "center"}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField name="body" type="text" label="Comment on a scream" error={errors.error ? true : false}
                        helperText={errors.error} value={this.state.body} onChange={this.handleChange} fullWidth
                        className={classes.textField}/>
                    <Button type="submit" variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeparator}/>
            </Grid>
        ) : null;

        return commentFormMarkup
    }
}

CommentForm.propTypes = {
    screamId: PropTypes.string.isRequired,
    postComment: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    UI: state.UI,
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps, {postComment})(withStyles(styles)(CommentForm));
