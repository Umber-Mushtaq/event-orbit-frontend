import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const blogQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function BlogQueryProvider({ children }) {
  return (
    <QueryClientProvider client={blogQueryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default BlogQueryProvider;
