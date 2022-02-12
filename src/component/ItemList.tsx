const internationalNumberFormat = new Intl.NumberFormat("en-US");

export default function ItemList({
  items,
  showSoldOut,
  showExclusive,
  showSale,
  init,
}) {
  return (
    <>
      {items.length ? (
        items.map((item, i) =>
          showItem(item, i, showSoldOut, showExclusive, showSale, init)
        )
      ) : (
        <div className="no-item">
          <img src={require("../assets/not-found.png")} />
          <div>검색 결과 없음</div>
        </div>
      )}
    </>
  );
}

function onHandleError(e) {
  console.log(e);
  e.target.src = require("../assets/no-image.png");
}
function getSaleRate(price: number, normalPrice: number) {
  const rate = Math.round(100 - (price / normalPrice) * 100);
  return rate ? rate + "%" : null;
}
function showItem(
  item: any,
  i: number,
  showSoldOut: boolean,
  showExclusive: boolean,
  showSale: boolean,
  init: boolean
) {
  if (!showSoldOut && item.isSoldOut) return null; // 품절상품
  if (!init) {
    // 버튼이 1개이상 선택된 상태
    if (
      !item.isSale &&
      !item.isExclusive &&
      !item.isSoldOut &&
      !(!showSale && !showExclusive)
    )
      return; // 세일/단독/품절이 아닌 상품

    if (showSale && !showExclusive) {
      // 세일버튼만 선택
      if (!item.isSale) return;
    }

    if (showExclusive && !showSale) {
      // 단독버튼만 선택
      if (!item.isExclusive) return;
    }

    if (showSale && showExclusive) {
      // 세일, 단독버튼 모두 선택
      if (!item.isSale && !item.isExclusive) return;
    }
  }
  return (
    <div key={i} className="item">
      <div
        className="item__image"
        onClick={() => window.open(item.linkUrl, "_blank")}
      >
        <img
          src={item.imageUrl}
          alt="사진없음"
          onError={(e) => onHandleError(e)}
          style={{
            opacity: item.isSoldOut ? 0.4 : null,
          }}
        />
        {item.isSoldOut ? <div className="soldout">SOLD OUT</div> : null}
      </div>
      <div className="tags">
        {!item.isSoldOut && item.isExclusive ? (
          <span className="exclusive">단독</span>
        ) : null}
      </div>
      <div>{item.brandName}</div>
      <div className="goods">{item.goodsName}</div>
      {/* 가격(할인 포함) */}
      <div>
        <span>{internationalNumberFormat.format(item.price)}</span>
        <span className="salerate">
          {getSaleRate(item.price, item.normalPrice)}
        </span>
      </div>
      {/* 일반가격 */}
      <div>{internationalNumberFormat.format(item.normalPrice)}</div>
    </div>
  );
}
