import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";

class Header extends PureComponent {
    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/heroes">Heroes</Link>
                    </li>
                    <li>
                        <Link to="/comics">Comics</Link>
                    </li>
                </ul>
            </nav>
        );
    }
};

export default Header;