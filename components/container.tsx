import { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
}

export default function Container ({children}:ContainerProps) {
    return(
        <div className="h-screen p-4 lg:p-6">
            {children}
        </div>
    )
}