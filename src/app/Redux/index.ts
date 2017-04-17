import { combineReducers } from 'redux';

import { INjiveState, NjiveReducer } from './njive.reducer';
import { IVodicState, VodicReducer } from './vodic.reducer';
import { IMasineState, MasineReducer } from './masine.reducer';

export class IAppState {
	njive?: INjiveState;
	vodic?: IVodicState;
	masine?: IMasineState;
}

export const rootReducer = combineReducers<IAppState>({
	njive: NjiveReducer,
	vodic: VodicReducer,
	masine: MasineReducer
});