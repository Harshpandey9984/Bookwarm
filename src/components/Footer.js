import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-4">
                        <h3>About Us</h3>
                        <p>
                        Welcome to Bookwarm: Bridging Books and Blockchain. Dive into a world of literary treasures where blockchain ensures secure transactions. Explore our vast library, engage with fellow book enthusiasts, and enjoy seamless crypto transactions. Bookwarm: Where Reading Meets the Future.</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/books">Books</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/about">About</a></li>
                        </ul>
                    </div>
                    <div className="col-md-4">
                        <h3>Follow Us</h3>
                        <ul className="social-icons">
                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="https://x.com/HarshPandey9984" target="_blank" rel="noopener noreferrer"><i className="fa fa-twitter"></i></a></li>
                            <li><a href="https://t.co/yuzgWQC92Q" target="_blank" rel="noopener noreferrer"><i className="fa fa-linkedin"></i></a></li>
                            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                        </ul>
                        <div className="contact-info">
                            <h4>Contact Us</h4>
                            <p>
                                <i className="fa fa-envelope"></i> 
                                <a href="mailto:hp7556513@gmail.com">hp7556513@gmail.com</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;