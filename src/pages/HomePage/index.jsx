import SliDer from "../../components/SliDer";
import { ImagesData } from "../../components/SliDer/ImagesData";
import CardImage from "../../components/CardImage";
import Collection from "../../components/Collection";
import News from "../../components/News";
import ProductLine from "../../components/ProductLine";
import ShowRoom from "../../components/ShowRoom";
import ProductsDemo from "../../components/ProductsDemo";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  actfetchAllProduct,
  deleteFilterReducer,
  setSearchKey,
} from "../../redux/features/products/productSlice";
import SlickCarouselSale from "../../components/SlickCarouselSale";

const HomePage = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchKey(""));
    dispatch(deleteFilterReducer(null));
    dispatch(actfetchAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <SliDer slides={ImagesData} />
      <CardImage />
      <SlickCarouselSale />
      <ProductsDemo />
      <Collection />
      <News />
      <ProductLine />
      <ShowRoom />
    </>
  );
};

export default HomePage;
