"use client";

import Navbar from "./navbar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import PageBackground from "./pageBackground";
import IntroLoader from "./introLoader";
import CustomCursor from "./customCursor";

const TransitionProvider = ({ children }) => {
    const pathName = usePathname();
    const router = useRouter();

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        const navigationEntry = window.performance?.getEntriesByType?.("navigation")?.[0];
        const shouldResetHash = navigationEntry?.type === "reload";
        let userStartedScrolling = false;

        const scrollToHash = () => {
            if (!window.location.hash || shouldResetHash || userStartedScrolling) return;

            const section = document.getElementById(window.location.hash.slice(1));
            if (!section) return;

            const navbarOffset = 78;
            const sectionTop = section.getBoundingClientRect().top + window.scrollY - navbarOffset;
            window.scrollTo({ top: Math.max(0, sectionTop), behavior: "smooth" });
        };

        const resetToHome = () => {
            if (userStartedScrolling || (window.location.hash && !shouldResetHash)) return;

            window.scrollTo(0, 0);
            
            if (pathName === "/" && window.location.hash && shouldResetHash) {
                window.history.replaceState(null, "", "/");
            }
        };

        resetToHome();

        if (pathName !== "/") {
            router.replace("/");
        }

        const markUserScroll = () => {
            userStartedScrolling = true;
        };

        window.addEventListener("wheel", markUserScroll, { passive: true });
        window.addEventListener("touchmove", markUserScroll, { passive: true });
        window.addEventListener("keydown", markUserScroll);

        const resetTimer = window.setTimeout(resetToHome, 80);
        const hashTimer = window.setTimeout(scrollToHash, 180);

        return () => {
            window.clearTimeout(resetTimer);
            window.clearTimeout(hashTimer);
            window.removeEventListener("wheel", markUserScroll);
            window.removeEventListener("touchmove", markUserScroll);
            window.removeEventListener("keydown", markUserScroll);
        };
    }, [pathName, router]);

    return (
        <>
            <IntroLoader />
            <CustomCursor />

            <div className="relative min-h-screen w-full overflow-x-clip bg-[#071A1F] text-white">
                <PageBackground pathName={pathName} />

                <div className="fixed inset-x-0 top-0 z-50 h-[78px]">
                    <Navbar />
                </div>

                <div className="relative z-10 min-h-screen pt-[78px]">
                    {children}
                </div>
            </div>
        </>
    );
};

export default TransitionProvider;
