import { Route } from 'react-router-dom';

export const mappingRoutes = (props) => props.map((item, index) => <Route key={index} {...item} />);
