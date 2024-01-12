import React from 'react';
import '../App.css';
import photo from '../siberian.png';

function Header() {
    return (
        <header className="mainheader">
            <img src={photo} alt="header bild med 2 katter" title="sibiriska katter" className="bild" />
        </header>
    );
}

export default Header;