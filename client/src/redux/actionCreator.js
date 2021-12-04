import axios from "axios";
import { cartUserId } from "../urls";
import activeUser from "../components/custom_hooks/activeUser";
import jwtToken from "../components/custom_hooks/GetJwtToken";

const gettingItems = () => {
  return async function (dispatch) {
    try {
      const { id } = await activeUser();
      let url = cartUserId(id);
      const res = await axios.get(url, {
        headers: {
          token: jwtToken(),
        },
      });

      dispatch({ type: "GET_ITEM", res });
    } catch (e) {
      // console.log(e.response);
      dispatch({
        type: "NOT_FOUND_ITEM",
        msg: e.message,
      });
    }
  };
};

export { gettingItems };
