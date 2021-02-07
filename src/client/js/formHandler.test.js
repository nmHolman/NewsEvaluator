import {
    handleSubmit
} from './formHandler.js';


test('Form successfull handled.', () => {
    const event = {
        preventDefault() {},
    };

    document.body.innerHTML = `
      <div id="submission"></div>
      <div id="submittedText"></div>
      <div id="subjectivity"></div>
      <div id="agreement"></div>
      `;

    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(),
        })
    );

    beforeEach(() => {
        fetch.mockClear();
    });

    expect(handleSubmit(event)).toBe();
});