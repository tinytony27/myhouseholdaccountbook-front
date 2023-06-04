import { createStore } from 'vuex';

type dataType = {
  inputList: detailsType[];
  categoryList: categoryType[];
};

export default createStore<dataType>({
  state: {
    inputList: [{
      detailsID: 0,
      categoryID: 1,
      detailDate: '',
      price: null,
      memo: '',
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    // },{ detailsID: 0, categoryID: 1, detailDate: '', price: null,
    }],
    categoryList: [],
  },
  getters: {
  },
  mutations: {
    loadCategory: (state) => {
      const c1 = {
        categoryID: 1,
        categoryName: 'C1'
      };
      state.categoryList.push(c1);
      const c2 = {
        categoryID: 2,
        categoryName: 'C2'
      };
      state.categoryList.push(c2);
      const c3 = {
        categoryID: 3,
        categoryName: 'C3'
      };
      state.categoryList.push(c3);
      const c4 = {
        categoryID: 4,
        categoryName: 'C4'
      };
      state.categoryList.push(c4);
    },
    add: (state) => {
      const data = {
        detailsID: 0,
        categoryID: 1,
        detailDate: '',
        price: null,
        memo: '',
      };
      state.inputList.push(data);
    },
  },
  actions: {
    loadCategory: (ctx) => {
      ctx.commit('loadCategory');
    },
    add: (ctx) => {
      ctx.commit('add');
    },
  },
  modules: {
  }
})
