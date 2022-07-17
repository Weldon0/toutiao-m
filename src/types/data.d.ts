declare module UserInfo {
  export interface Data {
    id: string;
    name: string;
    photo: string;
    intro?: any;
    art_count: number;
    follow_count: number;
    fans_count: number;
    like_count: number;
  }

  export interface RootObject {
    data: Data;
    message: string;
  }
}

declare module ArticleList {
  interface RootObject {
    data: Data;
    message: string;
  }
  interface Data {
    results: Result[];
    pre_timestamp: string;
  }
  interface Result {
    art_id: string;
    title: string;
    aut_id: string;
    comm_count: number;
    pubdate: string;
    aut_name: string;
    is_top: number;
    cover: Cover;
  }
  interface Cover {
    type: number;
    images?: string[];
  }
}
declare module ArticleDetail {
  interface RootObject {
    data: Data;
    message: string;
  }
  interface Data {
    art_id: string;
    title: string;
    pubdate: string;
    aut_id: string;
    content: string;
    aut_name: string;
    aut_photo: string;
    is_followed: boolean;
    is_collected: boolean;
    attitude: number;
    comm_count: number;
    read_count: number;
    like_count: number;
  }
}

declare module UserInfo {
  interface RootObject {
    data: Data;
    message: string;
  }
  interface Data {
    id: string;
    photo: string;
    name: string;
    mobile: string;
    gender: number;
    birthday: string; // 生日
    intro?: any;
  }
}
