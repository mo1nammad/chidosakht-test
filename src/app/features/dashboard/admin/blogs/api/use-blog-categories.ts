import { useQuery } from "@tanstack/react-query";

export const useBlogCategories = () => {
  const { data, status } = useQuery({
    queryKey: ["blogs-categories"],
    queryFn: async () => {
      return {};
    },
  });
  return { data, status };
};
