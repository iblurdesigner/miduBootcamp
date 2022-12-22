export const Note = ({ title, body }) => {
  // console.log('props', props);
  return (
    <li>
      <h2>{title}</h2>
      <small>{body}</small>
    </li>
  );
};
