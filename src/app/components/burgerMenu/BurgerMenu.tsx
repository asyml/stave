import React from 'react';
import {StyledBurger} from './StyledBurger';
import {StyledMenu} from './StyledMenu';

class BurgerMenu extends React.Component<{open: boolean; setOpen: Function}> {
  private menuRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event: Event) => {
    if (!this.props.open) {
      return;
    }

    if (
      this.menuRef.current &&
      !this.menuRef.current.contains(event.target as Node)
    ) {
      this.props.setOpen(false);
    }
  };

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child => {
      const props = {onClick: () => this.props.setOpen(!this.props.open)};
      if (React.isValidElement(child)) {
        return React.cloneElement(child, props);
      }
      return child;
    });

    return (
      <div ref={this.menuRef}>
        <StyledBurger
          open={this.props.open}
          onClick={() => this.props.setOpen(!this.props.open)}
        >
          <span />
          <span />
          <span />
        </StyledBurger>
        <StyledMenu open={this.props.open}>{childrenWithProps}</StyledMenu>
      </div>
    );
  }
}

export default BurgerMenu;
