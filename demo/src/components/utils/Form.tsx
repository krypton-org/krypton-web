import * as React from 'react';

interface FormProps {
    autoComplete?: string;
    onSubmit: () => any;
    children?: JSX.Element[] | JSX.Element;
}
export default function Form({ onSubmit, children, autoComplete }: FormProps) {
    return (
        <form
            autoComplete={autoComplete}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    onSubmit();
                }
            }}
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSubmit();
            }}
        >
            {children}
        </form>
    );
}
