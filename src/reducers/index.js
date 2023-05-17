import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import usefulDatas from './usefulDatas';

const rootReducer = combineReducers({ user, wallet, usefulDatas });

export default rootReducer;

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
