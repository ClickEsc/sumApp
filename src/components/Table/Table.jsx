import React, {useState, useEffect, useContext, useRef} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSortAmountAsc, faSortAmountDesc, faFilter, faCircle} from '@fortawesome/free-solid-svg-icons';
import {AdditionContext} from "../../store/additionContext";
import './table.scss';

const AdditionTable = ({withSumRow}) => {
  const [additionContext, setAdditionContext] = useContext(AdditionContext);
  const [tableItems, setTableItems] = useState([]);
  const [iconSort, setIconSort] = useState('');
  const [iconFilter, setIconFilter] = useState('');
  const [clickSort, setClickSort] = useState(0);
  const [filterInputRow, setFilterInputRow] = useState(<></>);
  const [isFilterInputRowVisible, setIsFilterInputRowVisible] = useState(false);
  const filterInputRef = useRef();
  const {step, inputValuesArr} = additionContext;
  const iconColor = "#8b366aa8";

  const renderFilterInput = (visible) => {
    if (visible) {
      setFilterInputRow(
        <tr colSpan="2">
          <td colSpan="2">
              <button onClick={renderFilterResults}>Отфильтровать по значению:</button>
              <input required ref={filterInputRef} onKeyPress={(e) => {
                  if (e.code == 'Enter') {
                    renderFilterResults()
                  }
                }
              } />
          </td>
        </tr>
      )
    } else {
      setFilterInputRow(<></>)
    }
  }

  const renderTableItems = (arr) => {
    const newTableItems = arr.map((item) => {
      return (
        <tr key={item.id} className={item.value > 10 && additionContext.step === 4? 'highlight' : ''}>
          <td>Число {item.id}</td>
          <td>{item.value}</td>
        </tr>
      )
    })
    setTableItems(newTableItems);
  }

  const handleSortBtnClick = () => {
    setClickSort(clickSort + 1);
    handleSortTable(clickSort + 1);
  }

  const handleFilterBtnClick = () => {
    setIsFilterInputRowVisible(!isFilterInputRowVisible);
  }

  const renderFilterResults = (e) => {
    const inputValue = Number(filterInputRef.current.value);
    filterTable(isFilterInputRowVisible, inputValue);
  }

  const handleSortTable = (click) => {
    if (click > 0 && click === 3) {
      renderTableItems(inputValuesArr);
      setClickSort(0);
    } else {
      const sortedValues = inputValuesArr.sort((a, b) => {
        if (click === 1) {
          return b.value - a.value
        } else {
          return a.value - b.value
        }
      })
      renderTableItems(sortedValues)
    }
  }

  const filterTable = (isVisible, value) => {
    if (!isVisible) {
      renderTableItems(inputValuesArr);
    } else {
      const filteredValues = inputValuesArr.filter((item) => {
        if (item.value === value) {
          return item
        }
      })
      renderTableItems(filteredValues)
    }
  }

  const Icon = ({icon, style, onClick}) => {
    return (
      <FontAwesomeIcon
        className="table__icon"
        icon={icon}
        style={style} 
        onClick={onClick} 
      />
    )
  }

  const renderSortIcon = (click) => {
    switch(click) {
      case 0:
        setIconSort(<Icon style={{"color": "white"}} icon={faSortAmountAsc} onClick={handleSortBtnClick} />);
        break;
      case 1:
        setIconSort(<Icon style={{"color": iconColor}} icon={faSortAmountAsc} onClick={handleSortBtnClick}/>);
        break;
      case 2:
        setIconSort(<Icon style={{"color": iconColor}} icon={faSortAmountDesc} onClick={handleSortBtnClick}/>);
        break;
    }
  }

  const renderFilterIcon = (isFilterInputRowVisible) => {
    switch(isFilterInputRowVisible) {
      case false:
        setIconFilter(<Icon style={{"color": "white"}} icon={faFilter} onClick={handleFilterBtnClick} />);
        break;
      case true:
        setIconFilter(<Icon style={{"color": iconColor}} icon={faFilter} onClick={handleFilterBtnClick}/>);
        break;
    }
  }

  useEffect(() => {
    renderTableItems(inputValuesArr);
  }, []);

  useEffect(() => {
    renderSortIcon(clickSort);
  }, [clickSort]);

  useEffect(() => {
    renderFilterIcon(isFilterInputRowVisible);
    renderFilterInput(isFilterInputRowVisible);
    if (!isFilterInputRowVisible) {
      filterTable(isFilterInputRowVisible)
    }
  }, [isFilterInputRowVisible]);

  return (
    <>
      <table className="table">
        <caption className="table__caption">Таблица чисел, введённых на Шаге 1</caption>
        <thead>
          <tr className="table__row">
            <th>Название ячейки</th>
            <th>
              Значение
              {iconSort}
              {iconFilter}
            </th>
          </tr>
          {filterInputRow}
        </thead>
        <tbody>
          {tableItems}
        </tbody>
        {withSumRow 
          ? <tfoot>
              <tr className="extra">
                <td className="table__sum-text">Сумма:</td>
                <td>{additionContext.sum}</td>
              </tr>
            </tfoot>
          : <></>
        }
      </table>
      {step === 4
        ? <div className="table__footnote">
            <Icon style={{"color": "#a8c3b7"}} icon={faCircle} />
            <p className="table__footnote-text">Цветом выделены строки со&nbsp;значением более&nbsp;10</p>
          </div>
        : ''
      }
    </>
  )
}

export default AdditionTable;