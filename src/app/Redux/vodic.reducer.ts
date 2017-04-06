import { VodicActionCreators } from './action-creators/vodic.action-creators';

export interface IVodicState {
	faza: number;
}

const INITIAL_STATE = {
	faza: 0
}

export const VodicReducer = (state = INITIAL_STATE, action: any) => {
	switch(action.type) {
		case VodicActionCreators.IMANJE:
			return Object.assign({}, state, { faza: 1 });
		case VodicActionCreators.AKTIVNOSTI:
			return Object.assign({}, state, { faza: 2 });
		default:
			return state;
	}
}