type detailsType = {
  detailsID: number;
  categoryID: number;
  detailDate: string;
  price: number | null;
  memo: string | null;
  // createdUserID: number;
  // deleted_flag: boolean;
  // deleted_date: string;
};

type categoryType = {
  categoryID: number;
  categoryName: string;
};

interface statisticsInterface {
  [key: string]: string;
  month: string;
  total: string;
};

type statisticsType = {
  month: string;
  total: number;
  [key: string]: string | number;
};
