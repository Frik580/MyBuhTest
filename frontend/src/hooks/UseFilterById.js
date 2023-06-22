export default function useFilterById(arr, id) {
  return arr.filter((element) => element.id === id)[0];
}
