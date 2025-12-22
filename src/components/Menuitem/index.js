import "./index.css";
import { FaPlus, FaMinus } from "react-icons/fa";

const Menuitem = props => {
  const {oiq, odq, qty, di} = props
  const {
      dishId,
      dName,
      dPrice,
      dimg,
      currency,
      calories,
      description,
      availability,
      type,
      addonCat,
    } = di;

  oi = () => {
    oiq(dishId)
  };

  od = () => {
    if (qty > 0) {
      odq(dishId)
    }
  };

    const dt = type === 2 ? "veg" : "nveg";
    const dtc = type === 2 ? "vc" : "nvc";

    return (
      <li className="mi">
        <div className="hcon">
          <div className={dtc}>
            <div className={dt}> </div>
          </div>
          <div className="dishcon">
            <h2 className="dh">{dName}</h2>
            <p className="price">
              {currency} {dPrice}
            </p>
            <p className="dd">{description}</p>
            {availability ? (
              <div className="qcon">
                <button type="button" className="qbtn" onClick={oi}>
                  <FaPlus />
                </button>
                <p className="qty">{qty}</p>
                <button type="button" className="qbtn" onClick={od}>
                  <FaMinus />
                </button>
              </div>
            ) : (
              <p className="na">Not Available</p>
            )}
            {availability && addonCat.length !== 0 ? (
              <p className="addon">Customizations available</p>
            ) : null}
          </div>
        </div>
        <div className="h2con">
          <p className="cal">{calories} calories</p>
          <img className="dimg" src={dimg} alt={dName} />
        </div>
      </li>
    );
  }

export default Menuitem;

