import { useState, useEffect } from "react";
import axios from "axios";

import ItemList from "./component/ItemList";
import useInfiniteScroll from "./hook/useInfiniteScroll";

import "./scss/main.scss";
import "./scss/material-icons.scss";

let page = 0

function App() {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState("");
  const [_, setIsFetching] = useInfiniteScroll(getItemsOnScroll);
  const [showSale, setShowSale] = useState(false)
  const [initSaleState, setInitSaleState] = useState(true)
  const [showExclusive, setShowExclusive] = useState(false)
  const [initExclusiveState, setInitExclusiveState] = useState(true)
  const [showSoldOut, setShowSoldOut] = useState(false)
  const [init, setInit] = useState(true)
  const [searchMode, setSearchMode] = useState(false)

  function searchItem(e) {
    if (e.key === "Enter") {
      page = 0
      if (target.length) {
        searchByKeyword()
      } else {
        getItemsOnScroll()
      }
    }
  }
  async function getItemsOnScroll() {
    try {
      if (page > 3) return;
      console.log(page)
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/goods${page}.json`
      );
      let _items = target.length ? (page === 0) ? [] : items : (page === 0) ? [] : items 
      let _getItems = response.data.data.list
      console.log(_items)
      if (target.length) {
        // 검색 키워드가 있는 경우
        let preprocessed = target
        preprocessed = preprocessed.replace(/\s/g, "").toLowerCase()
        console.log(preprocessed)
        _items = _items.filter(item => (item.brandName.replace(/\s/g, "").toLowerCase().includes(preprocessed) || item.goodsName.replace(/\s/g, "").toLowerCase().includes(preprocessed)))
        _getItems = _getItems.filter(item => (item.brandName.replace(/\s/g, "").toLowerCase().includes(preprocessed) || item.goodsName.replace(/\s/g, "").toLowerCase().includes(preprocessed)))
        console.log(_items, _getItems)
      }
      let _sumList = [..._items, ..._getItems]
      setItems(_sumList.filter((arr, index, callback) => index === callback.findIndex(t => t.goodsNo === arr.goodsNo)));
      page += 1
    } catch (err) {
      alert("에러 발생");
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }

  async function searchByKeyword() {
    for (let i in [0, 1, 2, 3]) {
      console.log('search', i)
      await getItemsOnScroll()
    }
  }

  useEffect(() => {
    if (!showSale && !showExclusive && !showSoldOut) {
      if (!init) setInit(true)
    } else {
      setInit(false)
    }
    page = 0
    window.scrollTo(0, 0)
  }, [showSale, showExclusive, showSoldOut])

  useEffect(() => {
    getItemsOnScroll()
  }, [])

  useEffect(() => {
   if (page === 0) getItemsOnScroll()
  }, [page])

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">MUSINSA</h2>
        <div className="btn__group">
          <button className="btn__style" onClick={() => setShow(!show)}>
            검색
          </button>
          <button className={"btn__style" + (showSale ? " clicked" : "")} onClick={() => {setShowSale(!showSale)}}>세일상품</button>
          <button className={"btn__style" + (showExclusive ? " clicked" : "")} onClick={() => {setShowExclusive(!showExclusive)}}>단독상품</button>
          <button className={"btn__style" + (showSoldOut ? " clicked" : "")} onClick={() => {setShowSoldOut(!showSoldOut)}}>품절포함</button>
        </div>
        {show && (
          <div className="search">
            <i className="material-icons">search</i>
            <input
              className="search__input"
              placeholder="상품명 검색"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              onKeyPress={searchItem}
            />
          </div>
        )}
      </header>
      <div className="items">
        <ItemList items={items} showSoldOut={showSoldOut} showExclusive={showExclusive} showSale={showSale} init={init} />
      </div>
    </div>
  );
}

export default App;
