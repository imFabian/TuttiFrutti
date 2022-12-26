export const state = () => ({
  userLogged: JSON.parse(localStorage.getItem('user')) ?? null,
  cart: JSON.parse(localStorage.getItem('cart')) ?? []
})

export const getters = {
  getUserLogged(state) {
    return state.userLogged;
  },
  getCart(state) {
    return state.cart;
  },
}

export const mutations = {
  changeUserLogged(state, user) {
    localStorage.setItem("user", JSON.stringify(user));
    state.userLogged = user;
  },
  changeCart(state, cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    state.cart = cart;
  },
  changeCartHandler(state, obj) {
    state.cart[obj.index].amount = obj.action == 'add' ? state.cart[obj.index].amount + 1 : state.cart[obj.index].amount - 1;
    localStorage.setItem("cart", JSON.stringify(state.cart));
  },
}

export const actions = {
  setUserLogged({ state, commit }, user) {
    commit('changeUserLogged', user);
  },
  setCartStore({ state, commit }, cart) {
    commit('changeCart', cart);
  },
  setCartStoreHandler({ state, commit }, obj) {
    commit('changeCartHandler',obj);
  },
  async initTransaction({ state, commit },item) {
    let { data } = await this.$axios.get(`https://main--sage-tanuki-610946.netlify.app/.netlify/functions/api/init/`+item.total+"/"+item.buy_order+"/"+item.session_id);
    return data;
  },
  async confirmTransaction({ state, commit },token) {
    let { data } = await this.$axios.get("https://main--sage-tanuki-610946.netlify.app/.netlify/functions/api/confirm/"+token);
    return data;
  },
  async setProductDB({ state, commit }, product) {
    try {
      const insert = await this.$axios.post(`https://tuttifruti-46344-default-rtdb.firebaseio.com/products.json`, product);
      return insert;
    } catch (e) {
      return [];
    }
  },
  async updateProductDB({ state, commit }, product) {
    try {
      const update = await this.$axios.put(`https://tuttifruti-46344-default-rtdb.firebaseio.com/products/${product.id}.json`, product);
      return update;
    } catch (e) {
      return [];
    }
  },
  async setSaleDB({ state, commit }, sale) {
    try {
      const insert = await this.$axios.put(`https://tuttifruti-46344-default-rtdb.firebaseio.com/sales/${sale.buy_order}.json`, sale);
      return insert;
    } catch (e) {
      return [];
    }
  },
  async getSaleDB({ state, commit }, id) {
    try {
      const sale = await this.$axios.get(`https://tuttifruti-46344-default-rtdb.firebaseio.com/sales/${id}.json`, sale);
      return sale.data;
    } catch (e) {
      return [];
    }
  },
  async getAllSalesDB({ state, commit }, id) {
    try {
      const {data} = await this.$axios.get(`https://tuttifruti-46344-default-rtdb.firebaseio.com/sales.json`);
      let arrayData = [];
      if (data != null) {
        Object.keys(data).forEach(key => {
          data[key].id = key;
          arrayData.push(data[key]);
        });
      } else {
        arrayData = [];
      }
      return arrayData;
    } catch (e) {
      return [];
    }
  },
  async getAllProducts({ commit }) {
    try {
      let { data } = await this.$axios.get(`https://tuttifruti-46344-default-rtdb.firebaseio.com/products.json`);
      if (data != null) {
        Object.keys(data).forEach(key => {
          data[key].id = key;
        });
      } else {
        data = [];
      }
      return data;
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  async deleteById({ commit }, id) {
    try {
      let res = await this.$axios.delete(`https://tuttifruti-46344-default-rtdb.firebaseio.com/products/${id}.json`);
      return res;
    } catch (e) {
      console.error(e);
      return [];
    }
  }
}