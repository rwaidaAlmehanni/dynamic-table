/**
 * Created by Rwaida on 13/08/2021.
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {UPDATE_COLUMN_CONTENT, UPDATE_COLUMN_STATUS} from "../store/Constant";

const ColumnData = ( props ) => {
    const { row, index, initValue, colKey, handleUpdateRedux } = props;
    const [currentData, setCurrentData] = useState(initValue || '')

    const onClick = () => {
        handleUpdateRedux(UPDATE_COLUMN_CONTENT, {
            index,
            key: colKey,
            content: currentData
        })
        handleUpdateRedux(UPDATE_COLUMN_STATUS, { index, key: colKey })
        setCurrentData(initValue)
    }

    return (
        <td className={'content-col'}
            onClick={!row[colKey]['isActive'] ? () => {
                handleUpdateRedux(UPDATE_COLUMN_STATUS, { index, key: colKey })
                setCurrentData(row[colKey]['content'])
            } : null}
        >
            {row[colKey]['isActive'] ?
                <input type={colKey}
                       className={'opacity'}
                       id={`${index}`}
                       value={currentData}
                       name={'name'}
                       onChange={(e) => {
                           setCurrentData(e.target.value)
                       }}
                       onKeyUp={(e) => {
                           if(e.which === 13)
                               onClick()} }
                       onBlur={(e) => {
                           onClick()
                       }}
                /> :
                <h5>{row[colKey]['content']}</h5>
            }
        </td>
    )
}

ColumnData.propTypes = {
    row: PropTypes.object,
    colKey: PropTypes.string,
    index: PropTypes.number,
    initValue: PropTypes.any,
    onClickFunction: PropTypes.func,
    handleUpdateRedux: PropTypes.func,
};

export default ColumnData;