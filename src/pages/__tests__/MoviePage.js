import React from 'react';
import {shallow} from 'enzyme';

import {MoviePage} from '../MoviePage';

describe('<MoviePage />', () => {
	test('should render without throwing error', () => {
		const page = shallow(
			<MoviePage
				director={{movie_credits: {crew:[]}}}
				movie={{credits: {crew:[]}}}
				history={{}}
				match={{params: {}}}
			/>
		);

		expect(page.find('Movie').length).toBe(1);
		expect(page.find('Content').length).toBe(1);
	});

	test('should handle Search btn click', () => {
		let mockedPush = jest.fn();

		const page = shallow(
			<MoviePage
				director={{movie_credits: {crew:[]}}}
				movie={{credits: {crew:[]}}}
				history={{push: mockedPush}}
				match={{params: {}}}
			/>
		);

		page.instance().goSearch({preventDefault: () => {}});

		expect(mockedPush).toHaveBeenCalledWith('/search');

	});
});