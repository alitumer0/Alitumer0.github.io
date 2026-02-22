"use client";

import { SwordIcon } from "./RPGIcons";

export default function RPGFooter() {
    return (
        <footer className="rpg-footer">
            <div className="rpg-footer-divider" />
            <div className="rpg-footer-content">
                <span className="rpg-footer-icon"><SwordIcon size={14} /></span>
                <p className="rpg-footer-text">
                    © {new Date().getFullYear()} • Crafted with ⚔️ by <strong>Ali Eren Tümer</strong>
                </p>
                <span className="rpg-footer-icon"><SwordIcon size={14} /></span>
            </div>
            <p className="rpg-footer-quest">The quest continues...</p>
        </footer>
    );
}
