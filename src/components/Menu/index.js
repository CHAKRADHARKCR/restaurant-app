import "./index.css";
import { Component } from "react";
import { TailSpin } from "react-loader-spinner";
import { FaShoppingCart } from "react-icons/fa";
import Menuitem from "../Menuitem";

const CategoryItem = (props) => {
  const { ci, select, occ } = props;
  const { menuCategoryId, menuCategory } = ci;

  const oc = () => {
    occ(menuCategoryId);
  };

  const cn = select ? "sc" : "nsc";

  return (
    <li className="cli">
      <button type="button" className={cn} onClick={oc}>
        {menuCategory}
      </button>
    </li>
  );
};

class Menu extends Component {
  state = {
    isloading: true,
    menu: [],
    restaurantName: "",
    activeCat: "11",
    tqty: 0,
    cart: {},
  };

  componentDidMount() {
    this.getdetails();
  }

  formatMenu = (mi) => ({
    restaurantName: mi.restaurant_name,
    menu: mi.table_menu_list,
  });

  formatCat = (ci) => ({
    menuCategoryId: ci.menu_category_id,
    menuCategory: ci.menu_category,
    dishes: ci.category_dishes,
  });

  formatMenuItem = (di) => ({
    dishId: di.dish_id,
    dName: di.dish_name,
    dPrice: di.dish_price,
    dimg: di.dish_image,
    currency: di.dish_currency,
    calories: di.dish_calories,
    description: di.dish_description,
    availability: di.dish_Availability,
    type: di.dish_Type,
    addonCat: di.addonCat,
  });

  occ = (activeCat) => {
    this.setState({ activeCat });
  };

  oiq = dishId =>
    this.setState(ps => ({
      tqty: ps.tqty + 1,
      cart: {...ps.cart, [dishId]: (ps.cart[dishId] || 0) + 1},
    }))

  odq = dishId => {
    const {tqty} = this.state
    if (tqty > 0) {
      this.setState(ps => ({
        tqty: ps.tqty - 1,
        cart: {...ps.cart, [dishId]: (ps.cart[dishId] || 0) - 1},
      }))
    }
  }

  getdetails = async () => {
    const url =
      "https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details";
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok === true) {
      const fdata = data.map((mi) => this.formatMenu(mi));
      const { restaurantName, menu } = fdata[0];
      this.setState({
        isloading: false,
        menu,
        restaurantName,
      });
    }
  };

  render() {
    const { isloading, restaurantName, menu, activeCat, tqty, cart } = this.state;
    const fmenu = menu.map((ci) => this.formatCat(ci));
    const umenu = fmenu.find((ci) => ci.menuCategoryId === activeCat);
    const { dishes } = umenu || { dishes: [] };
    const fdishes = dishes.map((di) => this.formatMenuItem(di));
    return isloading ? (
      <div className="lcon">
      <TailSpin className="bgc" color="#00BFFF" height={50} width={50} />
      </div>
    ) : (
      <div className="bgc">
        <div className="tcon">
          <h1 className="rh">{restaurantName}</h1>
          <div className="ccon">
            <p className="op">My orders</p>
            <div className="cartcon">
              <FaShoppingCart className="cart" />
              <span className="tqty">{tqty}</span>
            </div>
          </div>
        </div>
        <ul className="cul">
          {fmenu.map((ci) => (
            <CategoryItem
              key={ci.menuCategoryId}
              ci={ci}
              occ={this.occ}
              select={ci.menuCategoryId === activeCat}
            />
          ))}
        </ul>
        <ul className="mul">
          {fdishes.map((di) => (
            <Menuitem key={di.dishId} di={di} oiq={this.oiq} odq={this.odq} qty={cart[di.dishId] || 0} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Menu;



