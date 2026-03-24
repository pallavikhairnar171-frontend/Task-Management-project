export const LoaderSelectorLoading = (state) => {
   return Object.values(state).some(
    (slice) => slice?.loading === true
  );
};