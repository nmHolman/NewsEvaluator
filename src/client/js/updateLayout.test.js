const { TestScheduler } = require('jest');
import { updateLayout } from './updateLayout.js';


test('Successfully updates layer', () => {  

    document.body.innerHTML = `
      <textarea id="submission"></textarea>
      <div id="results"></div>
      <div id="form"></div>
      <div id="button"></div>
      <div id="return"></div>
      `;

    expect(updateLayout()).toBe('Layout updated');
});