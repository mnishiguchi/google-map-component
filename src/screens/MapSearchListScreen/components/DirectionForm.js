import React from 'react';
import { connect } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import classNames from 'classnames';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Yup from 'yup';
import {
  MdDirectionsCar,
  MdDirectionsRailway,
  MdDirectionsBike,
  MdDirectionsWalk
} from 'react-icons/lib/md';
import FormErrorMessage from './FormErrorMessage';
import { fetchDirection, clearDirection } from '../../../actions';

const DirectionForm = ({ dispatch }) => {
  return (
    <Formik
      displayName="DirectionForm"
      initialValues={{
        origin: '',
        destination: '',
        mode: 'transit',
        arrivalTime: ''
      }}
      validationSchema={Yup.object().shape({
        origin: Yup.string().required('Origin is required'),
        destination: Yup.string().required('Destination is required')
      })}
      onSubmit={(values, { setSubmitting, setFieldError }) => {
        const direction = { ...values };
        const callback = () => setSubmitting(false);
        dispatch(fetchDirection(direction, callback));
      }}
      render={({
        values,
        touched,
        errors,
        dirty,
        setFieldValue,
        isSubmitting,
        handleReset
      }) => {
        return (
          <Form
            onKeyPress={event => event.which === 13 && event.preventDefault()}
            style={{ padding: '1rem' }}
          >
            <div className="field">
              <div className="control">
                <Field
                  type="text"
                  name="origin"
                  placeholder="Origin"
                  className={classNames([
                    'input',
                    { 'is-danger': errors.origin && touched.origin }
                  ])}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <Field
                  type="text"
                  name="destination"
                  placeholder="Destination"
                  className={classNames([
                    'input',
                    { 'is-danger': errors.origin && touched.destination }
                  ])}
                />
              </div>
            </div>

            <div className="field has-addons">
              <p className="control">
                <button
                  type="button"
                  className={classNames([
                    'button',
                    { 'is-info is-selected': values.mode === 'transit' }
                  ])}
                  onClick={() => setFieldValue('mode', 'transit')}
                >
                  <span className="icon is-small">
                    <MdDirectionsRailway />
                  </span>
                  <span>Transit</span>
                </button>
              </p>

              <p className="control">
                <button
                  type="button"
                  className={classNames([
                    'button',
                    { 'is-info is-selected': values.mode === 'driving' }
                  ])}
                  onClick={() => setFieldValue('mode', 'driving')}
                >
                  <span className="icon is-small">
                    <MdDirectionsCar />
                  </span>
                  <span>Drive</span>
                </button>
              </p>

              <p className="control">
                <button
                  type="button"
                  className={classNames([
                    'button',
                    { 'is-info is-selected': values.mode === 'bicycling' }
                  ])}
                  onClick={() => setFieldValue('mode', 'bicycling')}
                >
                  <span className="icon is-small">
                    <MdDirectionsBike />
                  </span>
                  <span>Bicycle</span>
                </button>
              </p>

              <p className="control">
                <button
                  type="button"
                  className={classNames([
                    'button',
                    { 'is-info is-selected': values.mode === 'walking' }
                  ])}
                  onClick={() => setFieldValue('mode', 'walking')}
                >
                  <span className="icon is-small">
                    <MdDirectionsWalk />
                  </span>
                  <span>Walk</span>
                </button>
              </p>
            </div>

            <Datetime
              open={false}
              input={true}
              inputProps={{ name: 'arrivalTime' }}
              value={values.arrivalTime}
              onChange={moment => setFieldValue('arrivalTime', moment.toDate())}
            />

            {
              <div style={{ margin: '1rem 0' }}>
                <FormErrorMessage errors={errors} touched={touched} />
              </div>
            }

            <div>
              <button
                type="button"
                onClick={() => {
                  handleReset();
                  dispatch(clearDirection());
                }}
                disabled={!dirty || isSubmitting}
                className="button"
                style={{ width: '50%' }}
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className={classNames([
                  'button is-primary is-outlined',
                  { 'is-loading': isSubmitting }
                ])}
                style={{ width: '50%' }}
              >
                Submit
              </button>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default connect(null)(DirectionForm);
