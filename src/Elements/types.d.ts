export interface ILogged {
  isLogged: boolean;
  setLogged: (Logged: boolean) => void;
}

export interface formData {
  title: string;
  description: string;
}

export interface IFirebase {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
  day: string;
  exactMinute: number;
  exactHour: number;
  exactDayName: string;
  exactDate: number;
  time: string;
  postId: number;
}

export interface IPostProps {
  post: IFirebase;
}

export interface IPost {
  sortedPosts: IFirebase;
}

export interface ILike {
  userId: string;
  likeId: string;
}