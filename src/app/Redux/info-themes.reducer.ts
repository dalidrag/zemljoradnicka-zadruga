import { InfoThemesActionCreators } from './action-creators/info-themes.action-creators';

export interface IInfoThemesState {
	infoThemes: Array<any>;
	coords: ClientRect;
}

const INITIAL_STATE = {
	infoThemes: [],
	coords: {}
}

export const InfoThemesReducer = (state = INITIAL_STATE, action: any) => {
	switch(action.type) {
		case InfoThemesActionCreators.PRIKAZI_INFO:
			return Object.assign({}, state, { infoThemes: action.infoThemes, coords: action.coords });
		case InfoThemesActionCreators.UKLONI_INFO:
			return Object.assign({}, state, { infoThemes: [], coords: {} });
		default:
			return state;
	}
}