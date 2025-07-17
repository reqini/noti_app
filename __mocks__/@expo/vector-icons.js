const React = require('react');
module.exports = {
  Ionicons: (props) => React.createElement('div', { ...props, 'data-testid': 'mock-icon' }, props.name || 'icon'),
}; 