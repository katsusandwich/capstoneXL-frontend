import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { SelectedWordlistIdContextProvider } from "./Context/SelectedWordlistIdContext";
import { SelectedWordlistNameContextProvider } from "./Context/SelectedWordlistNameContext";
import { WordlistToBeTestedContextProvider } from "./Context/WordlistToBeTestedContext";
import { BackOfCardContextProvider } from "./Context/BackOfCardContext";
import { IndividualQuestionResultContextProvider } from "./Context/IndividualQuestionResultContext";
require("dotenv").config();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0WEBBIE}
    clientId={process.env.REACT_APP_AUTH0CLIENTID}
    redirectUri={window.location.origin}
    audience={process.env.REACT_APP_AUTH0AUDIENCE}
    // scope="read:current_user update:current_user_metadata"
  >
    <BrowserRouter>
      <BackOfCardContextProvider>
        <SelectedWordlistNameContextProvider>
          <SelectedWordlistIdContextProvider>
            <WordlistToBeTestedContextProvider>
              <IndividualQuestionResultContextProvider>
                <App />
              </IndividualQuestionResultContextProvider>
            </WordlistToBeTestedContextProvider>
          </SelectedWordlistIdContextProvider>
        </SelectedWordlistNameContextProvider>
      </BackOfCardContextProvider>
    </BrowserRouter>
  </Auth0Provider>
);
