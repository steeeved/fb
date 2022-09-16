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
  time: string;
}

export interface IPostProps {
  post: IFirebase;
}
