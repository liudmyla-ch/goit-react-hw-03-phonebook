import { Formik, Form, Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import css from './ContactForm.module.css';

const ContactForm = ({ onSubmitForm, id }) => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      )
      .required('Name is required'),
    number: Yup.string()
      .matches(
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .required('Phone number is required'),
  });

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmitForm(values);
        resetForm();
      }}
    >
      {({ errors, touched }) => (
        <Form className={css.form} autoComplete='off'>
          <label className={css.label}>
            Name
            <Field id={id} type="text" name="name" className={css.input} required />
            {errors.name && touched.name && <div className={css.error}>{errors.name}</div>}
          </label>
          <label className={css.label}>
            Number
            <Field id={id} type="tel" name="number" className={css.input} required />
            {errors.number && touched.number && <div className={css.error}>{errors.number}</div>}
          </label>
          <button type="submit" className={css.button}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

ContactForm.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default ContactForm;
