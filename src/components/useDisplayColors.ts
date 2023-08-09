import { useQuery } from "@tanstack/react-query";

async function fetchColors() {
  const colors = await fetch('../api/colors.json')
  return colors.json();
}

const useDisplayColors = () => {
  const { data: colors, isLoading } =  useQuery(["colors"],fetchColors);
  return { colors, isLoading};
}

export default useDisplayColors