// material-ui
import { Avatar } from '@mui/material';

//================================|| AVATAR ||================================//

export const ImgAvatar = ({ id, size, ...otherProps }) => {
  return <Avatar src={`https://robohash.org/${id}?size=${size}x${size}`} {...otherProps} />;
};
