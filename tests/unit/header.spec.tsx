import renderer from 'react-test-renderer';
import { Header } from '../../src/widgets';

test('Header component should match the snapshot', () => {
  const component = renderer.create(<Header />);

  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
