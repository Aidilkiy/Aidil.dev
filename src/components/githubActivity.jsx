"use client"

import { useEffect, useState } from "react"

const USERNAME = "AidilKiy"
const MAX_ITEMS = 5

function timeAgo(dateStr) {
    const diffMs = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diffMs / 60000)
    if (mins < 1) return "just now"
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days < 30) return `${days}d ago`
    const months = Math.floor(days / 30)
    return `${months}mo ago`
}

// Fetched client-side so each visitor's own browser hits GitHub's public API
// directly -- no token, no server-side rate-limit pool shared across every
// visitor (same pattern used for the GitHub profile README metrics).
//
// GitHub's public (unauthenticated) events feed only gives the resulting
// commit SHA for a push, not its message, so each item needs one follow-up
// call to the commit-detail endpoint to read the actual message.
const GitHubActivity = () => {
    const [commits, setCommits] = useState(null) // null = loading, [] = empty/error

    useEffect(() => {
        let cancelled = false

        const load = async () => {
            try {
                const eventsRes = await fetch(`https://api.github.com/users/${USERNAME}/events/public?per_page=30`)
                if (!eventsRes.ok) throw new Error("events fetch failed")
                const events = await eventsRes.json()

                const pushes = events.filter((event) => event.type === "PushEvent").slice(0, MAX_ITEMS)

                const details = await Promise.all(
                    pushes.map(async (event) => {
                        try {
                            const res = await fetch(`https://api.github.com/repos/${event.repo.name}/commits/${event.payload.head}`)
                            if (!res.ok) return null
                            const data = await res.json()
                            const message = data.commit?.message?.split("\n")[0] ?? ""
                            return {
                                id: event.id,
                                repo: event.repo.name.split("/")[1],
                                message,
                                sha: (event.payload.head || "").slice(0, 7),
                                date: event.created_at,
                            }
                        } catch {
                            return null
                        }
                    })
                )

                if (!cancelled) setCommits(details.filter(Boolean))
            } catch {
                if (!cancelled) setCommits([])
            }
        }

        load()
        return () => {
            cancelled = true
        }
    }, [])

    return (
        <div className="relative overflow-hidden rounded-lg border border-white/12 bg-[#061418]/88 shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:52px_52px]" />
            <div className="relative">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-black/35 px-4 py-3 md:px-5">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <p className="font-mono text-[10px] font-black uppercase tracking-[0.24em] text-white/35">aidil@activity:~</p>
                </div>

                <div className="grid gap-3 p-4 md:p-5">
                    <div className="flex flex-wrap items-center gap-3 border-b border-white/10 pb-4 font-mono text-xs font-bold text-white/42">
                        <span className="text-rose-300">$</span>
                        <span>git log --oneline -5 --all</span>
                        <span className="inline-block h-4 w-2 animate-pulse bg-cyan-200" aria-hidden="true" />
                    </div>

                    {commits === null ? (
                        <p className="font-mono text-xs text-white/35">fetching recent commits...</p>
                    ) : commits.length === 0 ? (
                        <p className="font-mono text-xs text-white/35">no recent public activity</p>
                    ) : (
                        commits.map((commit) => (
                            <div
                                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs sm:text-sm"
                                key={commit.id}
                            >
                                <span className="text-cyan-300">{commit.sha}</span>
                                <span className="min-w-0 flex-1 truncate text-white/78">{commit.message}</span>
                                <span className="text-white/38">{commit.repo}</span>
                                <span className="text-white/32">{timeAgo(commit.date)}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default GitHubActivity
