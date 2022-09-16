import { IPostProps, ILike } from '../../Elements/types';
import Styles from './post.module.scss';
import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { auth, db } from '../../Config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loading } from '../../Elements/index';

export const Post = (props: IPostProps) => {
  const {
    post: {
      title,
      username,
      description,
      userId,
      id,
      day,
      time,
      exactHour,
      exactDayName,
      exactMinute,
      exactDate
    }
  } = props;
  const [user] = useAuthState(auth);
  const likesCollection = collection(db, 'likes');
  const liker = query(likesCollection, where('postId', '==', id));
  const [likes, setLikes] = useState<ILike[] | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [realLoading, setRealLoading] = useState<boolean | null>(null);

  const hasBeenLiked = likes?.find((like) => like.userId === user?.uid);

  const getLikes = async () => {
    // const data = await getDocs(likes);
    // setLikeAmount(data.docs.length);
    const data = await getDocs(liker);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const { isLoading } = useQuery(['likes'], getLikes);
  console.log(isLoading);

  useEffect(() => {
    getLikes();
  }, [liked]);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesCollection, {
        userId: user?.uid,
        postId: id
      });
      setLiked(!liked);
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const queryToDelete = query(
        likesCollection,
        where('postId', '==', id),
        where('userId', '==', user?.uid)
      );

      const likeToDeleteData = await getDocs(queryToDelete);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, 'likes', likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoading = () => {
    if (isLoading === true) {
      return setRealLoading(true);
    } else {
      return setRealLoading(false);
    }
  };

  useEffect(() => {
    handleLoading();
  }, [liked]);

  const calcHours = () => {
    //get exact hour
    const exactHrs = new Date().getHours();
    const hoursAgo = exactHrs - exactHour;
    return { hoursAgo: hoursAgo };
  };

  const calcMinutes = () => {
    //get exact minute
    const exactMin = new Date().getMinutes();
    const minutesAgo = exactMin - exactMinute;
    return {
      minutesAgo: minutesAgo
    };
  };

  const calcDays = () => {
    //get exact day
    const exactDay = new Date().getDate();
    const daysAgo = exactDay - exactDate;
    return {
      daysAgo: daysAgo
    };
  };

  const minHours = () => {
    if (calcHours().hoursAgo >= 1)
      return <h5>{`${calcHours().hoursAgo} hrs ago`}</h5>;
    if (calcHours().hoursAgo < 1)
      return <h5>{`${calcMinutes().minutesAgo} mins ago`}</h5>;
  };

  if (isLoading === true) {
    return <Loading />;
  } else
    return (
      <div className={Styles.main} key={userId}>
        <div className={Styles.head}>
          <div className={Styles.username}>
            <h1>@{username}</h1>
          </div>
          <div className={Styles.time}>
            {calcDays().daysAgo >= 1 ? (
              <div className={Styles.day}>
                <h4>{exactDayName}</h4>
                <div className={Styles.below}>
                  <p>{`${day} at ${time}`}</p>
                </div>
              </div>
            ) : (
              <>{minHours()}</>
            )}
          </div>
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
          <button onClick={hasBeenLiked ? removeLike : addLike}>
            {hasBeenLiked ? <>&#128078;</> : <>&#128077;</>}
          </button>
          {likes && <p>{likes?.length}</p>}
        </div>
      </div>
    );
};
