import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../Config/Firebase';
import { useState, useEffect } from 'react';
import { IFirebase } from '../../Elements/types';
import { Post } from './Post';
import Styles from './post.module.scss';

const MainPage = () => {
  const [postsList, setPostsList] = useState<IFirebase[] | null>(null);
  const [sortedPosts, setSortedPosts] = useState<IFirebase[] | null>(null);
  const postsCollection = collection(db, 'posts');

  const getPosts = async () => {
    const posts = await getDocs(postsCollection);
    setPostsList(
      posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IFirebase[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Sort postsList by day
  useEffect(() => {
    if (postsList) {
      const sorted = postsList.sort((a, b) => {
        if (a.day > b.day) {
          return 1;
        } else if (a.day < b.day) {
          return -1;
        } else {
          return 0;
        }
      });
      // reverse the array so that the most recent post is at the top
      setSortedPosts(sorted.reverse());
    }
  }, [postsList]);


  return (
    <div className={Styles.Posts}>
      {sortedPosts?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};

export default MainPage;

// | is the union operator
// It means that the type can be either IFirebase or null

// || is the logical OR operator
// It means that if the first value is false, it will return the second value
