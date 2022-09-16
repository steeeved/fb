import { IPostProps } from '../../Elements/types';
import Styles from './post.module.scss';
import { addDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { auth, db } from '../../Config/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

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
  const likes = query(likesCollection, where('postId', '==', id));
  const [likeAmount, setLikeAmount] = useState<number | null>(null);
  const [greaterThan, setGreaterThan] = useState<boolean | null>(null);
  const [liked, setLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<string>('Loading...');
  const [realLoading, setRealLoading] = useState<boolean | null>(null);
  const [another, setAnother] = useState<boolean>(false);

  const getLikes = async () => {
    // const data = await getDocs(likes);
    // setLikeAmount(data.docs.length);
    const data = await getDocs(likes);
    setLikeAmount(data.docs.length);
    setAnother(false);
  };

  const { isLoading } = useQuery(['likes'], getLikes);

  useEffect(() => {
    getLikes();
    setAnother(true);
  }, [liked]);

  const addLike = async () => {
    await addDoc(likesCollection, {
      userId: user?.uid,
      postId: id
    });
    console.log('Clicked');
    setLiked(!liked);
  };

  const handleLoading = () => {
    if (isLoading === true || another === true) {
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
        {realLoading ? (
          <button>{loading}</button>
        ) : (
          <button onClick={addLike}>&#128077; </button>
        )}
        {likeAmount && <p>{likeAmount}</p>}
      </div>
    </div>
  );
};
