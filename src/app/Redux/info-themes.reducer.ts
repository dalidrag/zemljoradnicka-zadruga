import { InfoThemesActionCreators } from './action-creators/info-themes.action-creators';

export interface IInfoThemesState {
	infoThemes: Array<any>;
}

const INITIAL_STATE = {
	infoThemes: []
}

export const InfoThemesReducer = (state = INITIAL_STATE, action: any) => {
	switch(action.type) {
		case InfoThemesActionCreators.PRIKAZI_INFO:
			return Object.assign({}, state, { infoThemes: action.infoThemes });
		case InfoThemesActionCreators.UKLONI_INFO:
			return Object.assign({}, state, { infoThemes: []});
		default:
			return state;
	}
}