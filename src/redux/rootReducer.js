import errorReducer from './error/error.reducer';
import authReducer from './auth/auth.reducer';
import contactsReducer from './contacts/contacts.reducer';
import footerReducer from './footer/footer.reducer';
import servicesReducer from "./services/services.reducer";
import projectsReducer from "./projects/projects.reducer";
import appReducer from "./app/app.reducer";
import membersReducer from "./members/members.reducer";
import successReducer from "./success/success.reducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  errorReducer,
  authReducer,
  contactsReducer,
  footerReducer,
  servicesReducer,
  projectsReducer,
  appReducer,
  membersReducer,
  successReducer
});

export default rootReducer;