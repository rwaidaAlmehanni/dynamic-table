/**
 * Created by Rwaida on 13/08/2021.
 */
import React, {useEffect, useState} from 'react';
import TableColumn from "./TableColumn"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
    ON_CLICK_ORDER,
    ON_DELETE_ROW,
    UPDATE_ROWS_ORDER
} from "../store/Constant";
import ColumnData from "./ColumnData";
import {getItemStyle, getListStyle, reorder} from "../utils/helpers";

const RowsList = ( props ) => {
    const [ selectedList, setSelectedList ] = useState([]);
    const { rows, handleUpdateRedux, filteredList } = props;
    const displayedList = filteredList.length > 0 ?  filteredList : rows;

    const columns = [
        { id: 0, name: <button  className={'order-button'}
                                onClick={() => { handleUpdateRedux(ON_CLICK_ORDER);}}>Order</button>},
        { id: 1, name: 'Text'},
        { id: 2, name: 'Date'},
        { id: 3, name: 'Number'},
        { id: 4, name: <button disabled={selectedList.length === 0}
                               className={'delete-button'}
                               onClick={() => { handleUpdateRedux(ON_DELETE_ROW, { selectedList});
                                                setSelectedList([]) }}>Delete</button>},
    ]

    const onSelectRow = (id) => {
        let itemPosition = selectedList.indexOf(id);
        if( itemPosition === -1 ){
            setSelectedList([...selectedList, id])
        } else {
            let newList = [...selectedList];
            newList.splice(itemPosition, 1)
            setSelectedList(newList);
        }
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        const items = reorder(
            rows,
            result.source.index,
            result.destination.index
        );
        handleUpdateRedux(UPDATE_ROWS_ORDER, items);
    }

    const _renderTableBody = () =>{
        return displayedList.map( (row, index) =>{
            const columnDataProps = {
                row,
                index,
                handleUpdateRedux,
            }
            return (
                <tr>
                    <td className={'content-col'}>
                        <Draggable key={row.id} draggableId={`${row.id}_${index}`} index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}
                                >
                                    <h5>{row.id}</h5>
                                </div>)}
                        </Draggable>
                    </td>
                    <ColumnData {...columnDataProps} colKey={'text'} />
                    <ColumnData {...columnDataProps} colKey={'date'} initValue={new Date()}/>
                    <ColumnData {...columnDataProps} colKey={'number'} initValue={0}/>
                    <td className={'content-col'}>
                        <input type="checkbox" id="myCheck"
                               checked={selectedList.indexOf(row.id) > -1}
                               onClick={()=>{onSelectRow(row.id)}}/>
                    </td>
                </tr>
            )
        })
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                    >
                        <table>
                            <tr>
                                {columns.map((column)=>{
                                    return (
                                        <TableColumn column={column}/>
                                    )
                                })}
                            </tr>
                            {_renderTableBody()}
                        </table>
                        {provided.placeholder}
                    </div>)}
            </Droppable>
        </DragDropContext>
    )
}

RowsList.propTypes = {};
export default RowsList;