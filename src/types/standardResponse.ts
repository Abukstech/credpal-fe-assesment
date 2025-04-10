import { Transaction } from "./transaction";
import { User } from "./user";

export interface StandardResponse {
  statusCode: number;
  message: string;
 
}

export interface LoginResponse extends StandardResponse  {

  data?: {
  
    user: User;
  };
}


export interface balanceResponse extends StandardResponse {
  data?: {
    balance: number;
  };

}
  export interface transactionsResponse extends StandardResponse {
    data?: {
      data: Transaction[]
      meta?:{
        totalPages: number;
        currentPage: number;
      }
    }
   
  }

