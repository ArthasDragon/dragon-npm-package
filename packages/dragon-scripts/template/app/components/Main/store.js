import { action } from "mobx";
import API from "@api";
import { LOGIN_PATH } from "@constant";
import { getSessionLoginInfo } from "hlj-utils";

class Store {
  merchantInfo = getSessionLoginInfo();

  @action
  logoutAction = async () => {
    const { success } = await API.logout();

    if (success) {
      sessionStorage.clear();
      window.location.href = LOGIN_PATH;
    }
  };
}

export default new Store();
