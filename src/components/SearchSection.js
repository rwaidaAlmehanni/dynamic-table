/**
 * Created by Rwaida on 13/08/2021.
 */
import React, { useState } from 'react';
import Button from "./Button";
import PropTypes from "prop-types";
import { ON_SEARCH_TEXT } from "../store/Constant";

const SearchSection =( props )=> {
    const [ search, setSearch ] = useState('');
    const { handleUpdateRedux } = props;

    const onClickSearch = () => {
        console.log(search)
        handleUpdateRedux(ON_SEARCH_TEXT, search)
    }

    return (
      <form className={'flex-div'}>
        <input type="text"
               id="searchId"
               value={search}
               name="search"
               className={'input'}
               placeholder="Search Text..."
               onChange={(e) => { setSearch(e.target.value)}}
        />
        <div>
          <Button title={"Search"} onClick={ onClickSearch }/>
        </div>
      </form>
    )
  }

SearchSection.propTypes = {
    handleUpdateRedux: PropTypes.func,
};

export default SearchSection;
