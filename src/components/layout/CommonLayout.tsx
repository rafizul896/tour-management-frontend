import type { ReactNode } from "react";

const CommonLayout = ({children}: {children: ReactNode}) => {
    return (
        <>
           {children} 
        </>
    );
};

export default CommonLayout;