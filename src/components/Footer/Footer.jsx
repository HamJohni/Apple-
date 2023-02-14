import React from 'react';
import {TfiFacebook} from 'react-icons/tfi'
import {BsTwitter} from 'react-icons/bs'
import {BsInstagram} from 'react-icons/bs'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">

                    <div className="footer__follow">
                        <h3 className="footer__follow-title">Follow Us.</h3>
                        <p className="footer__follow-text">
                            We are always looking for new <br/>
                            projects and collaborations. <br/>
                            Feel free to contact us.
                        </p>
                        <div className="footer__follow-block">
                            <a className="footer__follow-icon" href="https://www.facebook.com/"><TfiFacebook/></a>
                            <a className="footer__follow-icon" href="https://twitter.com/?lang=ru"><BsTwitter/></a>
                            <a className="footer__follow-icon" href="https://www.instagram.com/"><BsInstagram/></a>
                        </div>
                    </div>

                    <div className="footer__follow">
                        <h3 className="footer__follow-title">Contact Us.</h3>
                        <p className="footer__follow-text">
                            One Apple Park Way <br/>
                            Cupertino, CA 95014
                        </p>

                        <p className="footer__follow-num">
                            (408) 996-1010
                        </p>

                        <a className="footer__follow-link" href="https://support.apple.com/ru-ru">
                            support@apple.com
                        </a>

                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;