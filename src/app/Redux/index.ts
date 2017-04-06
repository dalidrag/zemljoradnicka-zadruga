import { combineReducers } from 'redux';

import { INjiveState, NjiveReducer } from './njive.reducer';
import { IVodicState, VodicReducer } from './vodic.reducer';

export class IAppState {
	njive?: INjiveState;
	vodic?: IVodicState;
}

export const rootReducer = combineReducers<IAppState>({
	njive: NjiveReducer,
	vodic: VodicReducer
});