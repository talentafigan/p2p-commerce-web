export interface interfaceSidebar {
    title?: string;
    icon?: string;
    allow?: string;
    child?: interfaceSidebar[];
    to?: string;
  }
  
  export interface interfacePagination {
    perPage?: number | string;
    page: number;
    size: number;
  }
  
  export interface interfaceTransaction {
    date: string;
  }
  
  export interface UserDto {
    name: string;
    username: string;
    password: string;
    role: string;
  }