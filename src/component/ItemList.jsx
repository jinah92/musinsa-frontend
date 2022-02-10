// import noImage from "../assets/no-image.svg";
const internationalNumberFormat = new Intl.NumberFormat("en-US");

function onHandleError(e) {
  console.log(e);
  e.target.src = require("../assets/no-image-6663.png");
}

export default function ItemList({ items }) {
  return (
    <>
      {items.map((item, i) => {
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
              {!item.isSoldOut && item.isSale ? (
                <span className="sale">할인</span>
              ) : null}
            </div>
            <div>{item.brandName}</div>
            <div>{item.goodsName}</div>
            {/* 가격(할인 포함) */}
            <div>{internationalNumberFormat.format(item.price)}</div>
            {/* 일반가격 */}
            <div>{internationalNumberFormat.format(item.normalPrice)}</div>
          </div>
        );
      })}
    </>
  );
}
