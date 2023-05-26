import { RouteObject } from "react-router-dom";
import SamplePage from "../sample";

export const router: RouteObject[] = [
  {
    element: <SamplePage />
    , path: "/sample",
  },
];

