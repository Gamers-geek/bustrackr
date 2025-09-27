"use client";
import { useState } from "react";

export default function Accordion({ question, answer }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-zinc-200 dark:border-zinc-700">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center py-4 text-left font-medium text-zinc-800 dark:text-zinc-200 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
            >
                {question}
                <span>{open ? "−" : "+"}</span>
            </button>
            {open && (
                <div
                    className="pb-4 text-zinc-600 dark:text-zinc-400 prose prose-sm max-w-none prose-a:text-blue-600 dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: answer.replace(/\n/g, "<br />") }}
                />
            )}
        </div>
    );
}
