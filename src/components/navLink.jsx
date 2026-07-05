"use client"

import Link from 'next/link'

const NavLink = ({ link, isActive, onNavigate }) => {
    
    return (
        <Link
            className={`group relative whitespace-nowrap rounded-md px-2.5 py-[0.72rem] text-center font-mono text-sm font-black tracking-[0.085em] transition-all duration-300 ${
                isActive
                    ? "bg-[#2DD4BF]/10 text-white"
                    : "text-[#A7B4B8] hover:bg-white/[0.055] hover:text-white"
            }`}
            href={link.url}
            onClick={(event) => onNavigate?.(event, link)}
        >
            <span className="relative">{link.title}</span>
            <span
                className={`absolute bottom-1.5 left-2.5 right-2.5 h-px rounded-full bg-[#2DD4BF] transition-all duration-300 ${
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                }`}
            />
        </Link>
    )
}

export default NavLink
