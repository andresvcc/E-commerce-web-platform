import React from 'react';
import { describe, expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import { Spinner, SpinnersList } from './index';

describe('tests Spinners component', () => {
  SpinnersList.forEach((SpinnerName) => {
    test(`test Spinner ${SpinnerName} rendering`, () => {
      const tree = renderer.create(<Spinner name={SpinnerName} />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
