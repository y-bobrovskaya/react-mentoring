import React from 'react';
import {shallow} from 'enzyme';

import {SearchPage} from '../SearchPage';

describe('<SearchPage />', () => {
	test('should render without throwing error', () => {
		const page = shallow(
			<SearchPage
				query=""
				oldValue=""
				movies={[]}
				selectedSearchType=""
				onSearch={() => true}
				onQueryChange={() => true}
				onSearchTypeChange={() => true}
				history={{}}
				match={{params: {}}}
			/>
		);

		expect(page.find('Search').length).toBe(1);
		expect(page.find('Content').length).toBe(1);
	});

	test('should be called typeChangeHandler on searchType change', () => {
		let typeChangeHandler = jest.fn();

		const page = shallow(
			<SearchPage
				query=""
				oldValue=""
				movies={[]}
				selectedSearchType=""
				onSearch={() => true}
				onQueryChange={() => true}
				onSearchTypeChange={typeChangeHandler}
				history={{}}
				match={{params: {}}}
			/>
		);

		page.instance().onSearchTypeChange({target: {value: 1}});

		expect(typeChangeHandler).toHaveBeenCalledWith(1);

	});
});