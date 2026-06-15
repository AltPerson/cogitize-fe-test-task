import { swapPreviewApi } from "@/05.features";
import { assetsApi } from "@/06.entities";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

const combines = combineReducers({
  [assetsApi.reducerPath]: assetsApi.reducer,
  [swapPreviewApi.reducerPath]: swapPreviewApi.reducer,
});

const rootReducer = (
  state: ReturnType<typeof combines> | undefined,
  action: Parameters<typeof combines>[1]
) => {
  if (action.type === "user/logout") {
    state = undefined;
  }
  return combines(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(assetsApi.middleware, swapPreviewApi.middleware),
});

setupListeners(store.dispatch);
