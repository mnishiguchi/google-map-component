import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import classNames from 'classnames';
import Yup from 'yup';
import { fetchPolygon, clearPolygon } from '../../actions';
import FormErrorMessage from './FormErrorMessage';
import LocationAutocompleteInput from './LocationAutocompleteInput';

const PolygonForm = ({ dispatch }) => (
  <Formik
    displayName="PolygonForm"
    initialValues={{
      place: ''
    }}
    validationSchema={Yup.object().shape({
      place: Yup.string()
        .nullable()
        .required('Place is required')
    })}
    onSubmit={(values, { setSubmitting, setFieldError }) => {
      const polygon = { ...values };
      const callback = () => setSubmitting(false);

      dispatch(fetchPolygon(polygon, callback));
    }}
    render={({
      values,
      touched,
      errors,
      dirty,
      setFieldValue,
      isSubmitting,
      handleReset
    }) => (
      <Form
        onKeyPress={event => event.which === 13 && event.preventDefault()}
        style={{ padding: '1rem' }}
      >
        <div className="field">
          <div className="control">
            <LocationAutocompleteInput
              inputName="place"
              inputPlaceholder="Place"
              inputClassName={classNames([
                'input',
                { 'is-danger': errors.place && touched.place }
              ])}
              onSelect={selectedItem => setFieldValue('place', selectedItem)}
            />
          </div>
        </div>

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
              dispatch(clearPolygon());
              [].forEach.call(
                document.querySelectorAll(
                  '.LocationAutocompleteInput__clearButton'
                ),
                buttonNode => buttonNode.click()
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
              { 'is-loading': isSubmitting }
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

export default connect()(PolygonForm);
