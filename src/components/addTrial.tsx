import React from "react";
import { withRouter } from 'react-router-dom'
import { Form, Button, FormGroup, FormControl } from "react-bootstrap";
import { Formik } from "formik";
import ReactUploadFile from 'react-upload-file';
import FileUploadButton from ''
import immuto from 'immuto-backend'
export const im = immuto.init(true, "https://dev.immuto.io")

// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap"
import { Link, useRouteMatch, Switch, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

const URL = "http://consentus.herokuapp.com"

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));


const AddTrial = withRouter(({ setUserType, history }) => (
    <Formik
        initialValues={{ trialName: '', documentName: '', sponsor: '' }}
        onSubmit={(values, { setSubmitting }) => {
            handleForm()
        }}
    >
        {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
        }) => (
                <div>
                    <input
                        className="form-control"
                        type="text"
                        name="trialName"
                        placeholder="Trial Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.trialName}
                    />
                    <input
                        className="form-control"
                        type="text"
                        name="documentName"
                        placeholder="Document Name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.documentName}
                    />
                    <input
                        className="form-control"
                        type="text"
                        name="sponsor"
                        placeholder="Sponsor"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.sponsor}
                    />
                    <div>
                        
                        <label htmlFor="outlined-button-file">
                            <Button variant="outlined" component="span">
                                Consent Form
                            </Button>
                        </label>
                        <input accept="image/*" className={useStyles().input} id="icon-button-file" type="file" />
                        <label htmlFor="icon-button-file">
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </div>
                    <Link to="/admin/add-patients">
                    <button className="btn btn-outline-dark mt-2 mx-0 w-25" type="submit" onClick={handleSubmit} disabled={isSubmitting}>
                        Create Trial
                    </button>
                    </Link>
                </div>
            )}
    </Formik>
));

export default AddTrial;






