import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {HashRouter} from "react-router-dom";
import {ConfigProvider} from "antd";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "./libs";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#0A88BF',
                    colorBgContainer: ''
                }
            }}
        >
            <QueryClientProvider client={queryClient}>
                <HashRouter>
                    <App/>
                    <ReactQueryDevtools initialIsOpen={false}/>
                </HashRouter>
            </QueryClientProvider>
        </ConfigProvider>
    </React.StrictMode>,
)
