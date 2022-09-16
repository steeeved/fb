import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Config/Firebase';
import { useState, useEffect } from 'react';
import { IFirebase } from '../../Elements/types';
import { Post } from './Post';
import Styles from './post.module.scss';

const MainPage = () => {
  const [postsList, setPostsList] = useState<IFirebase[] | null>(null);
  const postsCollection = collection(db, 'posts');

  const getPosts = async () => {
    const posts = await getDocs(postsCollection);
    setPostsList(
      posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IFirebase[]
    );
  };

  console.log(postsList);
  

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className={Styles.Posts}>
      {postsList?.map((post) => (
        <Post post={post}/>
      ))}
    </div>
  );
};

export default MainPage;

// | is the union operator
// It means that the type can be either IFirebase or null

// || is the logical OR operator
// It means that if the first value is false, it will return the second value
