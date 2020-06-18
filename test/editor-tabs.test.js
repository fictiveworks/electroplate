import {fixture, html} from '@open-wc/testing';
import { EditorTabs } from "../src/electroplate.js";

const assert = chai.assert;

suite('editor-tabs', () => {
  test('is defined', () => {
    const el = document.createElement('editor-tabs');
    assert.instanceOf(el, EditorTabs);
  });
});
