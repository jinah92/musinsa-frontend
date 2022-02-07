const internationalNumberFormat = new Intl.NumberFormat("en-US");

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
                alt="상품이미지"
                style={{
                  opacity: item.isSoldOut ? 0.4 : null,
                }}
              />
              {item.isSoldOut ? <div className="soldout">SOLD OUT</div> : null}
              {item.isExclusive ? <div className="exclusive">단독</div> : null}
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
