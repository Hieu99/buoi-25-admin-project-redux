import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainTemplate from "./templates/MainTemplate";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { PAGE_PATH } from "./constants/pagePath";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StoreProvider from "./component/provider/StoreProvider";
import HelmetProvider from "./component/provider/HelmetProvider";
import MessageProvider from "./component/provider/MessageProvider";
import PrivateRoute from "./hoc/PrivateRoute";

function App() {
  return (
    <StoreProvider>
      <HelmetProvider>
        <MessageProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path=""
                element={
                  <PrivateRoute component={MainTemplate} isAuth={true} />
                }
              >
                <Route index path={PAGE_PATH.home} element={<HomePage />} />
                <Route
                  path={PAGE_PATH.user}
                  element={<PrivateRoute component={UserPage} isAdmin />}
                />
              </Route>
              <Route path={PAGE_PATH.login} element={<LoginPage />} />
              <Route path={PAGE_PATH.signup} element={<SignupPage />} />
            </Routes>
          </BrowserRouter>
        </MessageProvider>
      </HelmetProvider>
    </StoreProvider>
  );
}

export default App;
