import React, { Component } from 'react';
import {
  Dropdown,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sortListActions from '../../../actions/sortListActions';
import { sortDirections } from './sortConstants';
import { storage } from './sortUtils';
import './SortList.scss';
import { ReactComponent as SortIcon } from './sort.svg';
import { ReactComponent as SortIconAsc } from './sort-asc.svg';
import { ReactComponent as SortIconDesc } from './sort-desc.svg';

class SortList extends Component {
  constructor(props) {
    super(props);
    const { storageKey, sortListActions: { setSort } } = this.props;

    const loadedSortData = storage.get(storageKey) || {};
    const { field, direction } = loadedSortData;
    setSort(storageKey, field, direction);
  }

  setSort = (newField, newDirection) => {
    const { storageKey, allSortSettings, sortListActions: { setSort } } = this.props;
    const { field, direction } = allSortSettings[storageKey] || {};

    if (field === newField && direction === newDirection) {
      setSort(storageKey, '', sortDirections.NONE);
    } else {
      setSort(storageKey, newField, newDirection);
    }
  };

  render() {
    const { color, allSortSettings, storageKey } = this.props;
    const { field, direction } = allSortSettings[storageKey] || {};

    return (
      <Dropdown
        alignRight
        className="dropdown-pull-up"
      >
        <Dropdown.Toggle
          className="btn-no-outline no-arrow"
          size="sm"
          variant="none"
        >
          <SortIcon fill={color} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            className="btn-group btn-group-vertical dont-highlight p-0"
            key="name"
          >
            <ButtonGroup
              size="sm"
            >
              <Button
                variant=""
                className="rounded-0 text-left disabled btn-no-outline"
              >
                Name
              </Button>
              <Button
                variant="light"
                active={field === 'name' && direction === sortDirections.ASC}
                className="rounded-0 btn-no-outline flex-grow-0"
                onClick={() => this.setSort('name', sortDirections.ASC)}
              >
                <SortIconAsc />
              </Button>
              <Button
                variant="light"
                active={field === 'name' && direction === sortDirections.DESC}
                className="rounded-0 btn-no-outline flex-grow-0"
                onClick={() => this.setSort('name', sortDirections.DESC)}
              >
                <SortIconDesc />
              </Button>
            </ButtonGroup>
          </Dropdown.Item>
          <Dropdown.Item
            className="btn-group btn-group-vertical dont-highlight p-0"
            key="priorityForSorting"
          >
            <ButtonGroup
              size="sm"
            >
              <Button
                variant=""
                className="rounded-0 text-left disabled btn-no-outline"
              >
                Priority
              </Button>
              <Button
                variant="light"
                active={field === 'priority' && direction === sortDirections.ASC}
                className="rounded-0 btn-no-outline flex-grow-0"
                onClick={() => this.setSort('priority', sortDirections.ASC)}
              >
                <SortIconAsc />
              </Button>
              <Button
                variant="light"
                active={field === 'priority' && direction === sortDirections.DESC}
                className="rounded-0 btn-no-outline flex-grow-0"
                onClick={() => this.setSort('priority', sortDirections.DESC)}
              >
                <SortIconDesc />
              </Button>
            </ButtonGroup>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

const mapStateToProps = ({ sortListReducer }) => ({
  allSortSettings: sortListReducer,
});
const mapDispatchToProps = dispatch => ({
  sortListActions: bindActionCreators(sortListActions, dispatch),
});

export { SortList as SortListComponent };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SortList);
