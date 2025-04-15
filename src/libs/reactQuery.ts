import {QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions:{
        queries:{
            retry: (failureCount, error) => {
                if(error.stack?.includes('404')){
                    return false;
                }
                return failureCount < 3;
            },
            refetchOnWindowFocus: true,
            // Cache data for 5 minutes
            // staleTime: 5 * 60 * 1000,

            // Keep previous data while fetching
            refetchOnReconnect: true,

            // Disable automatic refetching
            refetchInterval: false
            // 5 minutes
        }
    }
})
export default queryClient;
