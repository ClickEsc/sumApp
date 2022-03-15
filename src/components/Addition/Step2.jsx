import React, {useState, useEffect, useContext, useRef} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSortAmountAsc, faSortAmountDesc, faFilter} from '@fortawesome/free-solid-svg-icons';
import {AdditionContext} from "../../store/additionContext";
import './addition.scss';

const Step2 = () => {
  const additionContext = useContext(AdditionContext);
  const [tableItems, setTableItems] = useState([]);
  const testArr = [{id: 1, value: 15}, {id: 2, value: 4}, {id: 3, value: 44}, {id: 4, value: 2}, {id: 5, value: 1}];
  const [clickSort, setClickSort] = useState(0);
  const [isFilterInputRowVisible, setIsFilterInputRowVisible] = useState(false);
  const [iconSort, setIconSort] = useState('');
  const [iconFilter, setIconFilter] = useState('');
  const [filterInputRow, setFilterInputRow] = useState(<></>);

  const filterInputRef = useRef();

  // console.log(additionContext.numbersArr)

  const Icon = ({icon, style, onClick}) => {
    return (
      <FontAwesomeIcon
        className="addition__table-icon"
        icon={icon}
        style={style} 
        onClick={onClick} 
      />
    )
  }

  const renderFilterInput = (visible) => {
    if (visible) {
      setFilterInputRow(
        <tr colSpan="2">
          <td colSpan="2">
              <button onClick={renderFilterResults}>Отфильтровать по значению:</button>
              <input required ref={filterInputRef} />
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
        <tr key={item.id}>
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

  const renderFilterResults = () => {
    const inputValue = Number(filterInputRef.current.value);
    filterTable(isFilterInputRowVisible, inputValue);
  }

  const handleSortTable = (click) => {
    if (click > 0 && click === 3) {
      renderTableItems(testArr);
      setClickSort(0);
    } else {
      const sortedValues = testArr.sort((a, b) => {
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
      renderTableItems(testArr);
    } else {
      const filteredValues = testArr.filter((item) => {
        if (item.value === value) {
          return item
        }
      })
      renderTableItems(filteredValues)
    }
  }

  const renderSortIcon = (click) => {
    switch(click) {
      case 0:
        setIconSort(<Icon style={{"color": "white"}} icon={faSortAmountAsc} onClick={handleSortBtnClick} />);
        break;
      case 1:
        setIconSort(<Icon style={{"color": "green"}} icon={faSortAmountAsc} onClick={handleSortBtnClick}/>);
        break;
      case 2:
        setIconSort(<Icon style={{"color": "green"}} icon={faSortAmountDesc} onClick={handleSortBtnClick}/>);
        break;
    }
  }

  const renderFilterIcon = (isFilterInputRowVisible) => {
    switch(isFilterInputRowVisible) {
      case false:
        setIconFilter(<Icon style={{"color": "white"}} icon={faFilter} onClick={handleFilterBtnClick} />);
        break;
      case true:
        setIconFilter(<Icon style={{"color": "green"}} icon={faFilter} onClick={handleFilterBtnClick}/>);
        break;
    }
  }

  useEffect(() => {
    renderTableItems(testArr);
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
    <div>
      <h3 className="addition__title">Шаг 2: Подтверждение данных</h3>
      <table className="addition__table">
        <caption>Таблица чисел, введённых на Шаге 1</caption>
        <thead>
          <tr className="addition__table-row">
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
      </table>
    </div>
  )
}

export default Step2;