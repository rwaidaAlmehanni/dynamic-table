/**
 * Created by Rwaida on 13/08/2021.
 */
import React from 'react';

const TableColumn =( props )=>{

    const {column} = props;
    return (
      <th key={column.id} className={'center table-column'}>
        <div>
            <h3>{column.name}</h3>
        </div>
      </th>)

  }

TableColumn.propTypes = {};
export default TableColumn;

