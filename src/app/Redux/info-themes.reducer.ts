import { InfoThemesActionCreators } from './action-creators/info-themes.action-creators';

export interface IInfoThemesState {
	infoThemes: Array<any>;
	coords: ClientRect;
	query: any;
}

const INITIAL_STATE = {
	infoThemes: [],
	coords: {},
	query: {}
}

export const InfoThemesReducer = (state = INITIAL_STATE, action: any) => {
	switch(action.type) {
		case InfoThemesActionCreators.PRIKAZI_INFO:
			return Object.assign({}, state, { infoThemes: action.infoThemes, coords: action.coords, query: action.query });
		case InfoThemesActionCreators.UKLONI_INFO:
			return Object.assign({}, state, { infoThemes: [], coords: {} });
		case InfoThemesActionCreators.DODAJ_TEMU:
			return Object.assign({}, state, { query: action.query });
		default:
			return state;
	}
}