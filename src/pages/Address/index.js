import React, { Component } from 'react';
import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik } from 'formik';

// Material UI
import { withStyles, TextField, Button } from '@material-ui/core';

// Reducers
import { setOrderAddress } from '../../reducers/orders';

import styles from './styles';

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return {
    actions : bindActionCreators({
      setOrderAddress,
      changePage: () => push('/checkout')
    }, dispatch),
  };
}

class Address extends Component {

  render () {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Formik {...{
          initialValues: {
            address: '',
            color: '',
            references: '',
          },
          validate: (values) => {
            let errors = {};
            if (!values.address) {
              errors.address = 'Direccion Requerida'
            }
            return errors;
          },
          onSubmit : (values, { setSubmitting, setErrors }) => {
            console.log(values);
            this.props.actions.setOrderAddress(values);
            this.props.actions.changePage();
          },
          render : (
            {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
            <form onSubmit={handleSubmit} className={classes.form}>
              <TextField
                error={!!errors.address}
                helperText={!!errors.address && errors.address}
                id="address"
                label="Direccion exacta"
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
                multiline
                rows="4"
              />
              <TextField
                id="references"
                label="Puntos de referencias"
                name="references"
                value={values.references}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
              />
              <TextField
                id="color"
                label="Casa color"
                name="color"
                value={values.color}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="normal"
                fullWidth
              />
              <div className={classes.buttonCont}>
                <Button type="submit" variant='raised' color='primary' fullWidth={ true }>
                  Continuar
                </Button>
              </div>
            </form>
          )
        }}>
        </Formik>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Address))
