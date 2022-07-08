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
