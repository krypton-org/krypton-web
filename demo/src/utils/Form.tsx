import * as React from 'react';

interface FormProps {

    onSubmit: () => any;
    children?: JSX.Element [];
}
export default function Form({ onSubmit, children }: FormProps){
    return (
        <form
        onKeyDown={
            (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    onSubmit();
                }
            }
        }

        onSubmit={
            (e) => {
                e.preventDefault();
                e.stopPropagation();
                onSubmit();
            }
        }>
        {children}
    </form>
    )
}
    