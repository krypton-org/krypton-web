import React from 'react';

export default ({ isActive }) =>
    (<div className={isActive ? "modal is-active" : "modal"}>
        <div className="modal-background"></div>
        <div className="modal-card">
            <header className="modal-card-head">
                <p className="modal-card-title">Sign up</p>
                <button className="delete" aria-label="close"></button>
            </header>
            <section className="modal-card-body">
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-danger" type="email" placeholder="Email"/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-envelope"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-exclamation-triangle"></i>
                        </span>
                    </div>
                    <p className="help is-danger">This email is invalid</p>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left has-icons-right">
                        <input className="input is-success" type="password" placeholder="Password" />
                        <span className="icon is-small is-left">
                            <i className="fas fa-user"></i>
                        </span>
                        <span className="icon is-small is-right">
                            <i className="fas fa-check"></i>
                        </span>
                    </div>
                    <p className="help is-success">This password is invalid</p>
                </div>
                Already have an account? <a href="#">log in</a>. 
            
            </section>
            <footer className="modal-card-foot">
            <button className="button is-link">Submit</button>

                <button className="button">Cancel</button>
            </footer>
        </div>
    </div>)