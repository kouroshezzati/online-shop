import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createGlobalStyle } from 'styled-components';

import reportWebVitals from './reportWebVitals';
import { store } from './store';
import { useAuth } from './components/Login/authSlice';
import { Spinner } from './utils/widgets';

const LoginPage = lazy(() => import('./pages/Login'));
const AdminPage = lazy(() => import('./pages/Admin'));

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return auth ? <>{children}</> : <Navigate to='/login' replace />;
}
function PublicRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  return auth ? <Navigate to='/' replace /> : <>{children}</>;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              }
            />
            <Route
              path='/login'
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
