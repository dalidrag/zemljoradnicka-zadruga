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
		case VodicActionCreators.GRAFIKONI:
			return Object.assign({}, state, { faza: 3 });
		case VodicActionCreators.ZABELESKE:
			return Object.assign({}, state, { faza: 4 });
		case VodicActionCreators.LOGO:
			return Object.assign({}, state, { faza: 5 });
		case VodicActionCreators.KORISNIK:
			return Object.assign({}, state, { faza: 6 });
		case VodicActionCreators.KRAJ:
			return Object.assign({}, state, { faza: 7 });
		case VodicActionCreators.ZAVRSI:
			return Object.assign({}, state, { faza: 0 });
		case VodicActionCreators.GMAPSZOOM:
			return Object.assign({}, state, { faza: 10 });
		default:
			return state;
	}
}