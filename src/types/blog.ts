export default interface Blog {
  bid: string;
  title: string;
  body: string;
  date: string;
  imageURL: string;
  uid: string;
}

export interface BlogFormData {
  // add image url later
  title: string;
  body: string;
  imageURL: string;
}
