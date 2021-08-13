import React, { Component } from 'react';
import SearchSection from "../../components/SearchSection";
import Button from "../../components/Button";
import {connect} from "react-redux";
import { handleUpdateRedux } from '../../store/actions';
import { ADD_NEW_ROW } from '../../store/Constant';
import RowsList from "../../components/RowsList";


class MainPage extends Component {
  constructor() {
    super();
  }

  _handleAddNewRow= () => {
    this.props.handleUpdateRedux(ADD_NEW_ROW)
  }

  render() {
    const { rows, filteredList } = this.props;
    return (
        <div className={'App'}>
          <h1>Dynamic Table</h1>
          <SearchSection handleUpdateRedux={this.props.handleUpdateRedux}/>
          <div className={'table-rows'}>
            <RowsList rows={rows}
                      filteredList={filteredList}
                      handleUpdateRedux={this.props.handleUpdateRedux}
            />
          </div>
          <Button title={"Add New Row"}
                  onClick={this._handleAddNewRow}/>
        </div>
    );
  }
}

const mapStateTopProps = (state)=>({
  rows: state.app.rows,
  filteredList: state.app.filteredList,
})

const mapDispatchToProps = (dispatch) => ({
  handleUpdateRedux( query, type ) {
    dispatch(handleUpdateRedux( query, type ));
  },
});

export default connect(mapStateTopProps, mapDispatchToProps)(MainPage);
