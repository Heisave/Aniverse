import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} Anime Watching Site. All rights reserved.</p>
            <nav>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/privacy">Privacy Policy</a>
            </nav>
        </footer>
    );
}

export default Footer;