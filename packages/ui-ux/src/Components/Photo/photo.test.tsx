import React from 'react';
import { describe, expect, test } from '@jest/globals';
import renderer from 'react-test-renderer';
import { Photo } from './index';

describe('tests Photo component', () => {
  test('test Photo rendering', () => {
    const tree = renderer.create(<Photo src="logo-mobsya" />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
