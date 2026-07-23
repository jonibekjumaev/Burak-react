import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";

/** REDUX SLICE & SELECTOR */

const actionDispacth = ( dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[] ) => dispatch(setPopularDishes(data)),
});

const popularDishesRetriever = createSelector(
  retrievePopularDishes, 
  (popularDishes) => ({ popularDishes }));


export default function HomePage() {

  const { setPopularDishes } = actionDispacth(useDispatch());
  const { popularDishes } = useSelector(popularDishesRetriever);
  //Selector: Store => Data

  useEffect(() => {
   // Backend server data request => Data
    const result = [
    {
        "_id": "6a3df47fc08d7b6483ab3384",
        "productStatus": "PROCESS",
        "productCollection": "DISH",
        "productName": "Steak",
        "productPrice": 17,
        "productLeftCount": 34,
        "productSize": "LARGE",
        "productVolume": 1,
        "productDesc": "New Steak ",
        "productImage": [],
        "productView": 0,
        "createdAt": "2026-06-26T03:39:43.616Z",
        "updatedAt": "2026-07-15T07:09:13.149Z",
        "__v": 0,
        "productViews": 2
    },
    {
        "_id": "6a3df1a3c08d7b6483ab337e",
        "productStatus": "PROCESS",
        "productCollection": "DISH",
        "productName": "Steak",
        "productPrice": 15,
        "productLeftCount": 95,
        "productSize": "NORMAL",
        "productVolume": 1,
        "productDesc": "New Steak - New taste - New experience = order now !!!",
        "productImage": [],
        "productView": 0,
        "createdAt": "2026-06-26T03:27:31.049Z",
        "updatedAt": "2026-07-16T14:42:31.517Z",
        "__v": 0,
        "productViews": 5
    }
]
   //Slice: Data => Store
   //@ts-ignore
   setPopularDishes(result);
  }, [])

  console.log("popularDishes", popularDishes);
  


  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
