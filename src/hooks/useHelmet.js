import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setHelmetTitle } from "../store/app/helmetSlice";

const useHelmet = (title) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setHelmetTitle(title));
  }, [title]);

  const setHelmet = useCallback(
    (title) => {
      dispatch(setHelmetTitle(title));
    },
    [dispatch]
  );

  return { setHelmet };
};

export default useHelmet;
