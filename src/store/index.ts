import { createStore } from 'vuex';

type authType = {
  userID: string | null;
  userName: string | null;
};

type dataType = {
  inputModel: detailInputType | null;
  categoryList: categoryType[];
  statisticsData: statisticsType[];
  auth: authType;
  monthData: number[];
  loading: boolean;
};

export default createStore<dataType>({
  state: {
    inputModel: null,
    categoryList: [],
    statisticsData: [],
    auth: {
      userID: sessionStorage.getItem('userID'),
      userName: sessionStorage.getItem('userName')
    },
    monthData: [],
    loading: false,
  },
  getters: {
    getCategoryNameList: (state) => {
      const categoryNameList = state.categoryList.map(item => item.categoryName);
      return categoryNameList;
    },
  },
  mutations: {
    initInputList: (state) => {
      const input: detailInputType = {
        detailsID: 0,
        categoryID: state.categoryList[0].categoryID,
        detailDate: '',
        detailDay: '',
        price: null,
        memo: null,
        createdUserID: state.auth.userID,
      };
      state.inputModel = input;
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
    setAuth: (state, payload: authType) => {
      state.auth.userID = payload.userID;
      state.auth.userName = payload.userName;
      sessionStorage.setItem('userID', String(payload.userID));
      sessionStorage.setItem('userName', String(payload.userName));
    },
    clearAuth: (state) => {
      state.auth.userID = null;
      state.auth.userName = null;
      sessionStorage.clear();
      // sessionStorage.setItem('userID', '');
      // sessionStorage.setItem('userName', '');
    },
    setCategory: (state, payload: categoryType[]) => {
      state.categoryList = payload;
    },
  },
  actions: {
    loadCategory: (ctx) => {
      ctx.commit('loadCategory');
    },
    setCategory: (ctx, payload: categoryType[]) => {
      ctx.commit('setCategory', payload);
    },
  },
  modules: {
  }
})
