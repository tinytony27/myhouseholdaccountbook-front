import { createStore } from 'vuex';

type dataType = {
  inputList: detailsType[];
  categoryList: categoryType[];
};

export default createStore<dataType>({
  state: {
    inputList: [],
    categoryList: [],
  },
  getters: {
  },
  mutations: {
    initInputList: (state) => {
      state.inputList = [];
      const input: detailsType = {
        detailsID: 0,
        categoryID: state.categoryList[0].categoryID,
        detailDate: '',
        price: null,
        memo: null,
      };
      state.inputList.push(input);
    },
    loadCategory: (state) => {
      const c1 = {
        categoryID: 1,
        categoryName: 'cate1'
      };
      state.categoryList.push(c1);
      const c2 = {
        categoryID: 2,
        categoryName: 'cate2'
      };
      state.categoryList.push(c2);
      const c3 = {
        categoryID: 3,
        categoryName: 'cate3'
      };
      state.categoryList.push(c3);
      const c4 = {
        categoryID: 4,
        categoryName: 'cate4'
      };
      state.categoryList.push(c4);
    },
    setCategory: (state, payload: categoryType[]) => {
      // console.log('start');
      // console.log(payload);
      state.categoryList = [];
      for(let i = 0; i < payload.length; i++){
        // console.log(i);
        const tmp: categoryType = payload[i];
        // console.log(tmp);
        state.categoryList.push(tmp);
      }
    },
    add: (state) => {
      const data = {
        detailsID: 0,
        categoryID: state.categoryList[0].categoryID,
        detailDate: '',
        price: null,
        memo: null,
      };
      state.inputList.push(data);
    },
  },
  actions: {
    loadCategory: (ctx) => {
      ctx.commit('loadCategory');
    },
    setCategory: (ctx, payload: categoryType[]) => {
      ctx.commit('setCategory', payload);
    },
    add: (ctx) => {
      ctx.commit('add');
    },
  },
  modules: {
  }
})
