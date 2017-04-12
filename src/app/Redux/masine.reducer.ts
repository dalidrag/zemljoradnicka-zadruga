import { MasineActionCreators } from './action-creators/masine.action-creators';

export interface IMasineState {
	novaMasinaId: string;
}

const INITIAL_STATE = {
	novaMasinaId: '0'
}

export const MasineReducer = (state = INITIAL_STATE, action: any) => {
	switch(action.type) {
		case MasineActionCreators.NOVA_MASINA:
			return Object.assign({}, state, { novaMasinaId: action.novaMasinaId });
		case MasineActionCreators.NOVA_MASINA_PRIKAZANA:
			return Object.assign({}, state, { novaMasinaId: '0'});
		default:
			return state;
	}
}