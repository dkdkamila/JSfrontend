import React from 'react';
import { Link } from 'react-router-dom'; // Importera Link från react-router-dom 

function Navigation() {
    return (
        <section className="navigation">
            <h2>Navigering</h2>
            <nav id="mainmenu">
                <ul>
                    <li><Link to="/">Startsidan</Link></li>
                    <li><Link to="/admin">Adminsida- hantera inlägg</Link></li>
                </ul>
            </nav>

        </section>
    );
}

export default Navigation;