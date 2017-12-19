import React from 'react';
import { Formik, Field, Form } from 'formik';
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

// Example params:
// origin: 75 9th Ave, New York, NY
// destination: MetLife Stadium Dr East Rutherford, NJ 07073
// mode: transit
// arrival_time: 1391374800
const DirectionsComponent = () => {
  return (
    <Formik
      displayName="DirectionsComponent"
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
        // TODO
        // Simulate async request
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
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
            style={{ padding: '5px' }}
          >
            <div className="field">
              <div className="control">
                <Field
                  type="text"
                  name="origin"
                  placeholder="Origin"
                  className={
                    errors.origin && touched.origin
                      ? 'input is-danger'
                      : 'input'
                  }
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <Field
                  type="text"
                  name="destination"
                  placeholder="Destination"
                  className={
                    errors.destination && touched.destination
                      ? 'input is-danger'
                      : 'input'
                  }
                />
              </div>
            </div>

            <div className="field has-addons">
              <p className="control">
                <button
                  type="button"
                  className={
                    values.mode === 'transit'
                      ? 'button is-info is-selected'
                      : 'button'
                  }
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
                  className={
                    values.mode === 'driving'
                      ? 'button is-info is-selected'
                      : 'button'
                  }
                  onClick={() => setFieldValue('mode', 'driving')}
                >
                  <span className="icon is-small">
                    <MdDirectionsCar />
                  </span>
                  <span>Driving</span>
                </button>
              </p>

              <p className="control">
                <button
                  type="button"
                  className={
                    values.mode === 'cycling'
                      ? 'button is-info is-selected'
                      : 'button'
                  }
                  onClick={() => setFieldValue('mode', 'cycling')}
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
                  className={
                    values.mode === 'walking'
                      ? 'button is-info is-selected'
                      : 'button'
                  }
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
              open
              input={false}
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
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
                className="button"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="button is-primary is-outlined"
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

export default DirectionsComponent;
