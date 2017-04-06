import { combineReducers } from 'redux';

import { INjiveState, NjiveReducer } from './njive.reducer';

export class IAppState {
	njive?: INjiveState;
}

export const rootReducer = combineReducers<IAppState>({
	njive: NjiveReducer
});