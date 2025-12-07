import "./index.css";
import { Component } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

class Menuitem extends Component {
  state = { qty: 0 };

  oi = () => {
    const { oiq } = this.props;
    this.setState((ps) => ({ qty: ps.qty + 1 }), oiq);
  };

  od = () => {
    const { qty } = this.state;
    if (qty > 0) {
      const { odq } = this.props;
      this.setState((ps) => ({ qty: ps.qty - 1 }), odq);
    }
  };

  render() {
    const { qty } = this.state;
    const { di } = this.props;
    const {
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
                <button type="button" className="qbtn" onClick={this.oi}>
                  <FaPlus />
                </button>
                <p className="qty">{qty}</p>
                <button type="button" className="qbtn" onClick={this.od}>
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
}

export default Menuitem;
