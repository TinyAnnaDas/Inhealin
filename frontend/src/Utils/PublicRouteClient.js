// import { Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PublicRouteClient = ({ path, element }) => {
//     const user = useSelector((state) => state.clientAuth.client)
  
//     if (user) {
//       // Redirect logged-in user to a different page
//       return <Navigate to="/dashboard" />;
//     }
  
//     return <Route path={path} element={element} />;
//   };
  
//   export default PublicRouteClient;