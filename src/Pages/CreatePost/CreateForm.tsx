import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { formData } from '../../Elements/types';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../Config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Config/Firebase';
import { useNavigate } from 'react-router-dom';

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required('Please provide a title.'),
    description: yup.string().required('Please provide a description.')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<formData>({
    resolver: yupResolver(schema)
  });

  const postsCollection = collection(db, 'posts');

  const onSubmit = async (data: formData) => {
    await addDoc(postsCollection, {
      ...data,
      username: user?.displayName,
      userId: user?.uid
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder='Title...' {...register('title')} />
      <p style={{ color: 'red' }}>{errors.title?.message}</p>
      <textarea placeholder='Description...' {...register('description')} />
      <p style={{ color: 'red' }}>{errors.description?.message}</p>
      <input type='submit' />
    </form>
  );
};