import { CreateForm } from './CreateForm';
import Styles from './Post.module.scss';

const CreatePost = () => {
  return (
    <div className={Styles.Form}>
      <CreateForm />
    </div>
  );
};

export default CreatePost;
