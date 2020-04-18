import React from 'react';

export default () => (
    <div>
        <section className="hero is-primary">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Welcome this Krypton demo app. It is a simple todo list ;)
                </h1>
                    <h2 className="subtitle">
                        Register to add your todos!
                </h2>
                </div>
            </div>
        </section>
        <div className="container" style={{marginTop: "20px", marginBottom: "20px"}}>
            <p>
                This is just a demo, the database is purged each night. It aims to show how easy it is to use Krypton for website authentication.

            </p>
            <p>
                Check the github sourcce here.
            </p>
        </div>
    </div>
)