import React from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { PrimaryButton } from './components/PrimaryButton';
import { MainContainer } from './components/MainContainer';
import { Form } from './components/Form';
import { Input } from './components/Input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers';
import { useData } from './DataContext';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
    .required('First name is a required field'),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
    .required('Last name is a required field'),
});

export const Step1 = () => {
  
  const { setValues, data } = useData(); // context

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const history = useHistory();

  const onSubmit = (data) => {
    history.push('/step2');
    setValues(data);
  };

  return (
    <MainContainer>
      <Typography component="h2" variant="h5">
        <span role="img" aria-label="emoji">
          &#127918; &nbsp;
        </span>
        Step 1
      </Typography>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="firstName"
          label="First Name"
          ref={register}
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
        />
        <Input
          type="text"
          name="lastName"
          label="Last Name"
          ref={register}
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
        />
        <PrimaryButton type="submit">Next</PrimaryButton>
      </Form>
    </MainContainer>
  );
};
