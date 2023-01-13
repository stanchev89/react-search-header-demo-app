import { render } from '@testing-library/react';
import { it, describe } from 'vitest';
import Users from './Users';
import { testIds } from '../../core/testIds';
import Setup from '../../Setup';

describe('Users', () => {
  it('should contain search header component', () => {
    const { getByTestId } = render(
      <Setup>
        <Users/>
      </Setup>
    );
    expect(getByTestId(testIds.searchHeader)).toBeInTheDocument();
  });

  it('should contain data list with pagination component', () => {
    const { getByTestId } = render(
      <Setup>
        <Users/>
      </Setup>
    );
    expect(getByTestId(testIds.dataListWithPagination)).toBeInTheDocument();
  });

  it('should contain entity details modal component', () => {
    const { getByTestId } = render(
      <Setup>
        <Users/>
      </Setup>
    );
    expect(getByTestId(testIds.entityDetailsModal)).toBeInTheDocument();
  });

});
