import { useState, useEffect } from "react";
import axios from "axios";

import ItemList from "./component/ItemList";
import useInfiniteScroll from "./hook/useInfiniteScroll";

import "./scss/main.scss";
import "./scss/material-icons.scss";

function App() {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState("");
  const [_, setIsFetching] = useInfiniteScroll(getItemsOnScroll);

  function searchItem(e) {
    if (e.key === "Enter") {
    }
  }
  async function getItemsOnScroll() {
    try {
      if (page > 3) return;
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/goods${page}.json`
      );
      console.log(response);
      setItems([...items, ...response.data.data.list]);
      setPage(page + 1);
    } catch (err) {
      alert("에러 발생");
      console.log(err);
    } finally {
      setIsFetching(false);
    }
  }

  useEffect(() => {
    getItemsOnScroll();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="title">MUSINSA</h2>
        <div className="btn__group">
          <button className="btn__style" onClick={() => setShow(!show)}>
            검색
          </button>
          <button className="btn__style">세일상품</button>
          <button className="btn__style">단독상품</button>
          <button className="btn__style">품절포함</button>
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
        <ItemList items={items} />
      </div>
    </div>
  );
}

export default App;
