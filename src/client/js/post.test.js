import { TestScheduler } from 'jest';
import { postData } from './post';


global.fetch = jest.fn(() => 
    Promise.resolve({
        json: () => Promise.resolve(),
    })
);

beforeEach(() => {
    fetch.mockClear();
  });

it('Successfully post data', async () => {
    const data = await postData("Testing");

    expect(data).toEqual("Success");
    expect(fetch).toHaveBeenCalledTimes(1);
}); 