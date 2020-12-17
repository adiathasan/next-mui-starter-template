import React, { useContext, createContext, useReducer } from 'react';

const Context = createContext();

const initValue = { user: { name: 'Adait Hasan' } };

const reducer = (state = initValue, action) => {
	switch (action.type) {
		case 'SOMETHING':
			return { ...state, name: action.payload };
		default:
			return state;
	}
};

const MainContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initValue);
	return (
		<Context.Provider value={{ dispatch, state }}>{children}</Context.Provider>
	);
};

export default MainContextProvider;

export const useContextValue = () => useContext(Context);
