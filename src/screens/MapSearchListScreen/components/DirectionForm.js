import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import classNames from 'classnames';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import Yup from 'yup';
import {
  MdDirectionsCar,
  MdDirectionsRailway,
  MdDirectionsBike,
  MdDirectionsWalk,
} from 'react-icons/lib/md';
import { fetchDirection, clearDirection } from '../../../actions';
import FormErrorMessage from './FormErrorMessage';
import LocationAutocompleteInput from './LocationAutocompleteInput';

const DirectionForm = ({ dispatch }) => (
  <Formik
    displayName="DirectionForm"
    initialValues={{
      origin: '',
      destination: '',
      mode: 'transit',
      arrivalTime: '',
    }}
    validationSchema={Yup.object().shape({
      origin: Yup.string()
        .nullable()
        .required('Origin is required'),
      destination: Yup.string()
        .nullable()
        .required('Destination is required'),
    })}
    onSubmit={(values, { setSubmitting, setFieldError }) => {
      const direction = { ...values };
      const callback = () => setSubmitting(false);
      dispatch(fetchDirection(direction, callback));
    }}
    render={({
     values, touched, errors, dirty, setFieldValue, isSubmitting, handleReset,
    }) => (
      <Form
        onKeyPress={event => event.which === 13 && event.preventDefault()}
        style={{ padding: '1rem' }}
      >
        <div className="field">
          <div className="control">
            <LocationAutocompleteInput
              inputName="origin"
              inputPlaceholder="Origin"
              inputClassName={classNames([
                    'input',
                    { 'is-danger': errors.origin && touched.origin },
                  ])}
              onSelect={selectedItem => setFieldValue('origin', selectedItem)}
            />
          </div>
        </div>
        <div className="field">
          <div className="control">
            <LocationAutocompleteInput
              inputName="destination"
              inputPlaceholder="Destination"
              inputClassName={classNames([
                    'input',
                    { 'is-danger': errors.origin && touched.destination },
                  ])}
              onSelect={selectedItem => setFieldValue('destination', selectedItem)}
            />
          </div>
        </div>

        <div className="field has-addons">
          <p className="control">
            <button
              type="button"
              className={classNames([
                    'button',
                    { 'is-info is-selected': values.mode === 'transit' },
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
                    { 'is-info is-selected': values.mode === 'driving' },
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
                    { 'is-info is-selected': values.mode === 'bicycling' },
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
                    { 'is-info is-selected': values.mode === 'walking' },
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
          input
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
                  [].forEach.call(
                    document.querySelectorAll('.LocationAutocompleteInput__clearButton'),
                    buttonNode => buttonNode.click(),
                  );
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
                  { 'is-loading': isSubmitting },
                ])}
            style={{ width: '50%' }}
          >
                Submit
          </button>
        </div>
      </Form>
    )}
  />
);

export default connect(null)(DirectionForm);
