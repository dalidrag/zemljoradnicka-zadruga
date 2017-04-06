import { NjiveActionCreators } from './action-creators/njive.action-creators';

export interface INjiveState {
	novaNjivaId: string;
}

const INITIAL_STATE = {
	novaNjivaId: '0'
}

export const NjiveReducer = (state = INITIAL_STATE, action: any) => {
	switch(action.type) {
		case NjiveActionCreators.NOVA_NJIVA:
			return Object.assign({}, state, { novaNjivaId: action.novaNjivaId });
		case NjiveActionCreators.NOVA_NJIVA_PRIKAZANA:
			return Object.assign({}, state, { novaNjivaId: '0'});
		default:
			return state;
	}
}