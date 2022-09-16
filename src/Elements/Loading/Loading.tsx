import Styles from './Loading.module.scss';

export const Loading = () => {
  return (
    <div className={Styles.sp}>
      <div className={Styles.spCircle}></div>
    </div>
  )
}

export default Loading;