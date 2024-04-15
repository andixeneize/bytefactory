export interface ITableData extends Pick<any, 'id' | 'username' | 'email'> {
  firstname: string;
  surname: string;
}

export interface user {
  address: {
    city: string
    geo: {
      lat: string
      lng: string
    }
    street: string
    suite: string
    zipcode: string
  }
  company: {
    bs: string
    catchPhrase: string
    name: string
  }
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
}
