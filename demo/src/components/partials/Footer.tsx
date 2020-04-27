import React from 'react';

export default () => {
    const style: React.CSSProperties = {
        backgroundColor: '#F3F3F3',
        paddingTop: '10px',
        paddingBottom: '0px',
        position: 'fixed',
        bottom: '0',
        minHeight: '60px',
        width: '100%',
    };
    return (
        <footer className="footer" style={style}>
            <div className="content has-text-centered">
                <p>
                    <strong>Krypton Demo Webapp</strong>. The source code is licensed{' '}
                    <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
                </p>
            </div>
        </footer>
    );
};
