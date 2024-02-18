import DataAccess  from "../../data-access/mocks/mock-data-access";
import { User } from "../../data-access/model";
import { Controller } from "../controller";

const dataAccess = new DataAccess(User)
export const controller = new Controller(dataAccess)