import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import {
  Error as _error,
  Form,
  FormButton,
  Input as _input,
  Spinner,
} from '../../utils/widgets';
import { Product, useAddProductMutation } from './products';

type InputsType = Omit<Product, 'id'>;

const Input = styled(_input)`
  margin-bottom: 0;
`;

const Error = styled(_error)`
  padding: 0 0 1rem 0;
  text-align: left;
`;

export default function AddProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsType>();
  const [addProduct, { isLoading }] = useAddProductMutation();

  const onSubmit: SubmitHandler<InputsType> = (data) => {
    addProduct(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder='Name'
        {...register('name', { required: 'Name is requried!' })}
      />
      <Error>{errors.name?.message}</Error>
      <Input
        placeholder='Price'
        {...register('price', { required: 'Price is requried!' })}
      />
      <Error>{errors.price?.message}</Error>
      <Input
        placeholder='Weight'
        type='number'
        {...register('weight', { required: 'Weight is requried!' })}
      />
      <Error>{errors.weight?.message}</Error>
      <Input
        placeholder='Start date'
        {...register('startDate', { required: 'Start date is requried!' })}
      />
      <Error>{errors.startDate?.message}</Error>
      <Input
        placeholder='End date'
        {...register('endDate', { required: 'End date is requried!' })}
      />
      <Error>{errors.endDate?.message}</Error>
      <Input
        placeholder='Number of product'
        type='number'
        min={1}
        {...register('number')}
      />
      <FormButton disabled={isLoading}>
        {isLoading && <Spinner data-testid='spinner' />} <span>Add</span>
      </FormButton>
    </Form>
  );
}
