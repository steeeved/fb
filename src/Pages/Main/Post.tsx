import { IPostProps } from '../../Elements/types';
import Styles from './post.module.scss';
import { addDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../../Config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';

export const Post = (props: IPostProps) => {
  const {
    post: { title, username, description, userId, id }
  } = props;
  const [user] = useAuthState(auth);
  const likesCollection = collection(db, 'likes');
  const likes = query(likesCollection, where('postId', '==', id));
  const [likeAmount, setLikeAmount] = useState<number | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getLikes = async () => {
    const data = await getDocs(likes);
    setLikeAmount(data.docs.length);
  };

  const [loading, setLoading] = useState<string>("Loading...");

  useEffect(() => {
    getLikes();
  }, [liked]);

  const addLike = async () => {
    await addDoc(likesCollection, {
      userId: user?.uid,
      postId: id,
      isLoading: true
    });
    setLiked(!liked);
    setIsLoading(!isLoading);
  };

  return (
    <div className={Styles.main} key={userId}>
      <div className={Styles.head}>
        <h1>@{username}</h1>
      </div>
      <div className={Styles.body}>
        <div className={Styles.title}>
          <h4>{title}</h4>
        </div>
        <div className={Styles.description}>
          <p>{description}</p>
        </div>
      </div>
      <div className={Styles.like}>
        {isLoading ? (
          <button onClick={addLike}>{ loading}</button>
          ) : (
          <button onClick={addLike}>&#128077; </button>
        )}
        {liked ? null : likeAmount && <p>{likeAmount}</p>  }
      </div>
    </div>
  );
};
